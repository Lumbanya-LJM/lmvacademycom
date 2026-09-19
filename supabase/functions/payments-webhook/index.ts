import { createClient } from 'npm:@supabase/supabase-js@2';
import { verifyWebhook, EventName, type PaddleEnv } from '../_shared/paddle.ts';

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }
  return _supabase;
}

async function handleTransactionCompleted(data: any, env: PaddleEnv) {
  const registrationId = data.customData?.registrationId;
  const purchaseId = data.customData?.purchaseId;

  if (!registrationId && !purchaseId) {
    console.log('transaction.completed without registrationId or purchaseId — ignoring');
    return;
  }

  const table = purchaseId ? 'handbook_purchases' : 'moot_court_registrations';
  const recordId = purchaseId ?? registrationId;

  const { error } = await getSupabase()
    .from(table)
    .update({
      status: 'paid',
      paddle_transaction_id: data.id,
      environment: env,
      updated_at: new Date().toISOString(),
    })
    .eq('id', recordId);

  if (error) {
    console.error(`Failed to mark ${table} record paid:`, error);
    throw error;
  }
  console.log(`${table} record ${recordId} marked paid (${env})`);
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const url = new URL(req.url);
  const env = (url.searchParams.get('env') || 'sandbox') as PaddleEnv;
  try {
    const event = await verifyWebhook(req, env);
    switch (event.eventType) {
      case EventName.TransactionCompleted:
        await handleTransactionCompleted(event.data, env);
        break;
      default:
        console.log('Unhandled event:', event.eventType);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Webhook error:', e);
    return new Response('Webhook error', { status: 400 });
  }
});
