import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Bypasses Row Level Security — server-only. Never import this from a
// client component; it must only ever run inside API routes / server code.
// This app has no browser-side Supabase client at all: registrations are
// always written through /api/register.
//
// Lazily constructed (not at module load) so `next build` — which imports
// route modules to collect page data — doesn't require env vars to be set.
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — set them in .env.local (see .env.local.example)."
    );
  }

  client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}
