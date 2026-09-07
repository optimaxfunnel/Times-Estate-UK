import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Let Your Property" };

export default function LetPage() {
  return (
    <>
      <PageHero
        eyebrow="Let"
        title="Request a rental valuation"
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
          <PlaceholderNotice status="missing">
            Fee information for letting and management has not yet been
            supplied, so it is not published here.
          </PlaceholderNotice>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-ink">Request a rental valuation</h2>
          <div className="mt-4">
            <EnquiryForm formType="rental-valuation" submitLabel="Request Valuation" />
          </div>
        </div>
      </Section>
    </>
  );
}
