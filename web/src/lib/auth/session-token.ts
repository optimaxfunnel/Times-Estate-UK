import { ROLES, type Role } from "@/lib/auth/roles";

/**
 * Signed, expiring session token (HMAC-SHA256 via the Web Crypto API —
 * no extra dependency). Format: base64url(JSON payload) + "." +
 * base64url(signature). A token whose signature, role or expiry does
 * not check out is rejected, so a visitor can no longer give themselves
 * a role by editing a cookie (the Day 4 mock's main weakness).
 *
 * This is the integration seam for real authentication: once Auth.js
 * (or another approved provider, INTEGRATIONS.md) is connected, it
 * issues the session and this module is replaced; pages and actions
 * only ever call `getSession()` / `requireRole()` in session.ts.
 */
export interface SessionPayload {
  /** Stable user id. Mock sessions use "dev:<role>" — never a real person. */
  sub: string;
  role: Role;
  /** Who issued it: "dev-mock" today; e.g. "authjs" once real auth exists. */
  provider: "dev-mock";
  /** Expiry, seconds since epoch. */
  exp: number;
}

export const SESSION_TTL_SECONDS = 8 * 60 * 60;

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signSession(
  payload: SessionPayload,
  secret: string,
): Promise<string> {
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(secret),
    encoder.encode(body),
  );
  return `${body}.${toBase64Url(new Uint8Array(sig))}`;
}

export async function verifySession(
  token: string | undefined,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<SessionPayload | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  let valid = false;
  try {
    valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      fromBase64Url(sig) as BufferSource,
      encoder.encode(body),
    );
  } catch {
    return null;
  }
  if (!valid) return null;
  try {
    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(body)),
    ) as SessionPayload;
    if (!(ROLES as readonly string[]).includes(payload.role)) return null;
    if (typeof payload.exp !== "number" || payload.exp <= nowSeconds)
      return null;
    return payload;
  } catch {
    return null;
  }
}
