"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitRepairReport } from "@/lib/leads/repair-actions";
import {
  TextField,
  TextAreaField,
  CheckboxField,
  SelectField,
} from "@/components/forms/Field";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  REPAIR_ISSUE_CATEGORIES,
  REPAIR_URGENCY_OPTIONS,
} from "@/lib/repair-terms";
import type { LeadFormState } from "@/lib/leads/lead-schema";

const initialState: LeadFormState = { status: "idle" };

export function RepairReportForm() {
  const [state, formAction, isPending] = useActionState(
    submitRepairReport,
    initialState,
  );

  const router = useRouter();
  useEffect(() => {
    if (state.status === "success") {
      const q = new URLSearchParams({ type: "repair_report" });
      if ("reference" in state && state.reference)
        q.set("ref", state.reference);
      router.push(`/enquiry-received?${q.toString()}`);
    }
  }, [state, router]);

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Repair report received">
        {state.message}
        {state.reference && (
          <p className="mt-2 text-xs text-ink/70">
            Reference: {state.reference}
          </p>
        )}
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <HoneypotField />
      <TextField
        label="Full name"
        name="fullName"
        required
        error={state.fieldErrors?.fullName}
      />
      <TextField
        label="Email address"
        name="email"
        type="email"
        required
        error={state.fieldErrors?.email}
      />
      <TextField
        label="Phone number"
        name="phone"
        type="tel"
        required
        error={state.fieldErrors?.phone}
      />
      <TextField
        label="Property address"
        name="propertyAddress"
        autoComplete="street-address"
        required
        error={state.fieldErrors?.propertyAddress}
      />
      <TextField
        label="Tenancy or property reference, if you have one"
        name="tenancyReference"
        error={state.fieldErrors?.tenancyReference}
      />
      <SelectField
        label="Issue category"
        name="issueCategory"
        required
        options={[...REPAIR_ISSUE_CATEGORIES]}
        error={state.fieldErrors?.issueCategory}
      />
      <TextAreaField
        label="Describe the issue"
        name="description"
        required
        error={state.fieldErrors?.description}
      />
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-ink">
          How urgent is this?
        </legend>
        {REPAIR_URGENCY_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-start gap-2 text-sm text-ink"
          >
            <input
              type="radio"
              name="urgency"
              value={opt.value}
              required
              className="mt-1"
            />
            {opt.label}
          </label>
        ))}
        {state.fieldErrors?.urgency && (
          <p className="text-sm text-danger">{state.fieldErrors.urgency}</p>
        )}
      </fieldset>
      <TextAreaField
        label="Access information (optional) — e.g. key safe, best time to attend"
        name="accessInformation"
        error={state.fieldErrors?.accessInformation}
      />
      <FileUploadField
        name="photos"
        label="Photographs or documents (optional)"
      />
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
      <CheckboxField
        label="I agree that Times Estate Ltd may share the details above (including photos) with a contractor in order to resolve this repair."
        name="contractorShareConsent"
        error={state.fieldErrors?.contractorShareConsent}
      />
      {state.status === "rate_limited" && (
        <Alert tone="warning">{state.message}</Alert>
      )}
      {state.status === "error" &&
        Object.keys(state.fieldErrors ?? {}).length === 0 && (
          <Alert tone="danger">
            Something went wrong. Please try again, or use the emergency numbers
            above if urgent.
          </Alert>
        )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Submit Repair Report"}
      </Button>
    </form>
  );
}
