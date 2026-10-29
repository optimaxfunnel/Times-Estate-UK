"use client";

import { useActionState } from "react";
import {
  updateLeadStageAction,
  type LeadAdminState,
} from "@/lib/leads/admin-actions";
import { LEAD_STAGES, LEAD_STAGE_LABELS, type Lead } from "@/lib/leads/types";
import { TextAreaField } from "@/components/forms/Field";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

const initialState: LeadAdminState = { status: "idle" };

export function LeadStageForm({ lead }: { lead: Lead }) {
  const [state, formAction, isPending] = useActionState(
    updateLeadStageAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={lead.id} />
      <div className="space-y-1">
        <label htmlFor="stage" className="block text-sm font-medium text-ink">
          Stage
        </label>
        <select
          id="stage"
          name="stage"
          defaultValue={lead.stage}
          className="w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm sm:w-72"
        >
          {LEAD_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {LEAD_STAGE_LABELS[stage]}
            </option>
          ))}
        </select>
      </div>
      {lead.category === "viewing_request" && (
        <div className="rounded-sm border border-warning/40 bg-warning/5 p-3 text-sm">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              name="accessConfirmed"
              className="mt-1 accent-accent"
            />
            <span>
              Access has been agreed with the occupier (and the landlord or
              owner where needed). Required before marking this viewing as
              booked — the website never confirms a viewing itself.
            </span>
          </label>
        </div>
      )}
      <TextAreaField label="Add a note" name="note" />
      {state.status === "success" && (
        <Alert tone="success">{state.message}</Alert>
      )}
      {state.status === "error" && <Alert tone="danger">{state.message}</Alert>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Update Lead"}
      </Button>
    </form>
  );
}
