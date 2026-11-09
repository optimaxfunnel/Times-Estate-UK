import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Staff sign-in through Supabase Auth (owner decision 2026-11-09).
 *
 * Everything runs on the website's server: visitors' browsers never talk
 * to Supabase, so the site's strict Content-Security-Policy is unchanged.
 * The two values are the project address and the *publishable* key, both
 * public by design. Supabase's own rules, plus the site's row-level
 * security, keep customer data out of reach of that key.
 */
export function supabaseAuthConfig(): { url: string; key: string } | null {
  if (process.env.VITEST) return null; // tests never reach the live service
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && key ? { url, key } : null;
}

export function isSupabaseAuthConfigured(): boolean {
  return supabaseAuthConfig() !== null;
}

/** A Supabase client bound to this request's cookies (server only). */
export async function createSupabaseServer() {
  const config = supabaseAuthConfig();
  if (!config) throw new Error("Supabase Auth is not configured.");
  const store = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (toSet) => {
        // Pages cannot set cookies (only actions, route handlers and the
        // proxy can); the proxy refreshes the session on every admin request.
        try {
          for (const { name, value, options } of toSet) store.set(name, value, options);
        } catch {
          /* called from a page render — safe to ignore */
        }
      },
    },
  });
}
