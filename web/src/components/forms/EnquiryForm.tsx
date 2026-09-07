"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/lib/actions";
import { TextField, TextAreaField, CheckboxField } from "@/components/forms/Field";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { EnquiryFormState } from "@/lib/enquiry-schema";

const initialState: EnquiryFormState = { status: "idle" };

export function EnquiryForm({
  formType,
  submitLabel = "Send enquiry",
  showAddressField = true,
  defaultPropertyAddress,
}: {
  formType: string;
  submitLabel?: string;
  showAddressField?: boolean;
  defaultPropertyAddress?: string;
}) {
  const [state, formAction, isPending] = useActionState(
    submitEnquiry.bind(null, formType),
    initialState,
  );

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Enquiry received">
        {state.message}
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
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
      {showAddressField && (
        <TextField
          label="Property address"
          name="propertyAddress"
          defaultValue={defaultPropertyAddress}
          error={state.fieldErrors?.propertyAddress}
        />
      )}
      <TextAreaField
        label="Message (optional)"
        name="message"
        error={state.fieldErrors?.message}
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
      {state.status === "error" && !state.fieldErrors && (
        <Alert tone="danger">
          Something went wrong sending your enquiry. Please try again, or
          contact us directly.
        </Alert>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
