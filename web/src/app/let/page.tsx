import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { ValuationTermsNotice } from "@/components/ui/ValuationTermsNotice";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Let Your Property",
  description:
    "Request a free rental appraisal from Times Estate Ltd, covering let-only and full management for London landlords.",
  alternates: { canonical: "/let" },
};

export default function LetPage() {
  return (
    <>
      <PageHero
        eyebrow="Let"
        title="Request a rental appraisal"
        intro="Whether you want let-only or full management, we'll talk you through the options after your appraisal."
      />

      <Section className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-ink">
              Let-only vs. full management
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              Let-only means we find and reference a tenant, then hand
              management to you. Full management means we handle the
              tenancy on an ongoing basis, including{" "}
              <a href="/property-management" className="underline">
                repair reporting
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">How we protect you</h2>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink/70">
              {siteConfig.clientMoneyProtection.value}
              <Badge status={siteConfig.clientMoneyProtection.status} />
            </p>
          </div>
          <ValuationTermsNotice />
          <PlaceholderNotice status="missing">
            Fee information for letting and management has not yet been
            supplied, so it is not published here.
          </PlaceholderNotice>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-ink">Request a rental appraisal</h2>
          <div className="mt-4">
            <LeadForm
              category="rental_valuation"
              sourcePage="/let"
              submitLabel="Request Appraisal"
              fields={[
                { type: "text", name: "propertyAddress", label: "Property address", required: true },
                {
                  type: "select",
                  name: "currentlyTenanted",
                  label: "Is the property currently tenanted?",
                  required: true,
                  options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ],
                },
                {
                  type: "select",
                  name: "managementPreference",
                  label: "Let-only or full management? (optional)",
                  options: [
                    { value: "let_only", label: "Let-only" },
                    { value: "full_management", label: "Full management" },
                    { value: "not_sure", label: "Not sure yet" },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
