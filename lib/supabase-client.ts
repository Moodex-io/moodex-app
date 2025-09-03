// lib/supabase-client.ts
'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let singleton: SupabaseClient | undefined;

/**
 * Returns a browser-only Supabase client, or undefined if env vars are missing.
 * Never constructs during SSR/prerender.
 */
export function getSupabase() {
  if (typeof window === 'undefined') return undefined; // guard SSR
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return undefined;
  if (!singleton) singleton = createClient(url, anon);
  return singleton;
}
