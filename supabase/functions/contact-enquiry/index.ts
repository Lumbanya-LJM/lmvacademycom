import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(5000),
});

const ENQUIRY_RECIPIENT = 'nketurah@lmvacademy.com';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Please provide a valid name, email, and message.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { name, email, message } = parsed.data;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 1. Always store the enquiry first — no message is ever lost.
    const { data: row, error: insertError } = await supabase
      .from('contact_enquiries')
      .insert({ name, email, message })
      .select('id')
      .single();

    if (insertError) throw insertError;

    // 2. Try to email it onward. Failure here must not lose the enquiry.
    let emailed = false;
    try {
      const { error: mailError } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'contact-enquiry',
          recipient: ENQUIRY_RECIPIENT,
          idempotencyKey: `contact-enquiry-${row.id}`,
          variables: {
            sender_name: name,
            sender_email: email,
            message,
          },
        },
      });
      emailed = !mailError;
      if (mailError) console.error('Email send failed (enquiry still saved):', mailError);
    } catch (e) {
      console.error('Email send threw (enquiry still saved):', e);
    }

    if (emailed) {
      await supabase.from('contact_enquiries').update({ emailed: true }).eq('id', row.id);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('contact-enquiry error:', e);
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again or reach us on WhatsApp.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
