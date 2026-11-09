import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseAuthConfigured } from "@/lib/auth/supabase";
import { forgotPasswordAction } from "@/lib/auth/staff-actions";
import { Alert } from "@/components/ui/Alert";
import { AuthPage, TextInput, buttonClass } from "@/components/admin/AuthForm";

export const metadata: Metadata = { title: "Admin — Reset password" };

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  if (!isSupabaseAuthConfigured()) redirect("/admin/sign-in");
  const { error, sent } = await searchParams;
  return (
    <AuthPage title="Reset your password" error={error}>
      {sent ? (
        <Alert tone="success">
          If that address belongs to a staff account, an email with a reset link
          is on its way. The link works once and expires after a short time.
        </Alert>
      ) : (
        <form action={forgotPasswordAction} className="space-y-4">
          <TextInput label="Email address" name="email" type="email" autoComplete="username" />
          <button type="submit" className={buttonClass}>
            Send reset link
          </button>
        </form>
      )}
      <p className="mt-6 text-sm">
        <Link href="/admin/sign-in" className="text-accent underline underline-offset-2">
          Back to sign-in
        </Link>
      </p>
    </AuthPage>
  );
}
