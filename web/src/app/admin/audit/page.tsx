import type { Metadata } from "next";
import { getAuditLog } from "@/lib/auth/audit-log";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission, ROLE_LABELS } from "@/lib/auth/roles";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = { title: "Admin — Audit Log" };

export default async function AdminAuditPage() {
  const role = await getCurrentRole();
  if (!hasPermission(role, "view_audit_log")) {
    return (
      <Alert tone="danger">
        Your current role cannot view the audit log — only Managers and
        Administrators can.
      </Alert>
    );
  }

  const events = await getAuditLog();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Audit log</h1>
      <p className="mt-1 text-sm text-ink/70">
        In-memory only today — resets when the server restarts. A real
        deployment needs this in a persistent, append-only store.
      </p>
      {events.length === 0 ? (
        <p className="mt-6 text-sm text-ink/70">
          No changes recorded yet this session.
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="rounded-sm border border-border bg-surface p-3 text-sm"
            >
              <span className="font-medium text-ink">
                {event.action.replace("_", " ")}
              </span>{" "}
              on <span className="font-mono">{event.propertyId}</span> by{" "}
              {ROLE_LABELS[event.actor as keyof typeof ROLE_LABELS] ??
                event.actor}{" "}
              — <span className="text-ink/70">{event.details}</span>
              <div className="text-xs text-ink/70">
                {new Date(event.timestamp).toLocaleString("en-GB")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
