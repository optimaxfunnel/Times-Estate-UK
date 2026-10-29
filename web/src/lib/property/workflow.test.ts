import { describe, expect, it } from "vitest";
import { canChangeStatus, canEditContent } from "@/lib/property/workflow";
import {
  signSession,
  verifySession,
  type SessionPayload,
} from "@/lib/auth/session-token";

describe("property status workflow", () => {
  it("lets a Property Editor submit a draft for approval but not publish it", () => {
    expect(
      canChangeStatus("property_editor", "draft", "awaiting_approval").allowed,
    ).toBe(true);
    expect(
      canChangeStatus("property_editor", "awaiting_approval", "available")
        .allowed,
    ).toBe(false);
  });

  it("lets a Manager publish, and record sold or let", () => {
    expect(
      canChangeStatus("manager", "awaiting_approval", "available").allowed,
    ).toBe(true);
    expect(canChangeStatus("manager", "under_offer", "sold").allowed).toBe(
      true,
    );
    expect(canChangeStatus("manager", "let_agreed", "let").allowed).toBe(true);
  });

  it("stops a Property Editor withdrawing, archiving or pulling a live listing", () => {
    expect(
      canChangeStatus("property_editor", "available", "withdrawn").allowed,
    ).toBe(false);
    expect(
      canChangeStatus("property_editor", "draft", "archived").allowed,
    ).toBe(false);
    expect(
      canChangeStatus("property_editor", "available", "draft").allowed,
    ).toBe(false);
  });

  it("treats editing the text of a live listing as a public change", () => {
    expect(canEditContent("property_editor", "available").allowed).toBe(false);
    expect(canEditContent("property_editor", "draft").allowed).toBe(true);
    expect(canEditContent("manager", "available").allowed).toBe(true);
  });

  it("gives Content Editors and Enquiry Viewers no property powers", () => {
    for (const role of ["content_editor", "enquiry_viewer"] as const) {
      expect(canChangeStatus(role, "draft", "awaiting_approval").allowed).toBe(
        false,
      );
      expect(canEditContent(role, "draft").allowed).toBe(false);
    }
  });
});

describe("signed admin session token", () => {
  const secret = "test-secret-that-is-at-least-32-characters-long";
  const payload: SessionPayload = {
    sub: "dev:manager",
    role: "manager",
    provider: "dev-mock",
    exp: 2_000_000_000,
  };

  it("round-trips a valid token", async () => {
    const token = await signSession(payload, secret);
    expect(await verifySession(token, secret, 1_000)).toEqual(payload);
  });

  it("rejects a token whose role was edited", async () => {
    const token = await signSession(payload, secret);
    const [, sig] = token.split(".");
    const forged = btoa(JSON.stringify({ ...payload, role: "administrator" }))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    expect(await verifySession(`${forged}.${sig}`, secret, 1_000)).toBeNull();
  });

  it("rejects an expired token, a wrong secret and a missing token", async () => {
    const token = await signSession(payload, secret);
    expect(await verifySession(token, secret, 2_000_000_001)).toBeNull();
    expect(
      await verifySession(
        token,
        "another-secret-of-sufficient-length-123",
        1_000,
      ),
    ).toBeNull();
    expect(await verifySession(undefined, secret)).toBeNull();
  });
});
