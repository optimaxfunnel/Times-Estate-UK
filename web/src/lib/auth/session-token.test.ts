// @vitest-environment node
// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { describe, expect, it } from "vitest";
import {
  SESSION_TTL_SECONDS,
  signSession,
  verifySession,
  type SessionPayload,
} from "@/lib/auth/session-token";

const SECRET = "a-test-secret-that-is-at-least-32-characters-long";
const NOW = 1_800_000_000;

const payload = (over: Partial<SessionPayload> = {}): SessionPayload => ({
  sub: "dev:manager",
  role: "manager",
  provider: "dev-mock",
  exp: NOW + SESSION_TTL_SECONDS,
  ...over,
});

const b64url = (s: string) =>
  btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

describe("signed staff session token", () => {
  it("accepts a token it signed itself", async () => {
    const token = await signSession(payload(), SECRET);
    expect((await verifySession(token, SECRET, NOW))?.role).toBe("manager");
  });

  it("lasts 8 hours", () => {
    expect(SESSION_TTL_SECONDS).toBe(8 * 60 * 60);
  });

  it("rejects a token whose role was edited in the browser", async () => {
    const token = await signSession(payload({ role: "property_editor" }), SECRET);
    const [, sig] = token.split(".");
    const forgedBody = b64url(JSON.stringify(payload({ role: "administrator" })));
    expect(await verifySession(`${forgedBody}.${sig}`, SECRET, NOW)).toBeNull();
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await signSession(payload(), "another-secret-also-32-characters-long!!");
    expect(await verifySession(token, SECRET, NOW)).toBeNull();
  });

  it("rejects an expired token", async () => {
    const token = await signSession(payload({ exp: NOW - 1 }), SECRET);
    expect(await verifySession(token, SECRET, NOW)).toBeNull();
  });

  it("rejects a token naming a role that does not exist", async () => {
    const token = await signSession(
      payload({ role: "superuser" as SessionPayload["role"] }),
      SECRET,
    );
    expect(await verifySession(token, SECRET, NOW)).toBeNull();
  });

  it.each([undefined, "", "no-dot", ".", "abc.", ".abc", "!!!.@@@"])(
    "rejects malformed input %j without throwing",
    async (bad) => {
      expect(await verifySession(bad, SECRET, NOW)).toBeNull();
    },
  );

  it("rejects an unsigned token claiming to be valid", async () => {
    const body = b64url(JSON.stringify(payload()));
    expect(await verifySession(`${body}.${b64url("x")}`, SECRET, NOW)).toBeNull();
  });
});
