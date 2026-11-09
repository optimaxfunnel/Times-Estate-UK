// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { describe, expect, it } from "vitest";
import { baseContactSchema, LEAD_CONFIRMATION_COPY } from "@/lib/leads/lead-schema";
import { LEAD_CATEGORIES } from "@/lib/leads/types";

const valid = {
  fullName: "Test Person",
  email: "test@example.com",
  phone: "020 7946 0000",
  privacyConsent: "on",
};

describe("contact details on every lead form", () => {
  it("accepts complete details", () => {
    expect(baseContactSchema.safeParse(valid).success).toBe(true);
  });

  it("requires privacy consent", () => {
    const r = baseContactSchema.safeParse({ ...valid, privacyConsent: undefined });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toEqual(["privacyConsent"]);
  });

  it.each([
    ["fullName", "A"],
    ["email", "not-an-email"],
    ["phone", "123"],
    ["phone", "1".repeat(25)],
  ])("rejects a bad %s with a readable message", (field, value) => {
    const r = baseContactSchema.safeParse({ ...valid, [field]: value });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toMatch(/^Please enter/);
  });
});

describe("confirmation wording", () => {
  it("has a message for every lead type", () => {
    for (const c of LEAD_CATEGORIES) expect(LEAD_CONFIRMATION_COPY[c]).toBeTruthy();
  });

  it("never tells someone their viewing is confirmed", () => {
    expect(LEAD_CONFIRMATION_COPY.viewing_request).toMatch(/not yet confirmed/i);
  });

  it("never promises a valuation figure", () => {
    for (const text of Object.values(LEAD_CONFIRMATION_COPY))
      expect(text).not.toMatch(/£|worth|valued at/i);
  });
});
