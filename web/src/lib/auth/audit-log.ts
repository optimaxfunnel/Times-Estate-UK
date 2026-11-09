import { getDb } from "@/lib/db/client";

/**
 * Append-only audit log for important admin changes, stored in the
 * database (`audit_events`) since 2026-11-09, so it survives restarts.
 * Callers never edit or remove entries: this module only inserts and
 * reads. (Further hardening for the live database: a role without
 * UPDATE/DELETE rights on this table — see SECURITY.md.)
 */

export interface AuditEvent {
  id: string;
  timestamp: string;
  /** Role today (no real users exist yet); a real user id once real auth exists. */
  actor: string;
  action:
    | "create"
    | "update"
    | "status_change"
    | "approve"
    | "archive"
    | "sign_in"
    | "sign_out"
    | "denied";
  /** The record affected (property or lead id), or "-" for session events. */
  propertyId: string;
  details: string;
}

export async function recordAuditEvent(
  event: Omit<AuditEvent, "id" | "timestamp">,
): Promise<void> {
  const db = await getDb();
  await db.query(
    "insert into audit_events (actor, action, record_id, details) values ($1, $2, $3, $4)",
    [event.actor, event.action, event.propertyId, event.details],
  );
}

type Row = { seq: string | number; at: string | Date; actor: string; action: AuditEvent["action"]; record_id: string; details: string };

/** Newest first. */
export async function getAuditLog(limit = 500): Promise<AuditEvent[]> {
  const db = await getDb();
  const rows = await db.query<Row>(
    "select seq, at, actor, action, record_id, details from audit_events order by seq desc limit $1",
    [limit],
  );
  return rows.map((r) => ({
    id: `audit-${r.seq}`,
    timestamp: new Date(r.at).toISOString(),
    actor: r.actor,
    action: r.action,
    propertyId: r.record_id,
    details: r.details,
  }));
}
