import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
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
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-ink">
            Request a commercial appraisal
          </h2>
          <p className="mt-2 text-sm text-ink/70">
            Tell us about your property or requirement and a member of the
            commercial team will be in touch.
          </p>
          <div className="mt-6">
            <EnquiryForm formType="commercial-appraisal" submitLabel="Request Appraisal" />
          </div>
        </div>
      </Section>
    </>
  );
}
