// lib/supabase-client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabase() {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    console.warn('Supabase envs missing:', { hasUrl: !!url, hasAnon: !!anon })
    return null
  }
  client = createClient(url, anon, {
    auth: { persistSession: false },
  })
  return client
}
