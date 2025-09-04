"use client";
import { createClient } from "@supabase/supabase-js";

let client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null; // lets the form fall back if not configured

  if (!client) {
    client = createClient(url, anon, { auth: { persistSession: false } });
  }
  return client;
}
