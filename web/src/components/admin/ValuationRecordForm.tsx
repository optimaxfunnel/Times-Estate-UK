"use client";

import { useActionState } from "react";
import {
  recordValuationAction,
  type LeadAdminState,
} from "@/lib/leads/admin-actions";
import type { Lead } from "@/lib/leads/types";
import { VALUATION_TERMS } from "@/lib/valuation-terms";
import { RECORDABLE_VALUATION_BASES } from "@/lib/leads/controls";
import { TextField, SelectField } from "@/components/forms/Field";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

const initialState: LeadAdminState = { status: "idle" };

/**
 * Lets a Manager or Administrator record the figure from a valuation
 * that has actually taken place. Internal only. The server refuses it
 * for any other role, for an automated estimate, and for a formal or
 * regulated valuation without the valuer's reference.
 */
export function ValuationRecordForm({
  lead,
  canRecord,
}: {
  lead: Lead;
  canRecord: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    recordValuationAction,
    initialState,
  );

  return (
    <section aria-labelledby="valuation-heading" className="space-y-3">
      <h2 id="valuation-heading" className="text-lg font-semibold text-ink">
        Valuation record
      </h2>
      {lead.valuation ? (
        <p className="rounded-sm border border-border bg-surface p-3 text-sm">
          £{lead.valuation.figure.toLocaleString("en-GB")} —{" "}
          {VALUATION_TERMS[lead.valuation.basis].label}. Confirmed by{" "}
          {lead.valuation.confirmedBy} on{" "}
          {new Date(lead.valuation.confirmedAt).toLocaleString("en-GB")}
          {lead.valuation.valuerReference &&
            ` · Valuer: ${lead.valuation.valuerReference}`}
          .
        </p>
      ) : (
        <p className="text-sm text-secondary">No figure recorded yet.</p>
      )}
      {canRecord ? (
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="id" value={lead.id} />
          <SelectField
            label="What kind of valuation is this?"
            name="basis"
            required
            options={RECORDABLE_VALUATION_BASES.map((b) => ({
              value: b,
              label: VALUATION_TERMS[b].label,
            }))}
          />
          <TextField
            label="Figure (£)"
            name="figure"
            type="number"
            min={1}
            required
          />
          <TextField
            label="Valuer name and report reference (formal or regulated only)"
            name="valuerReference"
          />
          <p className="text-xs text-secondary">
            Automated estimates are never recorded here. The figure stays
            internal and is never shown on the website.
          </p>
          {state.status === "success" && (
            <Alert tone="success">{state.message}</Alert>
          )}
          {state.status === "error" && (
            <Alert tone="danger">{state.message}</Alert>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Confirm valuation"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-secondary">
          Only a Manager or Administrator can confirm a valuation figure.
        </p>
      )}
    </section>
  );
}
