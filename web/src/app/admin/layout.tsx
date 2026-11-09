import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { hasPermission, ROLE_LABELS } from "@/lib/auth/roles";
import { RoleSwitcher } from "@/components/admin/RoleSwitcher";
import { Container } from "@/components/ui/Container";
import { signOutAction } from "@/lib/property/admin-actions";

/**
 * Applies to every page under /admin. This is defence-in-depth for
 * search engines only, not a security control — see robots.ts and
 * /SECURITY.md. The real protection is (and, until real authentication
 * exists, cannot fully be) the server-side role checks documented in
 * /ADMIN_AND_CMS.md.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The layout also wraps /admin/sign-in, so it must not redirect.
  // Without a valid session it renders the page alone (sign-in); every
  // other admin page enforces sign-in itself via requireRole().
  const session = await getSession();
  if (!session) {
    return (
      <div className="min-h-screen bg-secondary/5">
        <Container className="py-8">{children}</Container>
      </div>
    );
  }
  const role = session.role;

  return (
    <div className="min-h-screen bg-secondary/5">
      {session.provider === "dev-mock" && <RoleSwitcher currentRole={role} />}
      <header className="border-b border-border bg-surface">
        <Container className="flex h-16 items-center justify-between">
          <nav aria-label="Admin" className="flex items-center gap-6">
            <Link
              href="/admin/properties"
              className="font-heading font-semibold text-ink"
            >
              Admin
            </Link>
            <Link
              href="/admin/properties"
              className="text-sm text-ink hover:text-accent"
            >
              Properties
            </Link>
            {hasPermission(role, "view_enquiries") && (
              <Link
                href="/admin/leads"
                className="text-sm text-ink hover:text-accent"
              >
                Leads
              </Link>
            )}
            <Link
              href="/admin/content"
              className="text-sm text-ink hover:text-accent"
            >
              Content
            </Link>
            {hasPermission(role, "view_audit_log") && (
              <Link
                href="/admin/audit"
                className="text-sm text-ink hover:text-accent"
              >
                Audit Log
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-sm text-ink/70">
              Signed in as{" "}
              <span className="font-medium text-ink">{ROLE_LABELS[role]}</span>
            </p>
            {session.provider === "supabase" && (
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="min-h-6 rounded-sm border border-border-strong px-3 py-1 text-sm text-ink hover:border-accent hover:text-accent"
                >
                  Sign out
                </button>
              </form>
            )}
          </div>
        </Container>
      </header>
      <Container className="py-8">{children}</Container>
    </div>
  );
}
