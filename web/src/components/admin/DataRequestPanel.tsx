"use client";

import { useActionState, useId } from "react";
import {
  dataRequestAction,
  type DataRequestState,
} from "@/lib/leads/data-request-actions";
import { LEAD_STAGE_LABELS, type LeadStage } from "@/lib/leads/types";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

const initialState: DataRequestState = { status: "idle" };
const input =
  "w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm";

function download(json: string, reference: string) {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `data-request-${reference.replace(/[^A-Za-z0-9-]+/g, "-")}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function DataRequestPanel() {
  const [state, formAction, isPending] = useActionState(
    dataRequestAction,
    initialState,
  );
  const id = useId();

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4 rounded-sm border border-border bg-surface p-5">
        <input type="hidden" name="intent" value="find" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor={`${id}-email`} className="block text-sm font-medium text-ink">
              Person&rsquo;s email address
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="off"
              defaultValue={state.email ?? ""}
              className={input}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor={`${id}-ref`} className="block text-sm font-medium text-ink">
              Request reference
            </label>
            <input
              id={`${id}-ref`}
              name="reference"
              required
              placeholder="e.g. DR-2026-001"
              aria-describedby={`${id}-ref-hint`}
              defaultValue={state.reference ?? ""}
              className={input}
            />
            <p id={`${id}-ref-hint`} className="text-xs text-ink/60">
              Your own reference for this request. It goes in the audit log, so
              never use the person&rsquo;s name.
            </p>
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Searching…" : "Find their enquiries"}
        </Button>
      </form>

      {state.message && (
        <Alert tone={state.status === "error" ? "danger" : "info"}>{state.message}</Alert>
      )}

      {state.status === "success" && state.leads && (
        <section aria-labelledby={`${id}-results`} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id={`${id}-results`} className="text-lg font-semibold text-ink">
              Enquiries from this email ({state.leads.length})
            </h2>
            {state.exportJson && state.leads.length > 0 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => download(state.exportJson!, state.reference!)}
              >
                Download a copy (JSON)
              </Button>
            )}
          </div>
          {state.leads.length > 0 && (
            <ul className="divide-y divide-border rounded-sm border border-border bg-surface">
              {state.leads.map((lead) => (
                <li key={lead.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="text-sm">
                    <p className="font-medium text-ink">
                      {lead.category} — {new Date(lead.createdAt).toLocaleString("en-GB")}
                    </p>
                    <p className="text-ink/60">
                      {lead.id} · {LEAD_STAGE_LABELS[lead.stage as LeadStage] ?? lead.stage}
                    </p>
                  </div>
                  <form action={formAction} className="flex flex-wrap items-center gap-3">
                    <input type="hidden" name="intent" value="erase" />
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="email" value={state.email} />
                    <input type="hidden" name="reference" value={state.reference} />
                    <label className="flex items-center gap-2 text-sm text-ink">
                      <input type="checkbox" name="confirm" required className="h-5 w-5" />
                      Erase permanently
                    </label>
                    <Button type="submit" variant="secondary" disabled={isPending}>
                      Erase
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
