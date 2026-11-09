import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type Role } from "@/lib/auth/roles";
import {
  SESSION_TTL_SECONDS,
  signSession,
  verifySession,
  type SessionPayload,
} from "@/lib/auth/session-token";
import { recordAuditEvent } from "@/lib/auth/audit-log";

/**
 * Admin session — DEVELOPMENT MOCK SIGN-IN, hardened.
 *
 * No real authentication provider has been approved yet (Rule 4;
 * INTEGRATIONS.md recommends Auth.js). Until one is, this module gives
 * the admin area a safe stand-in:
 *
 *  - FAIL CLOSED: no valid session → no admin access (the old mock gave
 *    every visitor the Property Editor role by default).
 *  - SIGNED + EXPIRING: the cookie is an HMAC-signed token (8 hours);
 *    editing it in the browser invalidates it.
 *  - httpOnly, SameSite=Strict, Secure outside development.
 *  - DISABLED IN PRODUCTION: `isDevSignInEnabled()` is false whenever
 *    NODE_ENV is "production", so a deployed build has no way to sign
 *    in at all until real authentication is connected — the admin area
 *    shows "not available" rather than an open door.
 *  - NO USERS OR PASSWORDS: the dev sign-in picks a role for testing;
 *    there is no account, password or personal data anywhere.
 *
 * Every page and server action calls `requireRole()` (or `getSession()`),
 * never the cookie directly, so swapping in a real provider changes
 * this file only.
 */

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
  return process.env.NODE_ENV !== "production";
}

export async function getSession(): Promise<SessionPayload | null> {
  if (!isDevSignInEnabled()) return null; // no real provider connected yet
  const store = await cookies();
  return verifySession(store.get(COOKIE)?.value, sessionSecret());
}

/** For pages and actions: the signed-in role, or a redirect to sign-in. */
export async function requireRole(): Promise<Role> {
  const session = await getSession();
  if (!session) redirect("/admin/sign-in");
  return session.role;
}

/** Kept for existing callers — identical to `requireRole()`. */
export const getCurrentRole = requireRole;

export async function startDevSession(role: Role): Promise<void> {
  if (!isDevSignInEnabled()) return;
  const payload: SessionPayload = {
    sub: `dev:${role}`,
    role,
    provider: "dev-mock",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const store = await cookies();
  store.set(COOKIE, await signSession(payload, sessionSecret()), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    path: "/admin",
    maxAge: SESSION_TTL_SECONDS,
  });
  await recordAuditEvent({
    actor: role,
    action: "sign_in",
    propertyId: "-",
    details: "Development sign-in (mock, no credentials)",
  });
}

export async function endSession(): Promise<void> {
  const session = await getSession();
  const store = await cookies();
  store.delete({ name: COOKIE, path: "/admin" });
  if (session) {
    await recordAuditEvent({
      actor: session.role,
      action: "sign_out",
      propertyId: "-",
      details: "Signed out",
    });
  }
}
