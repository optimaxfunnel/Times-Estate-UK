import { cookies } from "next/headers";
import { type Role, ROLES } from "@/lib/auth/roles";

/**
 * ⚠️ DEVELOPMENT-ONLY MOCK SESSION — NOT REAL AUTHENTICATION.
 *
 * This reads a plain, unsigned cookie to let today's build demonstrate
 * and test the five-role permission model against real pages. It has
 * none of the properties a real authentication system needs:
 *
 *   - no password or credential of any kind
 *   - no verification that the "user" is who they claim (anyone can
 *     change the cookie value in their own browser)
 *   - no session expiry, no secure/httpOnly flags meaningfully enforced
 *     against a determined visitor, no CSRF protection
 *
 * CLAUDE.md Rule 4 requires the owner's approval before any real
 * authentication or paid identity service is connected — see
 * /INTEGRATIONS.md's Authentication section for the options compared
 * (Auth.js, Clerk, Auth0). This mock exists ONLY so that permission
 * boundaries (who can create/edit/approve a property, who can see
 * enquiries, etc.) can be built and tested today, and MUST be replaced
 * before this admin area is ever deployed anywhere reachable by the
 * public — see CLAUDE.md Rule 6.
 *
 * No fake "production" user accounts or passwords exist anywhere in this
 * codebase, per today's explicit instruction.
 */

const SESSION_COOKIE = "dev_mock_role";
const DEFAULT_ROLE: Role = "property_editor";

export async function getCurrentRole(): Promise<Role> {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  if (value && (ROLES as readonly string[]).includes(value)) {
    return value as Role;
  }
  return DEFAULT_ROLE;
}

export async function setMockRole(role: Role) {
  const store = await cookies();
  store.set(SESSION_COOKIE, role, { httpOnly: true, sameSite: "lax", path: "/" });
}
