"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitPropertyAlert } from "@/lib/actions";
import { TextField, CheckboxField } from "@/components/forms/Field";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { AlertFormState } from "@/lib/alert-schema";

const initialState: AlertFormState = { status: "idle" };

export function AlertForm({
  defaults,
}: {
  defaults: {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    listingType?: string;
    category?: string;
  };
}) {
  const [state, formAction, isPending] = useActionState(
    submitPropertyAlert,
    initialState,
  );

  const router = useRouter();
  useEffect(() => {
    if (state.status === "success") {
      const q = new URLSearchParams({ type: "property_alert" });
      router.push(`/enquiry-received?${q.toString()}`);
    }
  }, [state, router]);

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Alert created">
        {state.message}
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <HoneypotField />
      <input
        type="hidden"
        name="listingType"
        value={defaults.listingType ?? ""}
      />
      <input type="hidden" name="category" value={defaults.category ?? ""} />
      <TextField
        label="Email address"
        name="email"
        type="email"
        required
        error={state.fieldErrors?.email}
      />
      <TextField
        label="Location"
        name="location"
        defaultValue={defaults.location}
        error={state.fieldErrors?.location}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Min price"
          name="minPrice"
          type="number"
          defaultValue={defaults.minPrice}
          error={state.fieldErrors?.minPrice}
        />
        <TextField
          label="Max price"
          name="maxPrice"
          type="number"
          defaultValue={defaults.maxPrice}
          error={state.fieldErrors?.maxPrice}
        />
      </div>
      <CheckboxField
        label="I'd like to receive email alerts matching this search."
        name="marketingConsent"
        error={state.fieldErrors?.marketingConsent}
      />
      {state.status === "error" && !state.fieldErrors && (
        <Alert tone="danger">Something went wrong. Please try again.</Alert>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Create Alert"}
      </Button>
    </form>
  );
}
