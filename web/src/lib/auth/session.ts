import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type Role } from "@/lib/auth/roles";
import {
  SESSION_TTL_SECONDS,
  signSession,
  verifySession,
} from "@/lib/auth/session-token";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import {
  createSupabaseServer,
  isSupabaseAuthConfigured,
} from "@/lib/auth/supabase";
import {
  decideAccess,
  lookupStaffRole,
  pathFor,
  type AccessDecision,
} from "@/lib/auth/access";

/**
 * Admin session. Two modes, chosen automatically:
 *
 * 1. SUPABASE AUTH (when NEXT_PUBLIC_SUPABASE_URL and
 *    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set; owner decision
 *    2026-11-09). A staff member must (a) sign in with their invited
 *    account, (b) pass two-step verification with an authenticator-app
 *    code (session at "aal2"), and (c) have a role row in `staff_roles`,
 *    which only the owner edits. The signed session is checked on the
 *    server on every page and action — never trusted from the browser.
 *
 * 2. DEVELOPMENT MOCK (only when Supabase Auth is NOT configured and
 *    NODE_ENV is not "production"): a signed cookie choosing a role for
 *    testing. No accounts or passwords. A production build without
 *    Supabase Auth has no way in at all — the admin area stays closed.
 *
 * Pages and actions call only `requireRole()` / `getSession()`.
 */

export interface StaffSession {
  role: Role;
  /** Supabase user id, or "dev:<role>" in the development mock. */
  sub: string;
  provider: "supabase" | "dev-mock";
}

const COOKIE = "te_admin_session";

/** A random secret per server start, used only when no secret is configured (development). */
const devSecret =
  globalThis.crypto?.randomUUID?.() + "-" + globalThis.crypto?.randomUUID?.();

function sessionSecret(): string {
  const configured = process.env.ADMIN_SESSION_SECRET;
  if (configured && configured.length >= 32) return configured;
  return devSecret;
}

export function isDevSignInEnabled(): boolean {
  return !isSupabaseAuthConfigured() && process.env.NODE_ENV !== "production";
}

export { isSupabaseAuthConfigured };

/** Full access decision for the current request (Supabase mode). */
export async function getStaffAccess(): Promise<{
  decision: AccessDecision;
  userId: string | null;
  email: string | null;
}> {
  const supabase = await createSupabaseServer();
  // getClaims() verifies the session's signature — the browser's copy of
  // the session is never trusted as-is.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) {
    return { decision: decideAccess({ signedIn: false, emailConfirmed: false, aal: null, hasVerifiedTotp: false, role: null }), userId: null, email: null };
  }
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user ?? null;
  const factors = await supabase.auth.mfa.listFactors();
  const hasVerifiedTotp = (factors.data?.totp ?? []).length > 0;
  const email = user?.email ?? null;
  const role = claims.aal === "aal2" ? await lookupStaffRole(email) : null;
  return {
    decision: decideAccess({
      signedIn: !!user,
      emailConfirmed: !!user?.email_confirmed_at,
      aal: claims.aal,
      hasVerifiedTotp,
      role,
    }),
    userId: user?.id ?? null,
    email,
  };
}

export async function getSession(): Promise<StaffSession | null> {
  if (isSupabaseAuthConfigured()) {
    const { decision, userId } = await getStaffAccess();
    return decision.state === "allowed" && userId
      ? { role: decision.role, sub: userId, provider: "supabase" }
      : null;
  }
  if (!isDevSignInEnabled()) return null; // production without sign-in: closed
  const store = await cookies();
  const payload = await verifySession(store.get(COOKIE)?.value, sessionSecret());
  return payload ? { role: payload.role, sub: payload.sub, provider: "dev-mock" } : null;
}

/** For pages and actions: the signed-in, verified role — or a redirect. */
export async function requireRole(): Promise<Role> {
  if (isSupabaseAuthConfigured()) {
    const { decision } = await getStaffAccess();
    if (decision.state !== "allowed") redirect(pathFor(decision));
    return decision.role;
  }
  const session = await getSession();
  if (!session) redirect("/admin/sign-in");
  return session.role;
}

/** Kept for existing callers — identical to `requireRole()`. */
export const getCurrentRole = requireRole;

export async function startDevSession(role: Role): Promise<void> {
  if (!isDevSignInEnabled()) return;
  const store = await cookies();
  store.set(
    COOKIE,
    await signSession(
      { sub: `dev:${role}`, role, provider: "dev-mock", exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS },
      sessionSecret(),
    ),
    {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      path: "/admin",
      maxAge: SESSION_TTL_SECONDS,
    },
  );
  await recordAuditEvent({
    actor: role,
    action: "sign_in",
    propertyId: "-",
    details: "Development sign-in (mock, no credentials)",
  });
}

export async function endSession(): Promise<void> {
  const session = await getSession();
  if (isSupabaseAuthConfigured()) {
    const supabase = await createSupabaseServer();
    await supabase.auth.signOut();
  } else {
    const store = await cookies();
    store.delete({ name: COOKIE, path: "/admin" });
  }
  if (session) {
    await recordAuditEvent({
      actor: session.role,
      action: "sign_out",
      propertyId: "-",
      details: "Signed out",
    });
  }
}
