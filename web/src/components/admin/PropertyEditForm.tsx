"use client";

import { useActionState } from "react";
import {
  updatePropertyAction,
  type EditPropertyState,
} from "@/lib/property/admin-actions";
import { TextAreaField } from "@/components/forms/Field";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  PROPERTY_STATUSES,
  STATUS_LABELS,
  type Property,
} from "@/lib/property/types";

const initialState: EditPropertyState = { status: "idle" };

export function PropertyEditForm({
  property,
  canApprove,
}: {
  property: Property;
  canApprove: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    updatePropertyAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={property.id} />

      <TextAreaField
        label="Summary"
        name="summary"
        defaultValue={property.summary}
        rows={2}
      />
      <TextAreaField
        label="Description"
        name="description"
        defaultValue={property.description}
        rows={6}
      />

      <div className="space-y-1">
        <label htmlFor="status" className="block text-sm font-medium text-ink">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={property.status}
          className="w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm sm:w-72"
        >
          {PROPERTY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        {!canApprove && (
          <p className="text-xs text-ink/70">
            Your role can submit this property for approval, but only a Manager
            or Administrator can approve it to a publicly visible status.
          </p>
        )}
      </div>

      {state.status === "success" && (
        <Alert tone="success">{state.message}</Alert>
      )}
      {state.status === "error" && <Alert tone="danger">{state.message}</Alert>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
