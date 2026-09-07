import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Property Management",
  description:
    "Full residential and commercial property management from Times Estate Ltd — including a straightforward way for tenants to report repairs.",
  alternates: { canonical: "/property-management" },
};

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
            <LeadForm
              category="management_enquiry"
              sourcePage="/property-management"
              submitLabel="Request Appraisal"
              fields={[
                { type: "text", name: "propertyAddress", label: "Property address", required: true },
                {
                  type: "select",
                  name: "currentArrangement",
                  label: "Current arrangement",
                  required: true,
                  options: [
                    { value: "self_managed", label: "Currently self-managed" },
                    { value: "another_agent", label: "Currently with another agent" },
                    { value: "none", label: "Not currently let" },
                  ],
                },
                { type: "textarea", name: "message", label: "Anything else we should know? (optional)" },
              ]}
            />
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
              Emergency guidance is shown on that page before the form.
            </p>
            <ButtonLink href="/report-a-repair" variant="secondary" className="mt-4">
              Report a Repair
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
