import type {
  Lead,
  LeadCategory,
  LeadPriority,
  LeadStage,
} from "@/lib/leads/types";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { logNotificationAttempt } from "@/lib/leads/notify";

/**
 * In-memory lead store — a stand-in for a real CRM/database, exactly like
 * `DemoPropertyProvider` (see /web/src/lib/property/provider.ts). Resets
 * when the server restarts. No customer data is imported here; every lead
 * is created by a real form submission during this running session.
 */

export interface CreateLeadInput {
  category: LeadCategory;
  sourcePage: string;
  propertyReference?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  detail: string;
  extra?: Record<string, string>;
  consentGiven: boolean;
  marketingConsent?: boolean;
  priority?: LeadPriority;
}

let leads: Lead[] = [];
let counter = 0;

function defaultPriority(
  category: LeadCategory,
  extra?: Record<string, string>,
): LeadPriority {
  if (category === "repair_report") {
    const urgency = extra?.urgency;
    if (urgency === "emergency") return "emergency";
    if (urgency === "urgent") return "urgent";
    return "routine";
  }
  return "routine";
}

export function createLead(input: CreateLeadInput): Lead {
  counter += 1;
  const now = new Date().toISOString();
  const lead: Lead = {
    id: `lead-${counter}-${Date.now().toString(36)}`,
    createdAt: now,
    updatedAt: now,
    category: input.category,
    sourcePage: input.sourcePage,
    propertyReference: input.propertyReference,
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    contactPhone: input.contactPhone,
    detail: input.detail,
    extra: input.extra,
    consentGiven: input.consentGiven,
    consentTimestamp: now,
    marketingConsent: input.marketingConsent,
    priority: input.priority ?? defaultPriority(input.category, input.extra),
    stage: "new",
    notes: [],
    notificationStatus: "not_sent",
    notificationLog: [],
  };

  const notifyResult = logNotificationAttempt(lead);
  lead.notificationStatus = notifyResult.status;
  lead.notificationLog.push(notifyResult.log);

  leads.push(lead);
  recordAuditEvent({
    actor: "system",
    action: "create",
    propertyId: lead.propertyReference ?? lead.id,
    details: `Lead ${lead.id} created (${lead.category})`,
  });
  return lead;
}

export function listLeads(filter?: {
  category?: LeadCategory;
  stage?: LeadStage;
}): Lead[] {
  // Newest first. Leads are always appended in creation order, so
  // reversing is correct even when two leads share the same millisecond
  // timestamp (sorting by createdAt alone can't distinguish those, and
  // did produce a flaky ordering here before this fix).
  return leads
    .filter((l) => !filter?.category || l.category === filter.category)
    .filter((l) => !filter?.stage || l.stage === filter.stage)
    .slice()
    .reverse();
}

export function getLeadById(id: string): Lead | null {
  return leads.find((l) => l.id === id) ?? null;
}

export function updateLeadStage(
  id: string,
  stage: LeadStage,
  actor: string,
): Lead | null {
  const lead = getLeadById(id);
  if (!lead) return null;
  const before = lead.stage;
  lead.stage = stage;
  lead.updatedAt = new Date().toISOString();
  recordAuditEvent({
    actor,
    action: "status_change",
    propertyId: lead.id,
    details: `Lead stage ${before} -> ${stage}`,
  });
  return lead;
}

export function assignLead(
  id: string,
  assignee: string,
  actor: string,
): Lead | null {
  const lead = getLeadById(id);
  if (!lead) return null;
  lead.assignedTo = assignee;
  lead.stage = lead.stage === "new" ? "assigned" : lead.stage;
  lead.updatedAt = new Date().toISOString();
  recordAuditEvent({
    actor,
    action: "update",
    propertyId: lead.id,
    details: `Assigned to ${assignee}`,
  });
  return lead;
}

export function updateLeadDetails(
  id: string,
  changes: {
    assignedTo?: string;
    priority?: Lead["priority"];
    followUpDate?: string | null;
  },
  actor: string,
): Lead | null {
  const lead = getLeadById(id);
  if (!lead) return null;
  const parts: string[] = [];
  if (
    changes.assignedTo !== undefined &&
    changes.assignedTo !== (lead.assignedTo ?? "")
  ) {
    lead.assignedTo = changes.assignedTo || undefined;
    if (lead.assignedTo && lead.stage === "new") lead.stage = "assigned";
    parts.push(`assigned to ${lead.assignedTo ?? "nobody"}`);
  }
  if (changes.priority && changes.priority !== lead.priority) {
    parts.push(`priority ${lead.priority} -> ${changes.priority}`);
    lead.priority = changes.priority;
  }
  if (
    changes.followUpDate !== undefined &&
    (changes.followUpDate ?? "") !== (lead.followUpDate ?? "")
  ) {
    lead.followUpDate = changes.followUpDate || undefined;
    parts.push(`follow-up ${lead.followUpDate ?? "cleared"}`);
  }
  if (parts.length === 0) return lead;
  lead.updatedAt = new Date().toISOString();
  recordAuditEvent({
    actor,
    action: "update",
    propertyId: lead.id,
    details: `Lead ${parts.join(", ")}`,
  });
  return lead;
}

export function addLeadNote(
  id: string,
  text: string,
  author: string,
): Lead | null {
  const lead = getLeadById(id);
  if (!lead) return null;
  lead.notes.push({ timestamp: new Date().toISOString(), author, text });
  lead.updatedAt = new Date().toISOString();
  return lead;
}

export function recordLeadValuation(
  id: string,
  record: NonNullable<Lead["valuation"]>,
): Lead | null {
  const lead = getLeadById(id);
  if (!lead) return null;
  lead.valuation = record;
  lead.updatedAt = new Date().toISOString();
  recordAuditEvent({
    actor: record.confirmedBy,
    action: "approve",
    propertyId: lead.id,
    details: `Valuation confirmed: £${record.figure.toLocaleString("en-GB")} (${record.basis.replace(/_/g, " ")})`,
  });
  return lead;
}

/** Test-only reset so each test file starts from a clean slate. */
export function __resetLeadsForTests() {
  leads = [];
  counter = 0;
}
