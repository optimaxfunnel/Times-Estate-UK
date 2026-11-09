import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServer, isSupabaseAuthConfigured } from "@/lib/auth/supabase";
import { setPasswordAction } from "@/lib/auth/staff-actions";
import { AuthPage, TextInput, buttonClass } from "@/components/admin/AuthForm";

export const metadata: Metadata = { title: "Admin — Choose a password" };
export const dynamic = "force-dynamic";

/** Reached from an invitation or password-reset email link. */
export default async function SetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!isSupabaseAuthConfigured()) redirect("/admin/sign-in");
  const { error } = await searchParams;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/admin/sign-in?error=link");

  return (
    <AuthPage
      title="Choose your password"
      intro="Use at least 12 characters. A short phrase of several words is easy to remember and hard to guess. Next you'll set up two-step verification."
      error={error}
    >
      <form action={setPasswordAction} className="space-y-4">
        <TextInput label="New password" name="password" type="password" autoComplete="new-password" />
        <TextInput label="Type it again" name="confirm" type="password" autoComplete="new-password" />
        <button type="submit" className={buttonClass}>
          Save password
        </button>
      </form>
    </AuthPage>
  );
}
