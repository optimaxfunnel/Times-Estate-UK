import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLeadById } from "@/lib/leads/provider";
import {
  LEAD_CATEGORY_LABELS,
  LEAD_STAGE_LABELS,
  LEAD_PRIORITY_LABELS,
} from "@/lib/leads/types";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { Alert } from "@/components/ui/Alert";
import { LeadStageForm } from "@/components/admin/LeadStageForm";
import { ValuationRecordForm } from "@/components/admin/ValuationRecordForm";
import { VALUATION_CATEGORIES } from "@/lib/leads/controls";

export const metadata: Metadata = { title: "Admin — Lead" };

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = await getCurrentRole();

  if (!hasPermission(role, "view_enquiries")) {
    return <Alert tone="danger">Your current role cannot view leads.</Alert>;
  }

  const lead = await getLeadById(id);
  if (!lead) notFound();

  if (!hasPermission(role, "manage_leads")) {
    return (
      <div className="max-w-2xl space-y-4">
        <Alert tone="danger">
          Your current role can view this lead but not manage it — only a
          Manager or Administrator can change its stage or add notes.
        </Alert>
        <LeadSummary lead={lead} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <LeadSummary lead={lead} />
      <div className="rounded-sm border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-ink">Update this lead</h2>
        <div className="mt-4">
          <LeadStageForm lead={lead} />
        </div>
      </div>
      {VALUATION_CATEGORIES.includes(lead.category) && (
        <div className="rounded-sm border border-border bg-surface p-6">
          <ValuationRecordForm
            lead={lead}
            canRecord={hasPermission(role, "approve_property")}
          />
        </div>
      )}
      {lead.notes.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-ink">Notes</h2>
          <ul className="mt-2 space-y-2">
            {lead.notes.map((note, i) => (
              <li
                key={i}
                className="rounded-sm border border-border bg-surface p-3 text-sm"
              >
                <span className="font-medium text-ink">{note.author}</span>{" "}
                <span className="text-ink/70">
                  {new Date(note.timestamp).toLocaleString("en-GB")}
                </span>
                <p className="mt-1 text-ink/80">{note.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function LeadSummary({ lead }: { lead: import("@/lib/leads/types").Lead }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">
        {LEAD_CATEGORY_LABELS[lead.category]}
      </h1>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Info label="Reference" value={lead.id} />
        <Info
          label="Created"
          value={new Date(lead.createdAt).toLocaleString("en-GB")}
        />
        <Info label="Source page" value={lead.sourcePage} />
        <Info label="Priority" value={LEAD_PRIORITY_LABELS[lead.priority]} />
        <Info label="Stage" value={LEAD_STAGE_LABELS[lead.stage]} />
        <Info
          label="Consent"
          value={
            lead.consentGiven
              ? `Given ${new Date(lead.consentTimestamp).toLocaleString("en-GB")}${lead.marketingConsent ? " · marketing: yes" : ""}`
              : "Not given"
          }
        />
        <Info
          label="Assigned person"
          value={lead.assignedTo ?? "Not assigned"}
        />
        <Info label="Follow-up date" value={lead.followUpDate ?? "None set"} />
        <Info label="Contact name" value={lead.contactName} />
        <Info label="Email" value={lead.contactEmail} />
        <Info label="Phone" value={lead.contactPhone} />
        {lead.propertyReference && (
          <Info label="Property reference" value={lead.propertyReference} />
        )}
      </dl>
      {lead.detail && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-secondary">
            Message
          </p>
          <p className="mt-1 text-sm text-ink/80">{lead.detail}</p>
        </div>
      )}
      {lead.extra && Object.keys(lead.extra).length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-secondary">
            Additional details
          </p>
          <dl className="mt-1 grid grid-cols-2 gap-2 text-sm">
            {Object.entries(lead.extra).map(([key, value]) => (
              <Info key={key} label={key} value={value} />
            ))}
          </dl>
        </div>
      )}
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-secondary">
          Notification log
        </p>
        <ul className="mt-1 text-xs text-ink/70">
          {lead.notificationLog.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-secondary">
        {label}
      </dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
