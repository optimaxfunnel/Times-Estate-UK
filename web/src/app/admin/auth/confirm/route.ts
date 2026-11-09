import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServer, isSupabaseAuthConfigured } from "@/lib/auth/supabase";

/**
 * Target of the invitation and password-reset emails. Supabase's email
 * templates must link here (DEPLOYMENT.md §11b):
 *   {{ .SiteURL }}/admin/auth/confirm?token_hash={{ .TokenHash }}&type=invite
 *   {{ .SiteURL }}/admin/auth/confirm?token_hash={{ .TokenHash }}&type=recovery
 * The one-time token is checked on the server, which then sets the session
 * cookie; the person continues to choose a password.
 */
const ALLOWED: readonly EmailOtpType[] = ["invite", "recovery"];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const fail = NextResponse.redirect(new URL("/admin/sign-in?error=link", url));

  if (!isSupabaseAuthConfigured() || !tokenHash || !type || !ALLOWED.includes(type)) return fail;

  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
  if (error) return fail;
  return NextResponse.redirect(new URL("/admin/set-password", url));
}
