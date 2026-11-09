// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.60" }),
}));

import { submitRepairReport } from "@/lib/leads/repair-actions";
import { __resetLeadsForTests, getLeadById, listLeads } from "@/lib/leads/provider";
import { __resetRateLimitForTests } from "@/lib/security/rate-limit";

const idle = { status: "idle" as const };

const fields = {
  fullName: "Test Tenant",
  email: "tenant@example.com",
  phone: "07700 900000",
  propertyAddress: "Flat 1, 1 Test Road, SW17",
  issueCategory: "plumbing_leak",
  description: "Water dripping from the kitchen ceiling.",
  urgency: "urgent",
  privacyConsent: "on",
  contractorShareConsent: "on",
};

function form(over: Record<string, string> = {}, files: File[] = []): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries({ ...fields, ...over })) fd.set(k, v);
  for (const f of files) fd.append("photos", f);
  return fd;
}

const jpeg = (name = "leak.jpg") =>
  new File([new Uint8Array([0xff, 0xd8, 0xff, 0xe0, ...new Array(60).fill(0)])], name, { type: "image/jpeg" });

beforeEach(() => {
  __resetLeadsForTests();
  __resetRateLimitForTests();
});

describe("repair reports", () => {
  it("logs a report with its urgency as the lead priority", async () => {
    const r = await submitRepairReport(idle, form());
    expect(r.status).toBe("success");
    const lead = getLeadById(r.reference!)!;
    expect(lead.category).toBe("repair_report");
    expect(lead.priority).toBe("urgent");
    expect(lead.extra?.attachments).toBe("none");
  });

  it("tells an emergency reporter not to wait for a reply", async () => {
    const r = await submitRepairReport(idle, form({ urgency: "emergency" }));
    expect(r.message).toMatch(/emergency/i);
    expect(r.message).toMatch(/do not wait/i);
    expect(getLeadById(r.reference!)!.priority).toBe("emergency");
  });

  it("requires consent to share details with a contractor", async () => {
    const r = await submitRepairReport(idle, form({ contractorShareConsent: "" }));
    expect(r.status).toBe("error");
    expect(r.fieldErrors!.contractorShareConsent).toBeTruthy();
    expect(listLeads()).toHaveLength(0);
  });

  it("rejects an invented issue category or urgency", async () => {
    expect((await submitRepairReport(idle, form({ issueCategory: "anything" }))).status).toBe("error");
    expect((await submitRepairReport(idle, form({ urgency: "whenever" }))).status).toBe("error");
  });

  it("checks a real photo but does not keep it", async () => {
    const r = await submitRepairReport(idle, form({}, [jpeg()]));
    expect(r.status).toBe("success");
    expect(getLeadById(r.reference!)!.extra?.attachments).toMatch(/not kept/);
  });

  it("rejects a program disguised as a photo", async () => {
    const fake = new File([new Uint8Array([0x4d, 0x5a, ...new Array(60).fill(0)])], "photo.jpg", { type: "image/jpeg" });
    const r = await submitRepairReport(idle, form({}, [fake]));
    expect(r.status).toBe("error");
    expect(r.fieldErrors!.photos).toMatch(/does not look like a real JPEG/);
  });

  it("rejects more than five files", async () => {
    const r = await submitRepairReport(idle, form({}, Array.from({ length: 6 }, (_, i) => jpeg(`p${i}.jpg`))));
    expect(r.fieldErrors!.photos).toMatch(/no more than 5/);
  });

  it("stores nothing for a bot", async () => {
    const r = await submitRepairReport(idle, form({ website: "x" }));
    expect(r.status).toBe("success");
    expect(listLeads()).toHaveLength(0);
  });
});
