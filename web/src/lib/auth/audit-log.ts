/**
 * Append-only audit log for important admin changes. In-memory only
 * today — a real deployment needs this written to a persistent,
 * tamper-resistant store (a database table with no update/delete
 * permission for normal roles), not server memory that resets on
 * restart. Callers never edit or remove entries; `getAuditLog` returns
 * a copy.
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

const auditLog: AuditEvent[] = [];

export function recordAuditEvent(event: Omit<AuditEvent, "id" | "timestamp">) {
  auditLog.push({
    ...event,
    id: `audit-${auditLog.length + 1}`,
    timestamp: new Date().toISOString(),
  });
}

export function getAuditLog(): readonly AuditEvent[] {
  return [...auditLog].reverse();
}
