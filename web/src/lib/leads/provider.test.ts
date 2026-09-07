import { describe, expect, it, beforeEach } from "vitest";
import {
  createLead,
  listLeads,
  getLeadById,
  updateLeadStage,
  addLeadNote,
  __resetLeadsForTests,
} from "@/lib/leads/provider";

const baseInput = {
  category: "general_enquiry" as const,
  sourcePage: "/contact",
  contactName: "Jo Bloggs",
  contactEmail: "jo@example.com",
  contactPhone: "07123456789",
  detail: "A test enquiry.",
  consentGiven: true,
};

describe("createLead", () => {
  beforeEach(() => __resetLeadsForTests());

  it("creates a lead with stage New and a unique id", () => {
    const lead = createLead(baseInput);
    expect(lead.stage).toBe("new");
    expect(lead.id).toBeTruthy();
    expect(getLeadById(lead.id)?.id).toBe(lead.id);
  });

  it("defaults to routine priority for a non-repair lead", () => {
    const lead = createLead(baseInput);
    expect(lead.priority).toBe("routine");
  });

  it("derives priority from urgency for a repair report", () => {
    const emergency = createLead({
      ...baseInput,
      category: "repair_report",
      extra: { urgency: "emergency" },
    });
    expect(emergency.priority).toBe("emergency");

    const routine = createLead({
      ...baseInput,
      category: "repair_report",
      extra: { urgency: "routine" },
    });
    expect(routine.priority).toBe("routine");
  });

  it("logs a delivery failure without losing the lead, when delivery is simulated to fail", () => {
    const lead = createLead({
      ...baseInput,
      contactEmail: "test+faildelivery@example.com",
    });
    expect(lead.notificationStatus).toBe("failed");
    expect(lead.notificationLog[0]).toMatch(/DELIVERY FAILED/);
    // The lead itself must still exist and be manageable even though notification failed.
    expect(getLeadById(lead.id)).not.toBeNull();
  });

  it("logs a normal not-sent status when delivery is not simulated to fail", () => {
    const lead = createLead(baseInput);
    expect(lead.notificationStatus).toBe("not_sent");
  });
});

describe("listLeads", () => {
  beforeEach(() => __resetLeadsForTests());

  it("filters by category", () => {
    createLead(baseInput);
    createLead({
      ...baseInput,
      category: "repair_report",
      extra: { urgency: "routine" },
    });
    const repairs = listLeads({ category: "repair_report" });
    expect(repairs).toHaveLength(1);
    expect(repairs[0].category).toBe("repair_report");
  });

  it("returns newest first", () => {
    const first = createLead(baseInput);
    const second = createLead(baseInput);
    const all = listLeads();
    expect(all[0].id).toBe(second.id);
    expect(all[1].id).toBe(first.id);
  });
});

describe("stage transitions and notes", () => {
  beforeEach(() => __resetLeadsForTests());

  it("moves a lead through its stages and records who changed it", () => {
    const lead = createLead(baseInput);
    const updated = updateLeadStage(lead.id, "acknowledged", "manager");
    expect(updated?.stage).toBe("acknowledged");

    const withNote = addLeadNote(lead.id, "Called, left voicemail.", "manager");
    expect(withNote?.notes).toHaveLength(1);
    expect(withNote?.notes[0].text).toBe("Called, left voicemail.");
  });

  it("returns null when updating a lead that doesn't exist", () => {
    expect(updateLeadStage("does-not-exist", "closed", "manager")).toBeNull();
  });
});
