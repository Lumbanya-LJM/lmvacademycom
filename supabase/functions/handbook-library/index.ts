import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

const FILES: Record<string, { path: string; label: string }> = {
  mooting: { path: 'mooting-handbook.pdf', label: 'Mooting Handbook' },
  research: { path: 'research-handbook.pdf', label: 'Research Handbook' },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!authHeader.startsWith('Bearer ')) {
      return json({ error: 'Not signed in' }, 401);
    }

    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user?.email) {
      return json({ error: 'Not signed in' }, 401);
    }
    const email = user.email.toLowerCase();

    const { data: purchases, error } = await admin
      .from('handbook_purchases')
      .select('id, product, created_at, payment_method')
      .eq('email', email)
      .eq('status', 'paid')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const owned = new Set((purchases ?? []).map((p) => p.product));

    if (req.method === 'GET') {
      return json({
        email,
        purchases: (purchases ?? []).map((p) => ({
          id: p.id,
          product: p.product,
          label: FILES[p.product]?.label ?? p.product,
          payment_method: p.payment_method,
          created_at: p.created_at,
        })),
      });
    }

    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      const product = typeof body?.product === 'string' ? body.product : '';
      const file = FILES[product];
      if (!file) return json({ error: 'Unknown handbook' }, 400);
      if (!owned.has(product)) {
        return json({ error: 'No confirmed payment found for this handbook' }, 403);
      }

      const { data, error: signError } = await admin.storage
        .from('handbooks')
        .createSignedUrl(file.path, 300, { download: `${file.label}.pdf` });

      if (signError || !data?.signedUrl) {
        return json({ error: 'This handbook file is not available yet. Please contact us.' }, 404);
      }

      return json({ url: data.signedUrl });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (e) {
    console.error(e);
    return json({ error: 'Something went wrong' }, 500);
  }
});
