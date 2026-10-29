"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLeadForm } from "@/lib/leads/actions";
import {
  TextField,
  TextAreaField,
  CheckboxField,
  SelectField,
} from "@/components/forms/Field";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { LeadFormState } from "@/lib/leads/lead-schema";
import type { LeadCategory } from "@/lib/leads/types";

export type LeadFieldConfig =
  | {
      type: "text" | "email" | "tel" | "date" | "time";
      name: string;
      label: string;
      required?: boolean;
      defaultValue?: string;
    }
  | {
      type: "textarea";
      name: string;
      label: string;
      required?: boolean;
      defaultValue?: string;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: { value: string; label: string }[];
      required?: boolean;
    };

const initialState: LeadFormState = { status: "idle" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Every enquiry form on the site. Layers, in order:
 *  1. In the browser: a quick check of required fields, email and phone
 *     before sending, with an error summary that receives focus and
 *     links to each problem (helpful, never a substitute for 2).
 *  2. On the server (lib/leads/actions.ts): honeypot, rate limit,
 *     sanitisation, validation, consent — the real gate.
 *  3. On success: the visitor is taken to a confirmation page showing
 *     their reference and what happens next.
 */
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
  const requiredExtraFields = fields
    .filter((f) => f.required)
    .map((f) => f.name);
  const [state, formAction, isPending] = useActionState(
    submitLeadForm.bind(null, category, sourcePage, requiredExtraFields),
    initialState,
  );
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const errors = { ...state.fieldErrors, ...clientErrors };
  const labels: Record<string, string> = {
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number",
    privacyConsent: "Privacy confirmation",
    ...Object.fromEntries(fields.map((f) => [f.name, f.label])),
  };

  useEffect(() => {
    if (state.status === "success") {
      const q = new URLSearchParams({ type: category });
      if (state.reference) q.set("ref", state.reference);
      router.push(`/enquiry-received?${q.toString()}`);
    }
    if (state.status === "error") summaryRef.current?.focus();
  }, [state, category, router]);

  function checkBeforeSend(e: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    const found: Record<string, string> = {};
    const val = (k: string) => String(data.get(k) ?? "").trim();
    if (val("fullName").length < 2)
      found.fullName = "Please enter your full name.";
    if (!EMAIL_RE.test(val("email")))
      found.email =
        "Please enter a valid email address, like name@example.com.";
    if (val("phone").replace(/\D/g, "").length < 7)
      found.phone = "Please enter a phone number we can reach you on.";
    for (const name of requiredExtraFields) {
      if (!val(name)) found[name] = "This field is required.";
    }
    if (data.get("privacyConsent") !== "on")
      found.privacyConsent =
        "Please confirm you have read the Privacy Policy to continue.";
    setClientErrors(found);
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (state.status === "success") {
    return (
      <Alert tone="success" title="Received">
        {state.message} Taking you to your confirmation…
      </Alert>
    );
  }

  const errorKeys = Object.keys(errors).filter((k) => errors[k]);

  return (
    <form
      action={formAction}
      onSubmit={checkBeforeSend}
      className="space-y-4"
      noValidate
    >
      <HoneypotField />
      {propertyReference && (
        <input
          type="hidden"
          name="propertyReference"
          value={propertyReference}
        />
      )}

      {errorKeys.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-sm border border-danger/40 bg-danger/5 p-4 text-sm"
        >
          <p className="font-semibold text-danger">
            Please check{" "}
            {errorKeys.length === 1
              ? "this field"
              : `these ${errorKeys.length} fields`}
            :
          </p>
          <ul className="mt-1 list-disc pl-5">
            {errorKeys.map((k) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  className="text-ink underline underline-offset-2"
                >
                  {labels[k] ?? k}
                </a>{" "}
                — {errors[k]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <TextField
        label="Full name"
        name="fullName"
        autoComplete="name"
        required
        error={errors.fullName}
      />
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        error={errors.email}
      />
      <TextField
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        required
        error={errors.phone}
      />

      {fields.map((field) => {
        if (field.type === "textarea") {
          return (
            <TextAreaField
              key={field.name}
              label={field.label}
              name={field.name}
              required={field.required}
              defaultValue={field.defaultValue}
              error={errors[field.name]}
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
              error={errors[field.name]}
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
            error={errors[field.name]}
          />
        );
      })}

      <p className="text-xs text-ink/80">
        We use these details only to respond to this request and keep a record
        of it. We don&rsquo;t add you to marketing lists. See our{" "}
        <a href="/privacy-policy" className="underline">
          Privacy Policy
        </a>{" "}
        for how long we keep records and your rights.
      </p>
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
        error={errors.privacyConsent}
      />

      {state.status === "rate_limited" && (
        <Alert tone="warning">{state.message}</Alert>
      )}
      {state.status === "error" &&
        Object.keys(state.fieldErrors ?? {}).length === 0 && (
          <Alert tone="danger">
            Something went wrong. Please try again, or call us on 0208 672 8080.
          </Alert>
        )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
