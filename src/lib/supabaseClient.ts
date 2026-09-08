import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn(
    'Supabase env vars are missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
      'Auth and data sync will fail until they are set — see README "Backend setup".',
  )
}

// createClient throws synchronously on an empty URL, which would crash the
// whole app before it can render — fall back to a placeholder so the app
// still loads (auth/data calls will just fail) until the real env vars are set.
export const supabase = createClient<Database>(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-anon-key')
