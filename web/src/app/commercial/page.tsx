import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { ValuationTermsNotice } from "@/components/ui/ValuationTermsNotice";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = { title: "Commercial Sales, Lettings & Management" };

const offerings = [
  {
    title: "Commercial sales",
    description: "Selling commercial premises for landlords and investors.",
  },
  {
    title: "Commercial lettings",
    description: "Letting commercial premises to suitable occupiers.",
  },
  {
    title: "Commercial management",
    description: "Ongoing management of commercial property on your behalf.",
  },
] as const;

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Commercial sales, lettings and management"
        intro="A dedicated commercial service for landlords, occupiers and investors — separate from our residential team."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {offerings.map((offering) => (
            <div key={offering.title} className="rounded-sm border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold text-ink">{offering.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{offering.description}</p>
            </div>
          ))}
        </div>
        <PlaceholderNotice status="missing" className="mt-6">
          Specific sectors covered (e.g. retail, office, industrial) have not
          yet been confirmed by the owner, so they are not listed here — see
          /SITEMAP.md.
        </PlaceholderNotice>
      </Section>

      <Section className="bg-secondary/5">
        <div className="mb-6 max-w-2xl">
          <ValuationTermsNotice />
        </div>
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">Sales appraisal</h2>
            <p className="mt-1 text-sm text-ink/70">For landlords or investors looking to sell.</p>
            <div className="mt-4">
              <LeadForm
                category="commercial_sales_valuation"
                sourcePage="/commercial"
                submitLabel="Request Appraisal"
                fields={[{ type: "text", name: "propertyAddress", label: "Property address", required: true }]}
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Lettings appraisal</h2>
            <p className="mt-1 text-sm text-ink/70">For landlords looking to let premises.</p>
            <div className="mt-4">
              <LeadForm
                category="commercial_rental_valuation"
                sourcePage="/commercial"
                submitLabel="Request Appraisal"
                fields={[{ type: "text", name: "propertyAddress", label: "Property address", required: true }]}
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Occupier / management enquiry</h2>
            <p className="mt-1 text-sm text-ink/70">Looking for premises, or want management for your property?</p>
            <div className="mt-4">
              <LeadForm
                category="commercial_enquiry"
                sourcePage="/commercial"
                submitLabel="Send Enquiry"
                fields={[{ type: "textarea", name: "requirement", label: "Your requirement", required: true }]}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
