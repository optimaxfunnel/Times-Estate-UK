// Staff access rules for Supabase Auth sign-in (added 2026-11-09).
import { describe, expect, it } from "vitest";
import { decideAccess, lookupStaffRole, pathFor, type AccessInput } from "@/lib/auth/access";
import { isSupabaseAuthConfigured } from "@/lib/auth/supabase";
import { getDb } from "@/lib/db/client";

const full: AccessInput = {
  signedIn: true,
  emailConfirmed: true,
  aal: "aal2",
  hasVerifiedTotp: true,
  role: "manager",
};

describe("who may use the admin area", () => {
  it("lets in a signed-in, code-verified member of staff with a role", () => {
    expect(decideAccess(full)).toEqual({ state: "allowed", role: "manager" });
  });

  it("sends a visitor with no session to sign in", () => {
    expect(decideAccess({ ...full, signedIn: false })).toEqual({ state: "signed_out" });
  });

  it("never lets anyone in on a password alone", () => {
    expect(decideAccess({ ...full, aal: "aal1" }).state).toBe("needs_2fa_code");
    expect(decideAccess({ ...full, aal: "aal1", hasVerifiedTotp: false }).state).toBe("needs_2fa_setup");
    expect(decideAccess({ ...full, aal: null }).state).not.toBe("allowed");
  });

  it("refuses a verified account that the owner has not given a role", () => {
    expect(decideAccess({ ...full, role: null })).toEqual({ state: "no_role" });
    expect(decideAccess({ ...full, role: "superadmin" })).toEqual({ state: "no_role" });
  });

  it("refuses an account whose email is not confirmed", () => {
    expect(decideAccess({ ...full, emailConfirmed: false })).toEqual({ state: "email_unconfirmed" });
  });

  it("routes each state to the right page", () => {
    expect(pathFor({ state: "signed_out" })).toBe("/admin/sign-in");
    expect(pathFor({ state: "needs_2fa_setup" })).toBe("/admin/two-step");
    expect(pathFor({ state: "needs_2fa_code" })).toBe("/admin/two-step");
    expect(pathFor({ state: "no_role" })).toBe("/admin/sign-in?error=no_access");
    expect(pathFor({ state: "allowed", role: "manager" })).toBe("/admin/properties");
  });
});

describe("staff roles table", () => {
  it("finds a role by email, ignoring capital letters", async () => {
    const db = await getDb();
    await db.query("insert into staff_roles (email, role) values ('owner@example.com', 'administrator') on conflict do nothing");
    expect(await lookupStaffRole("Owner@Example.com")).toBe("administrator");
    expect(await lookupStaffRole("someone-else@example.com")).toBeNull();
    expect(await lookupStaffRole(null)).toBeNull();
  });

  it("only accepts the five real roles and lower-case emails", async () => {
    const db = await getDb();
    await expect(db.query("insert into staff_roles (email, role) values ('a@example.com', 'god')")).rejects.toThrow();
    await expect(db.query("insert into staff_roles (email, role) values ('UPPER@example.com', 'manager')")).rejects.toThrow();
  });

  it("is protected by row-level security, like every other table", async () => {
    const db = await getDb();
    const rows = await db.query<{ r: boolean }>("select relrowsecurity as r from pg_class where relname = 'staff_roles'");
    expect(rows[0].r).toBe(true);
  });
});

describe("tests never reach the live sign-in service", () => {
  it("treats Supabase Auth as not configured under the test runner", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test";
    try {
      expect(isSupabaseAuthConfigured()).toBe(false);
    } finally {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    }
  });
});
