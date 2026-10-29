import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LEAD_CONFIRMATION_COPY } from "@/lib/leads/lead-schema";
import {
  LEAD_CATEGORIES,
  LEAD_CATEGORY_LABELS,
  type LeadCategory,
} from "@/lib/leads/types";
import { siteConfig } from "@/lib/site-config";
import { EmergencyGuidance } from "@/components/ui/EmergencyGuidance";

export const metadata: Metadata = {
  title: "We've received your request",
  robots: { index: false, follow: false },
};

/**
 * Confirmation page after any enquiry form. The URL carries only the
 * form type and the record reference (an id, never personal details),
 * so nothing private sits in browser history or server logs.
 */
export default async function EnquiryReceivedPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; ref?: string }>;
}) {
  const { type, ref } = await searchParams;
  const category = (LEAD_CATEGORIES as readonly string[]).includes(type ?? "")
    ? (type as LeadCategory)
    : undefined;
  const isAlert = type === "property_alert";
  const reference = ref && /^[a-z0-9-]{1,40}$/i.test(ref) ? ref : undefined;

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {category
            ? LEAD_CATEGORY_LABELS[category]
            : isAlert
              ? "Property alert"
              : "Enquiry"}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink">
          Thank you — we&rsquo;ve received your request
        </h1>
        <p className="mt-4 text-ink/80">
          {(category && LEAD_CONFIRMATION_COPY[category]) ??
            (isAlert
              ? "Your alert is saved. Alert emails will start once an email service is approved — until then, please check back or save the search."
              : "A member of the Times Estate Ltd team will be in touch.")}
        </p>
        {reference && (
          <p className="mt-4 rounded-sm border border-border bg-surface p-4 text-sm">
            Your reference: <strong className="font-mono">{reference}</strong>
            <span className="block text-secondary">
              Quote it if you contact us about this request.
            </span>
          </p>
        )}
        {category === "repair_report" && (
          <div className="mt-6">
            <EmergencyGuidance />
          </div>
        )}
        <h2 className="mt-8 text-xl font-bold text-ink">What happens next</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
          <li>
            A person reads every request — nothing is decided automatically.
          </li>
          <li>
            We have not confirmed any appointment, price or outcome yet; we will
            contact you to do that.
          </li>
          <li>
            Need us sooner? Call{" "}
            <a
              href="tel:+442086728080"
              className="text-accent underline underline-offset-4"
            >
              {siteConfig.phoneLandline.value}
            </a>
            .
          </li>
        </ul>
        <p className="mt-6 text-xs text-secondary">
          Your details are used only to respond to this request — see our{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href="/buy" variant="secondary">
            Search properties
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
