import { randomUUID } from "node:crypto";
import type {
  Lead,
  LeadCategory,
  LeadPriority,
  LeadStage,
} from "@/lib/leads/types";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { logNotificationAttempt } from "@/lib/leads/notify";
import { getDb, __truncateAllForTests } from "@/lib/db/client";

/**
 * Lead store, kept in the database (`leads` table) since 2026-11-09 so
 * enquiries survive restarts. Each lead is stored whole as JSON; stage and
 * category are copied into their own columns for filtering. Every lead is
 * created by a real form submission — none is imported.
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

type Row = { data: Lead | string };
const parse = (r: Row): Lead =>
  typeof r.data === "string" ? (JSON.parse(r.data) as Lead) : r.data;

async function save(lead: Lead): Promise<void> {
  const db = await getDb();
  await db.query(
    "update leads set data = $2::jsonb, stage = $3, updated_at = $4 where id = $1",
    [lead.id, JSON.stringify(lead), lead.stage, lead.updatedAt],
  );
}

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = {
    // Unique without a shared counter, so ids never repeat after a restart.
    id: `lead-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}`,
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

  const db = await getDb();
  await db.query(
    `insert into leads (id, data, category, stage, created_at, updated_at)
     values ($1, $2::jsonb, $3, $4, $5, $5)`,
    [lead.id, JSON.stringify(lead), lead.category, lead.stage, now],
  );
  await recordAuditEvent({
    actor: "system",
    action: "create",
    propertyId: lead.propertyReference ?? lead.id,
    details: `Lead ${lead.id} created (${lead.category})`,
  });
  return lead;
}

/** Newest first (by insertion order, so same-millisecond leads stay in order). */
export async function listLeads(filter?: {
  category?: LeadCategory;
  stage?: LeadStage;
}): Promise<Lead[]> {
  const db = await getDb();
  const rows = await db.query<Row>(
    `select data from leads
     where ($1::text is null or category = $1) and ($2::text is null or stage = $2)
     order by seq desc`,
    [filter?.category ?? null, filter?.stage ?? null],
  );
  return rows.map(parse);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const db = await getDb();
  const rows = await db.query<Row>("select data from leads where id = $1", [id]);
  return rows[0] ? parse(rows[0]) : null;
}

export async function updateLeadStage(
  id: string,
  stage: LeadStage,
  actor: string,
): Promise<Lead | null> {
  const lead = await getLeadById(id);
  if (!lead) return null;
  const before = lead.stage;
  lead.stage = stage;
  lead.updatedAt = new Date().toISOString();
  await save(lead);
  await recordAuditEvent({
    actor,
    action: "status_change",
    propertyId: lead.id,
    details: `Lead stage ${before} -> ${stage}`,
  });
  return lead;
}

export async function assignLead(
  id: string,
  assignee: string,
  actor: string,
): Promise<Lead | null> {
  const lead = await getLeadById(id);
  if (!lead) return null;
  lead.assignedTo = assignee;
  lead.stage = lead.stage === "new" ? "assigned" : lead.stage;
  lead.updatedAt = new Date().toISOString();
  await save(lead);
  await recordAuditEvent({
    actor,
    action: "update",
    propertyId: lead.id,
    details: `Assigned to ${assignee}`,
  });
  return lead;
}

export async function updateLeadDetails(
  id: string,
  changes: {
    assignedTo?: string;
    priority?: Lead["priority"];
    followUpDate?: string | null;
  },
  actor: string,
): Promise<Lead | null> {
  const lead = await getLeadById(id);
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
  await save(lead);
  await recordAuditEvent({
    actor,
    action: "update",
    propertyId: lead.id,
    details: `Lead ${parts.join(", ")}`,
  });
  return lead;
}

export async function addLeadNote(
  id: string,
  text: string,
  author: string,
): Promise<Lead | null> {
  const lead = await getLeadById(id);
  if (!lead) return null;
  lead.notes.push({ timestamp: new Date().toISOString(), author, text });
  lead.updatedAt = new Date().toISOString();
  await save(lead);
  return lead;
}

export async function recordLeadValuation(
  id: string,
  record: NonNullable<Lead["valuation"]>,
): Promise<Lead | null> {
  const lead = await getLeadById(id);
  if (!lead) return null;
  lead.valuation = record;
  lead.updatedAt = new Date().toISOString();
  await save(lead);
  await recordAuditEvent({
    actor: record.confirmedBy,
    action: "approve",
    propertyId: lead.id,
    details: `Valuation confirmed: £${record.figure.toLocaleString("en-GB")} (${record.basis.replace(/_/g, " ")})`,
  });
  return lead;
}

/** Test-only reset so each test starts from a clean slate. */
export async function __resetLeadsForTests(): Promise<void> {
  await __truncateAllForTests();
}
