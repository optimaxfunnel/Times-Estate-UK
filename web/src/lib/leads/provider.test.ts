// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetLeadsForTests,
  addLeadNote,
  assignLead,
  createLead,
  getLeadById,
  listLeads,
  recordLeadValuation,
  updateLeadDetails,
  updateLeadStage,
  type CreateLeadInput,
} from "@/lib/leads/provider";
import { getAuditLog } from "@/lib/auth/audit-log";

const input = (over: Partial<CreateLeadInput> = {}): CreateLeadInput => ({
  category: "general_enquiry",
  sourcePage: "/contact",
  contactName: "Private Person",
  contactEmail: "private.person@example.com",
  contactPhone: "020 7946 0001",
  detail: "Hello",
  consentGiven: true,
  ...over,
});

beforeEach(async () => { await __resetLeadsForTests(); });

describe("lead store", () => {
  it("lists newest first and filters by type and stage", async () => {
    const a = await createLead(input());
    const b = await createLead(input({ category: "callback_request" }));
    expect((await listLeads()).map((l) => l.id)).toEqual([b.id, a.id]);
    expect((await listLeads({ category: "callback_request" }))).toHaveLength(1);
    await updateLeadStage(a.id, "closed", "manager");
    expect((await listLeads({ stage: "closed" })).map((l) => l.id)).toEqual([a.id]);
  });

  it("records the consent time when the lead is created", async () => {
    const lead = await createLead(input());
    expect(lead.consentTimestamp).toBe(lead.createdAt);
  });

  it("sets repair priority from the urgency chosen", async () => {
    expect((await createLead(input({ category: "repair_report", extra: { urgency: "emergency" } }))).priority).toBe("emergency");
    expect((await createLead(input({ category: "repair_report", extra: { urgency: "urgent" } }))).priority).toBe("urgent");
    expect((await createLead(input({ category: "repair_report" }))).priority).toBe("routine");
    expect((await createLead(input())).priority).toBe("routine");
  });

  it("moves a new lead to Assigned when someone is assigned", async () => {
    const lead = await createLead(input());
    expect((await assignLead(lead.id, "manager", "administrator"))?.stage).toBe("assigned");
  });

  it("logs each change in the audit log", async () => {
    const lead = await createLead(input());
    await updateLeadDetails(lead.id, { priority: "urgent", followUpDate: "2099-01-01" }, "manager");
    expect((await getAuditLog())[0].details).toMatch(/priority routine -> urgent.*follow-up 2099-01-01/);
  });

  it("does nothing, and logs nothing, when nothing changed", async () => {
    const lead = await createLead(input());
    const before = (await getAuditLog()).length;
    await updateLeadDetails(lead.id, { priority: "routine" }, "manager");
    expect((await getAuditLog())).toHaveLength(before);
  });

  it("keeps notes and records a confirmed valuation", async () => {
    const lead = await createLead(input({ category: "sales_valuation" }));
    await addLeadNote(lead.id, "Called, left message", "manager");
    await recordLeadValuation(lead.id, {
      figure: 500000,
      basis: "initial_appraisal",
      confirmedBy: "manager",
      confirmedAt: new Date().toISOString(),
    });
    const saved = (await getLeadById(lead.id))!;
    expect(saved.notes[0].text).toBe("Called, left message");
    expect(saved.valuation?.figure).toBe(500000);
    expect((await getAuditLog())[0].action).toBe("approve");
  });

  it("returns null for an unknown lead instead of throwing", async () => {
    expect((await getLeadById("nope"))).toBeNull();
    expect(await updateLeadStage("nope", "closed", "manager")).toBeNull();
    expect(await addLeadNote("nope", "x", "manager")).toBeNull();
  });
});

describe("staff notification (no email provider connected)", () => {
  it("records 'not sent' and never logs the customer's personal details", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const lead = await createLead(input());
    expect(lead.notificationStatus).toBe("not_sent");
    expect(lead.notificationLog[0]).toMatch(/NOT SENT/);
    const written = JSON.stringify(log.mock.calls) + lead.notificationLog.join();
    expect(written).not.toMatch(/private\.person|Private Person|7946/);
    log.mockRestore();
  });

  it("records a delivery failure so staff know to check the list", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const lead = await createLead(input({ contactEmail: "faildelivery@example.com" }));
    expect(lead.notificationStatus).toBe("failed");
    expect(lead.notificationLog[0]).toMatch(/DELIVERY FAILED/);
    err.mockRestore();
  });

  it("routes each type to the right team", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const team = async (category: CreateLeadInput["category"]) =>
      (await createLead(input({ category }))).notificationLog[0];
    expect(await team("sales_valuation")).toMatch(/sales team/);
    expect(await team("tenant_registration")).toMatch(/lettings team/);
    expect(await team("commercial_enquiry")).toMatch(/commercial team/);
    expect(await team("repair_report")).toMatch(/property management team/);
    expect(await team("general_enquiry")).toMatch(/general enquiries team/);
    vi.restoreAllMocks();
  });
});
