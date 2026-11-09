import { ROLES, type Role } from "@/lib/auth/roles";
import { getDb } from "@/lib/db/client";

/**
 * Pure decision: may this signed-in person use the admin area right now?
 * Kept free of I/O so every case is unit-tested (access.test.ts).
 *
 *  - no session                       → sign in
 *  - email not confirmed              → no access
 *  - password only, no 2-step set up  → set up 2-step verification
 *  - password only, 2-step set up     → enter the 6-digit code
 *  - 2-step verified, but no role row → no access (owner hasn't granted one)
 *  - 2-step verified, role found      → allowed, with that role
 */
export type AccessDecision =
  | { state: "signed_out" }
  | { state: "email_unconfirmed" }
  | { state: "needs_2fa_setup" }
  | { state: "needs_2fa_code" }
  | { state: "no_role" }
  | { state: "allowed"; role: Role };

export interface AccessInput {
  signedIn: boolean;
  emailConfirmed: boolean;
  /** Supabase assurance level of the session: "aal2" after the 6-digit code. */
  aal: string | null | undefined;
  hasVerifiedTotp: boolean;
  role: string | null | undefined;
}

export function decideAccess(i: AccessInput): AccessDecision {
  if (!i.signedIn) return { state: "signed_out" };
  if (!i.emailConfirmed) return { state: "email_unconfirmed" };
  if (i.aal !== "aal2") {
    return i.hasVerifiedTotp ? { state: "needs_2fa_code" } : { state: "needs_2fa_setup" };
  }
  if (!i.role || !(ROLES as readonly string[]).includes(i.role)) return { state: "no_role" };
  return { state: "allowed", role: i.role as Role };
}

/** The owner-assigned role for an email address, or null. */
export async function lookupStaffRole(email: string | null | undefined): Promise<Role | null> {
  if (!email) return null;
  const db = await getDb();
  const rows = await db.query<{ role: string }>(
    "select role from staff_roles where email = $1",
    [email.trim().toLowerCase()],
  );
  const role = rows[0]?.role;
  return role && (ROLES as readonly string[]).includes(role) ? (role as Role) : null;
}

/** Where to send someone, given the decision. */
export function pathFor(decision: AccessDecision): string {
  switch (decision.state) {
    case "signed_out":
      return "/admin/sign-in";
    case "needs_2fa_setup":
    case "needs_2fa_code":
      return "/admin/two-step";
    case "email_unconfirmed":
    case "no_role":
      return "/admin/sign-in?error=no_access";
    case "allowed":
      return "/admin/properties";
  }
}
