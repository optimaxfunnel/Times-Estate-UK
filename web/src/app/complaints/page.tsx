import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { DraftLegalNotice } from "@/components/layout/DraftLegalNotice";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Complaints Handling Procedure",
  description:
    "How to raise a complaint with Times Estate Ltd, and what happens next.",
  alternates: { canonical: "/complaints" },
};

export default function ComplaintsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Complaints Handling Procedure" />
      <Section className="max-w-3xl space-y-8">
        <DraftLegalNotice />

        <p className="text-ink/80">
          As a member of a redress scheme, {siteConfig.legalName.value} operates
          a complaints procedure so that any concern about our service can be
          raised and resolved fairly.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Step 1 — Tell us directly
          </h2>
          <p className="mt-2 text-ink/80">
            Please tell us what has gone wrong using our{" "}
            <a href="/contact" className="text-accent underline">
              Contact form
            </a>
            , setting out the details of your complaint. A dedicated complaints
            email address and a specific response-time commitment have not yet
            been confirmed by the business owner (see below) — until they are,
            please use the Contact form as the first step.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Step 2 — Our response
          </h2>
          <PlaceholderNotice status="missing" className="mt-2">
            The specific timescale we commit to for acknowledging and resolving
            a complaint has not yet been confirmed by the business owner. A
            genuine, deliverable commitment (not an invented one) will be added
            here once agreed — see CLAUDE.md Rule 1 and{" "}
            <code className="text-xs">/CONTENT_VERIFICATION_REGISTER.md</code>.
          </PlaceholderNotice>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Step 3 — If you&rsquo;re still not satisfied
          </h2>
          <p className="mt-2 text-ink/80">
            If, after receiving our final response, you remain unsatisfied, you
            may refer your complaint to our redress scheme:
          </p>
          <p className="mt-2 text-ink/80">
            <strong>{siteConfig.redressScheme.value}</strong>{" "}
            <Badge status={siteConfig.redressScheme.status} />
          </p>
          <p className="mt-2 text-xs text-ink/70">
            This membership has been reviewed against the certificate supplied
            by the business owner but not yet independently confirmed against
            the scheme&rsquo;s own register — see{" "}
            <code className="text-xs">/CONTENT_VERIFICATION_REGISTER.md</code>,
            item 3.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Complaints about client money
          </h2>
          <p className="mt-2 text-ink/80">
            Where a complaint concerns client money we hold, our Client Money
            Protection scheme membership is:
          </p>
          <p className="mt-2 text-ink/80">
            <strong>{siteConfig.clientMoneyProtection.value}</strong>{" "}
            <Badge status={siteConfig.clientMoneyProtection.status} />
          </p>
        </div>

        <p className="text-xs text-ink/70">Last drafted: 7 September 2026.</p>
      </Section>
    </>
  );
}
