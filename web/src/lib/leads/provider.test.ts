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

beforeEach(() => __resetLeadsForTests());

describe("lead store", () => {
  it("lists newest first and filters by type and stage", () => {
    const a = createLead(input());
    const b = createLead(input({ category: "callback_request" }));
    expect(listLeads().map((l) => l.id)).toEqual([b.id, a.id]);
    expect(listLeads({ category: "callback_request" })).toHaveLength(1);
    updateLeadStage(a.id, "closed", "manager");
    expect(listLeads({ stage: "closed" }).map((l) => l.id)).toEqual([a.id]);
  });

  it("records the consent time when the lead is created", () => {
    const lead = createLead(input());
    expect(lead.consentTimestamp).toBe(lead.createdAt);
  });

  it("sets repair priority from the urgency chosen", () => {
    expect(createLead(input({ category: "repair_report", extra: { urgency: "emergency" } })).priority).toBe("emergency");
    expect(createLead(input({ category: "repair_report", extra: { urgency: "urgent" } })).priority).toBe("urgent");
    expect(createLead(input({ category: "repair_report" })).priority).toBe("routine");
    expect(createLead(input()).priority).toBe("routine");
  });

  it("moves a new lead to Assigned when someone is assigned", () => {
    const lead = createLead(input());
    expect(assignLead(lead.id, "manager", "administrator")?.stage).toBe("assigned");
  });

  it("logs each change in the audit log", () => {
    const lead = createLead(input());
    updateLeadDetails(lead.id, { priority: "urgent", followUpDate: "2099-01-01" }, "manager");
    expect(getAuditLog()[0].details).toMatch(/priority routine -> urgent.*follow-up 2099-01-01/);
  });

  it("does nothing, and logs nothing, when nothing changed", () => {
    const lead = createLead(input());
    const before = getAuditLog().length;
    updateLeadDetails(lead.id, { priority: "routine" }, "manager");
    expect(getAuditLog()).toHaveLength(before);
  });

  it("keeps notes and records a confirmed valuation", () => {
    const lead = createLead(input({ category: "sales_valuation" }));
    addLeadNote(lead.id, "Called, left message", "manager");
    recordLeadValuation(lead.id, {
      figure: 500000,
      basis: "initial_appraisal",
      confirmedBy: "manager",
      confirmedAt: new Date().toISOString(),
    });
    const saved = getLeadById(lead.id)!;
    expect(saved.notes[0].text).toBe("Called, left message");
    expect(saved.valuation?.figure).toBe(500000);
    expect(getAuditLog()[0].action).toBe("approve");
  });

  it("returns null for an unknown lead instead of throwing", () => {
    expect(getLeadById("nope")).toBeNull();
    expect(updateLeadStage("nope", "closed", "manager")).toBeNull();
    expect(addLeadNote("nope", "x", "manager")).toBeNull();
  });
});

describe("staff notification (no email provider connected)", () => {
  it("records 'not sent' and never logs the customer's personal details", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const lead = createLead(input());
    expect(lead.notificationStatus).toBe("not_sent");
    expect(lead.notificationLog[0]).toMatch(/NOT SENT/);
    const written = JSON.stringify(log.mock.calls) + lead.notificationLog.join();
    expect(written).not.toMatch(/private\.person|Private Person|7946/);
    log.mockRestore();
  });

  it("records a delivery failure so staff know to check the list", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const lead = createLead(input({ contactEmail: "faildelivery@example.com" }));
    expect(lead.notificationStatus).toBe("failed");
    expect(lead.notificationLog[0]).toMatch(/DELIVERY FAILED/);
    err.mockRestore();
  });

  it("routes each type to the right team", () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const team = (category: CreateLeadInput["category"]) =>
      createLead(input({ category })).notificationLog[0];
    expect(team("sales_valuation")).toMatch(/sales team/);
    expect(team("tenant_registration")).toMatch(/lettings team/);
    expect(team("commercial_enquiry")).toMatch(/commercial team/);
    expect(team("repair_report")).toMatch(/property management team/);
    expect(team("general_enquiry")).toMatch(/general enquiries team/);
    vi.restoreAllMocks();
  });
});
