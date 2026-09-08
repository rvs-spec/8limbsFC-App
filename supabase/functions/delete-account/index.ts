// Deletes the calling user's auth account (profiles/activity_history/
// workout_sessions/meals cascade via FK). The anon key can't do this from
// the client, so this runs server-side with the service role key.
//
// Deploy: `supabase functions deploy delete-account`
// Requires the project's built-in SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY
// secrets, which Supabase sets automatically for every Edge Function.

import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS })

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  // Identify the caller from their own JWT before doing anything privileged.
  const asCaller = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authHeader } },
  })
  const {
    data: { user },
    error: userError,
  } = await asCaller.auth.getUser()

  if (userError || !user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  const admin = createClient(supabaseUrl, serviceRoleKey)
  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id)

  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
})
