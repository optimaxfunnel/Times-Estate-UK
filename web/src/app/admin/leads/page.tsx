import Link from "next/link";
import type { Metadata } from "next";
import { listLeads } from "@/lib/leads/provider";
import { LEAD_CATEGORY_LABELS, LEAD_STAGE_LABELS, LEAD_PRIORITY_LABELS } from "@/lib/leads/types";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = { title: "Admin — Leads" };

export default async function AdminLeadsPage() {
  const role = await getCurrentRole();
  if (!hasPermission(role, "view_enquiries")) {
    return <Alert tone="danger">Your current role cannot view leads.</Alert>;
  }

  const leads = listLeads();
  const canManage = hasPermission(role, "manage_leads");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Leads ({leads.length})</h1>
      <p className="mt-1 text-sm text-ink/70">
        Every enquiry submitted through the website this session, across
        every category and stage.
      </p>
      <div className="mt-6 overflow-x-auto rounded-sm border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/5">
            <tr>
              <th scope="col" className="px-4 py-2">Created</th>
              <th scope="col" className="px-4 py-2">Category</th>
              <th scope="col" className="px-4 py-2">Contact</th>
              <th scope="col" className="px-4 py-2">Priority</th>
              <th scope="col" className="px-4 py-2">Stage</th>
              <th scope="col" className="px-4 py-2">Notification</th>
              <th scope="col" className="px-4 py-2"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2">{new Date(lead.createdAt).toLocaleString("en-GB")}</td>
                <td className="px-4 py-2">{LEAD_CATEGORY_LABELS[lead.category]}</td>
                <td className="px-4 py-2">{lead.contactName}</td>
                <td className="px-4 py-2">{LEAD_PRIORITY_LABELS[lead.priority]}</td>
                <td className="px-4 py-2">{LEAD_STAGE_LABELS[lead.stage]}</td>
                <td className="px-4 py-2">
                  {lead.notificationStatus === "failed" ? (
                    <span className="text-danger">Failed</span>
                  ) : lead.notificationStatus === "sent" ? (
                    <span className="text-success">Sent</span>
                  ) : (
                    <span className="text-ink/70">Not sent (no provider)</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {canManage ? (
                    <Link href={`/admin/leads/${lead.id}`} className="text-accent underline">
                      Manage
                    </Link>
                  ) : (
                    <span className="text-ink/70">View only</span>
                  )}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-ink/70">
                  No leads yet this session.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
