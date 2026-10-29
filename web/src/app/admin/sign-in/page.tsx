import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ROLES, ROLE_LABELS, permissionsFor } from "@/lib/auth/roles";
import { getSession, isDevSignInEnabled } from "@/lib/auth/session";
import { devSignInAction } from "@/lib/property/admin-actions";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = { title: "Admin — Sign in" };

export default async function AdminSignInPage() {
  if (await getSession()) redirect("/admin/properties");

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
        This sign-in exists only on a development computer, to test what each
        role can do. It has no accounts or passwords and is switched off
        automatically in a production build. Real staff sign-in (Auth.js or
        another approved service) replaces it before the site goes live.
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
        <button
          type="submit"
          className="rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
