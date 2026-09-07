/**
 * Append-only audit log for important admin changes (Task 2 requirement:
 * "important changes should be logged"). In-memory only today — a real
 * deployment needs this written to a persistent, tamper-resistant store
 * (e.g. a database table with no update/delete permission for normal
 * roles), not kept in server memory where it's lost on every restart.
 */

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string; // role name today (see /lib/auth/session.ts) — a real user id once real auth exists
  action: "create" | "update" | "status_change" | "approve" | "archive";
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
