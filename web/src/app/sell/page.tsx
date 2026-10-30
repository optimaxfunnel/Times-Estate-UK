import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { ValuationTermsNotice } from "@/components/ui/ValuationTermsNotice";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Book a free initial market appraisal with Times Estate Ltd and find out what your London home could be worth.",
  alternates: { canonical: "/sell" },
};

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="Sell"
        title="Book a free initial market appraisal"
        intro="Tell us about your property and we'll arrange a visit — no obligation."
      />

      <Section containerClassName="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-ink">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm text-ink/80">
              <li>1. Submit the form with your property details.</li>
              <li>
                2. A member of our sales team contacts you to arrange a visit.
              </li>
              <li>
                3. We provide our opinion of value and discuss next steps — no
                fee is agreed online, and no figure is generated automatically.
              </li>
            </ol>
          </div>
          <ValuationTermsNotice />
          <PlaceholderNotice
            status="missing"
            publicText="Ask us for a written fee quote when we contact you."
          >
            Our fee structure has not yet been supplied, so it is not published
            here. Ask us for a fee quote when we contact you.
          </PlaceholderNotice>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-ink">
            Request an appraisal
          </h2>
          <div className="mt-4">
            <LeadForm
              category="sales_valuation"
              sourcePage="/sell"
              submitLabel="Book a Valuation"
              fields={[
                {
                  type: "text",
                  name: "propertyAddress",
                  label: "Property address",
                  required: true,
                },
                {
                  type: "select",
                  name: "reasonForSelling",
                  label: "Reason for selling (optional)",
                  options: [
                    { value: "moving_up", label: "Moving to a larger home" },
                    { value: "downsizing", label: "Downsizing" },
                    { value: "relocating", label: "Relocating" },
                    {
                      value: "investment",
                      label: "Selling an investment property",
                    },
                    { value: "other", label: "Other" },
                  ],
                },
                {
                  type: "textarea",
                  name: "message",
                  label: "Anything else we should know? (optional)",
                },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
