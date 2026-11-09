import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServer, isSupabaseAuthConfigured } from "@/lib/auth/supabase";
import { AuthPage } from "@/components/admin/AuthForm";
import { CallbackHandoff } from "@/components/admin/CallbackHandoff";

export const metadata: Metadata = {
  title: "Admin — Signing you in",
  // The address may carry one-time tokens: never share it with other sites.
  referrer: "no-referrer",
};
export const dynamic = "force-dynamic";

/**
 * Where Supabase's standard (default-template) emails send people:
 *
 *  - Invitations and some resets arrive with one-time tokens after "#" in
 *    the address, which only the browser can see. <CallbackHandoff> posts
 *    them to the server straight away (staff-actions: acceptEmailLinkAction)
 *    and wipes them from the address bar.
 *  - Password resets started on this site may instead arrive as "?code=…",
 *    exchanged here on the server.
 *
 * When custom SMTP is set up, templates can link to /admin/auth/confirm
 * (token_hash) instead; both stay supported.
 */
export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error_description?: string }>;
}) {
  if (!isSupabaseAuthConfigured()) redirect("/admin/sign-in");
  const { code, error_description } = await searchParams;

  if (code) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    redirect(error ? "/admin/sign-in?error=link" : "/admin/set-password");
  }

  return (
    <AuthPage
      title="Signing you in…"
      error={error_description ? "link" : undefined}
      intro="One moment while we check your link."
    >
      <CallbackHandoff />
    </AuthPage>
  );
}
