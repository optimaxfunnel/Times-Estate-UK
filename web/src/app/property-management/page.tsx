import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: "Property Management" };

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Management"
        title="Full management for landlords"
        intro="From referencing to repairs, we manage the day-to-day so you don't have to."
      />

      <Section className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Landlords: request a management appraisal</h2>
          <p className="mt-2 text-sm text-ink/70">
            New to letting, switching agents, or adding full management to an
            existing let — tell us about your property.
          </p>
          <div className="mt-4">
            <EnquiryForm formType="management-appraisal" submitLabel="Request Appraisal" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-sm border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-ink">
              Existing tenants: report a repair
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              If something in your rented home needs fixing, tell us directly
              — you don&rsquo;t need to wait for office hours to log it.
            </p>
            <ButtonLink href="/property-management#report-a-repair" variant="secondary" className="mt-4">
              Report a Repair
            </ButtonLink>
          </div>

          <PlaceholderNotice status="missing">
            Our out-of-hours emergency repair process has not yet been
            supplied by the owner. This page cannot go live for genuine
            emergency reports until it is (see /USER_JOURNEYS.md, journey 8).
          </PlaceholderNotice>
        </div>
      </Section>

      <Section id="report-a-repair" className="bg-secondary/5">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-ink">Report a repair</h2>
          <p className="mt-2 text-sm text-ink/70">
            For routine and urgent (non-emergency) repairs. This form is not
            yet connected to a live notification system — see the note above.
          </p>
          <div className="mt-6">
            <EnquiryForm formType="repair-report" submitLabel="Submit Repair Report" />
          </div>
        </div>
      </Section>
    </>
  );
}
