import type { Metadata } from "next";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { Alert } from "@/components/ui/Alert";
import { DataRequestPanel } from "@/components/admin/DataRequestPanel";

export const metadata: Metadata = { title: "Admin — Data requests" };

/**
 * Subject-access and erasure requests (UK GDPR). Administrator and
 * Manager only. Procedure: OPERATIONS_MANUAL.md, "Data requests".
 */
export default async function DataRequestsPage() {
  const role = await getCurrentRole();
  if (!hasPermission(role, "handle_data_requests")) {
    return <Alert tone="danger">Your current role cannot handle data requests.</Alert>;
  }
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Data requests</h1>
        <p className="mt-2 text-sm text-ink/80">
          When someone asks for a copy of the information we hold about them,
          or asks us to delete it, find their enquiries here by the email
          address they used. Check who they are before you reply. You normally
          have one month to respond.
        </p>
      </div>
      <Alert tone="warning" title="Before you erase anything">
        Erasing cannot be undone. Keep a record if the law requires it, for
        example anti-money-laundering checks on a sale, or an open dispute.
        If you&rsquo;re not sure, ask before erasing. Every search and erasure
        is written to the audit log with your request reference.
      </Alert>
      <DataRequestPanel />
    </div>
  );
}
