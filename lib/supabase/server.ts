import { createClient } from "@supabase/supabase-js";

// Client with service role — server-side only (API routes, Server Components)
// Bypasses RLS — use carefully
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Alias pour compatibilité
export const supabaseAdmin = {
  from: (...args: Parameters<ReturnType<typeof getSupabaseAdmin>["from"]>) =>
    getSupabaseAdmin().from(...args),
};
