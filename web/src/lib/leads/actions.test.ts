// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.50" }),
}));

import { submitLeadForm } from "@/lib/leads/actions";
import { __resetLeadsForTests, getLeadById, listLeads } from "@/lib/leads/provider";
import { __resetRateLimitForTests } from "@/lib/security/rate-limit";

const idle = { status: "idle" as const };

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const contact = {
  fullName: "Test Person",
  email: "test@example.com",
  phone: "020 7946 0000",
  privacyConsent: "on",
};

beforeEach(async () => {
  await __resetLeadsForTests();
  __resetRateLimitForTests();
});

describe("lead form submission", () => {
  it("creates a lead for a complete sales valuation request", async () => {
    const r = await submitLeadForm(
      idle,
      form({ ...contact, leadCategory: "sales_valuation", sourcePage: "/sell", propertyAddress: "1 Test Road, SW17" }),
    );
    expect(r.status).toBe("success");
    const lead = (await getLeadById(r.reference!))!;
    expect(lead.category).toBe("sales_valuation");
    expect(lead.sourcePage).toBe("/sell");
    expect(lead.consentGiven).toBe(true);
    expect(lead.stage).toBe("new");
    expect(lead.notificationStatus).toBe("not_sent");
  });

  it("refuses an unknown or forged category without creating anything", async () => {
    for (const leadCategory of ["", "admin", "repair_report", "__proto__"]) {
      const r = await submitLeadForm(idle, form({ ...contact, leadCategory }));
      expect(r.status).toBe("error");
    }
    expect((await listLeads())).toHaveLength(0);
  });

  it("lists each missing required field", async () => {
    const r = await submitLeadForm(
      idle,
      form({ leadCategory: "rental_valuation", sourcePage: "/let" }),
    );
    expect(r.status).toBe("error");
    expect(Object.keys(r.fieldErrors!)).toEqual(
      expect.arrayContaining(["fullName", "email", "phone", "propertyAddress", "currentlyTenanted"]),
    );
    expect((await listLeads())).toHaveLength(0);
  });

  // Finding (2026-11-09, minor): the consent message only appears once the
  // other contact fields are valid, because Zod runs .refine() last. Consent
  // is still always enforced, as this test shows.
  it("never creates a lead without privacy consent", async () => {
    const r = await submitLeadForm(
      idle,
      form({ ...contact, privacyConsent: "", leadCategory: "general_enquiry", message: "hi" }),
    );
    expect(r.status).toBe("error");
    expect(r.fieldErrors!.privacyConsent).toMatch(/Privacy Policy/);
    expect((await listLeads())).toHaveLength(0);
  });

  it("pretends to succeed for a bot but stores nothing", async () => {
    const r = await submitLeadForm(
      idle,
      form({ ...contact, leadCategory: "general_enquiry", message: "hi", website: "http://spam.example" }),
    );
    expect(r.status).toBe("success");
    expect(r.reference).toBeUndefined();
    expect((await listLeads())).toHaveLength(0);
  });

  it("asks a person to wait after repeated submissions", async () => {
    const fields = { ...contact, leadCategory: "callback_request", bestTimeToCall: "Morning" };
    for (let i = 0; i < 5; i++) await submitLeadForm(idle, form(fields));
    const r = await submitLeadForm(idle, form(fields));
    expect(r.status).toBe("rate_limited");
    expect(r.message).toMatch(/wait \d+ seconds/);
  });

  it("strips HTML and keeps routing fields out of the stored lead", async () => {
    const r = await submitLeadForm(
      idle,
      form({
        ...contact,
        fullName: "<b>Test</b> Person",
        leadCategory: "general_enquiry",
        sourcePage: "/contact",
        message: "<script>x</script>Hello",
        $ACTION_ID_abc: "1",
      }),
    );
    const lead = (await getLeadById(r.reference!))!;
    expect(lead.contactName).toBe("Test Person");
    expect(lead.detail).toBe("xHello");
    expect(lead.extra ?? {}).not.toHaveProperty("leadCategory");
    expect(lead.extra ?? {}).not.toHaveProperty("sourcePage");
    expect(Object.keys(lead.extra ?? {}).some((k) => k.startsWith("$ACTION"))).toBe(false);
  });

  it("replaces an off-site source page with /", async () => {
    const r = await submitLeadForm(
      idle,
      form({ ...contact, leadCategory: "general_enquiry", sourcePage: "https://evil.example/x", message: "hi" }),
    );
    expect((await getLeadById(r.reference!))!.sourcePage).toBe("/");
  });

  it("rejects viewing dates in the past", async () => {
    const r = await submitLeadForm(
      idle,
      form({
        ...contact,
        leadCategory: "viewing_request",
        preferredDate1: "2000-01-01",
        preferredTime1: "Morning",
        qualification: "Mortgage in principle",
      }),
    );
    expect(r.status).toBe("error");
    expect(r.fieldErrors!.preferredDate1).toMatch(/today onwards/);
  });

  it("never says a viewing is confirmed", async () => {
    const r = await submitLeadForm(
      idle,
      form({
        ...contact,
        leadCategory: "viewing_request",
        propertyReference: "demo-res-sale-1 — Sample Street, London",
        preferredDate1: "2099-01-01",
        preferredTime1: "Morning",
        qualification: "Cash buyer",
      }),
    );
    expect(r.status).toBe("success");
    expect(r.message).toMatch(/not yet confirmed/i);
  });
});
