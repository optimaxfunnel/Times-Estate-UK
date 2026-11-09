import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ROLES, ROLE_LABELS, permissionsFor } from "@/lib/auth/roles";
import {
  getSession,
  isDevSignInEnabled,
  isSupabaseAuthConfigured,
} from "@/lib/auth/session";
import { devSignInAction } from "@/lib/property/admin-actions";
import { staffSignInAction } from "@/lib/auth/staff-actions";
import { Alert } from "@/components/ui/Alert";
import { AuthPage, TextInput, buttonClass } from "@/components/admin/AuthForm";

export const metadata: Metadata = { title: "Admin — Sign in" };

export default async function AdminSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (await getSession()) redirect("/admin/properties");

  // Real staff sign-in (Supabase Auth, with two-step verification).
  if (isSupabaseAuthConfigured()) {
    return (
      <AuthPage
        title="Staff sign-in"
        intro="For Times Estate Ltd staff only. After your password you'll be asked for a 6-digit code from your authenticator app."
        error={error}
      >
        <form action={staffSignInAction} className="space-y-4">
          <TextInput label="Email address" name="email" type="email" autoComplete="username" />
          <TextInput label="Password" name="password" type="password" autoComplete="current-password" />
          <button type="submit" className={buttonClass}>
            Continue
          </button>
        </form>
        <p className="mt-6 text-sm">
          <Link href="/admin/forgot-password" className="text-accent underline underline-offset-2">
            Forgotten your password?
          </Link>
        </p>
      </AuthPage>
    );
  }

  if (!isDevSignInEnabled()) {
    return (
      <div className="mx-auto max-w-lg py-16">
        <h1 className="text-2xl font-semibold text-ink">
          Administration is not available
        </h1>
        <Alert tone="info" className="mt-4">
          Staff sign-in has not been connected on this server yet. The
          administration area stays closed until an approved authentication
          service is set up.
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-12">
      <h1 className="text-2xl font-semibold text-ink">Development sign-in</h1>
      <Alert tone="warning" title="Not real authentication" className="mt-4">
        This sign-in exists only on a development computer without Supabase
        configured, to test what each role can do. It has no accounts or
        passwords and is switched off automatically in a production build.
      </Alert>
      <form action={devSignInAction} className="mt-6 space-y-3">
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-ink">
            Sign in to test as
          </legend>
          {ROLES.map((role, i) => (
            <label
              key={role}
              className="flex cursor-pointer items-start gap-3 rounded-sm border border-border-strong bg-surface p-3 text-sm"
            >
              <input
                type="radio"
                name="role"
                value={role}
                defaultChecked={i === 0}
                className="mt-0.5 accent-accent"
              />
              <span>
                <span className="font-semibold text-ink">
                  {ROLE_LABELS[role]}
                </span>
                <span className="block text-xs text-secondary">
                  {permissionsFor(role).join(" · ").replace(/_/g, " ")}
                </span>
              </span>
            </label>
          ))}
        </fieldset>
        <button type="submit" className={buttonClass}>
          Sign in
        </button>
      </form>
    </div>
  );
}
