"use client";

import { useActionState } from "react";
import { submitLeadForm } from "@/lib/leads/actions";
import { TextField, TextAreaField, CheckboxField, SelectField } from "@/components/forms/Field";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { LeadFormState } from "@/lib/leads/lead-schema";
import type { LeadCategory } from "@/lib/leads/types";

export type LeadFieldConfig =
  | { type: "text" | "email" | "tel" | "date" | "time"; name: string; label: string; required?: boolean; defaultValue?: string }
  | { type: "textarea"; name: string; label: string; required?: boolean; defaultValue?: string }
  | { type: "select"; name: string; label: string; options: { value: string; label: string }[]; required?: boolean };

const initialState: LeadFormState = { status: "idle" };

export function LeadForm({
  category,
  sourcePage,
  fields,
  submitLabel = "Send",
  propertyReference,
}: {
  category: LeadCategory;
  sourcePage: string;
  fields: LeadFieldConfig[];
  submitLabel?: string;
  propertyReference?: string;
}) {
  const requiredExtraFields = fields.filter((f) => f.required).map((f) => f.name);
  const [state, formAction, isPending] = useActionState(
    submitLeadForm.bind(null, category, sourcePage, requiredExtraFields),
    initialState,
  );

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Received">
        {state.message}
        {state.reference && (
          <p className="mt-2 text-xs text-ink/60">Reference: {state.reference}</p>
        )}
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <HoneypotField />
      {propertyReference && <input type="hidden" name="propertyReference" value={propertyReference} />}

      <TextField label="Full name" name="fullName" required error={state.fieldErrors?.fullName} />
      <TextField label="Email address" name="email" type="email" required error={state.fieldErrors?.email} />
      <TextField label="Phone number" name="phone" type="tel" required error={state.fieldErrors?.phone} />

      {fields.map((field) => {
        if (field.type === "textarea") {
          return (
            <TextAreaField
              key={field.name}
              label={field.label}
              name={field.name}
              required={field.required}
              defaultValue={field.defaultValue}
              error={state.fieldErrors?.[field.name]}
            />
          );
        }
        if (field.type === "select") {
          return (
            <SelectField
              key={field.name}
              label={field.label}
              name={field.name}
              required={field.required}
              options={field.options}
              error={state.fieldErrors?.[field.name]}
            />
          );
        }
        return (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            required={field.required}
            defaultValue={field.defaultValue}
            error={state.fieldErrors?.[field.name]}
          />
        );
      })}

      <CheckboxField
        label={
          <>
            I have read and accept the{" "}
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>
            .
          </>
        }
        name="privacyConsent"
        error={state.fieldErrors?.privacyConsent}
      />

      {state.status === "rate_limited" && <Alert tone="warning">{state.message}</Alert>}
      {state.status === "error" && Object.keys(state.fieldErrors ?? {}).length === 0 && (
        <Alert tone="danger">Something went wrong. Please try again, or contact us directly.</Alert>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
