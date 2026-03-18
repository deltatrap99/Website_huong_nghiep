import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using SERVICE_ROLE key.
 * This bypasses RLS and should ONLY be used in API routes (server-side).
 * Never import this in client components.
 */
export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn('[SupabaseServer] Missing env vars');
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
