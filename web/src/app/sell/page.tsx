import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = { title: "Sell Your Home" };

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="Sell"
        title="Book a free sales valuation"
        intro="Tell us about your property and we'll arrange a valuation visit — no obligation."
      />

      <Section className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-ink">How it works</h2>
          <ol className="mt-4 space-y-3 text-sm text-ink/80">
            <li>1. Submit the form with your property details.</li>
            <li>2. A member of our sales team contacts you to arrange a visit.</li>
            <li>3. We provide a valuation and discuss next steps — no fee is agreed online.</li>
          </ol>
          <PlaceholderNotice status="missing" className="mt-6">
            Our fee structure has not yet been supplied, so it is not
            published here. Ask us for a fee quote when we contact you.
          </PlaceholderNotice>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-ink">Request a valuation</h2>
          <div className="mt-4">
            <EnquiryForm formType="sales-valuation" submitLabel="Book a Valuation" />
          </div>
        </div>
      </Section>
    </>
  );
}
