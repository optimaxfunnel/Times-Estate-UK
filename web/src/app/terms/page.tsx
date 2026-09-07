import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { DraftLegalNotice } from "@/components/layout/DraftLegalNotice";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Website Use",
  description: "The terms that apply to using the Times Estate Ltd website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Website Use" />
      <Section className="max-w-3xl space-y-8">
        <DraftLegalNotice />

        <div>
          <h2 className="text-xl font-semibold text-ink">Who this applies to</h2>
          <p className="mt-2 text-ink/80">
            These terms apply to anyone using this website, operated by{" "}
            {siteConfig.legalName.value} (company number{" "}
            {siteConfig.companiesHouseNumber.value}), registered office{" "}
            {siteConfig.registeredOffice.value}. By using this site you
            accept these terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">What this site is for</h2>
          <p className="mt-2 text-ink/80">
            This site lets you find information about our residential and
            commercial sales, lettings and property-management services,
            search property listings, and submit enquiries (valuation
            requests, viewing requests, repair reports, registrations and
            general enquiries). Submitting a form does not, by itself,
            create a contract between you and us — see the specific notice
            shown on each form (for example, a viewing request does not
            confirm a viewing, and an appraisal request does not constitute
            a formal valuation).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Property information</h2>
          <p className="mt-2 text-ink/80">
            Property listings shown on this site are provided for general
            guidance only and do not form part of any offer or contract.
            Measurements, descriptions and other details are given in good
            faith but should be independently verified before you rely on
            them, particularly before entering into any transaction. Every
            property currently shown on this site is fabricated sample
            data used to demonstrate the site&rsquo;s search and listing
            features, and is clearly labelled as such — it does not
            describe a real, available property.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Our AI assistant</h2>
          <p className="mt-2 text-ink/80">
            The AI assistant on this site is a demonstration feature, not a
            substitute for advice from a member of our team, a solicitor, a
            surveyor, or a financial adviser. It will not give you legal,
            financial, mortgage or surveying advice, will not negotiate on
            your behalf, and will not confirm a tenancy, a viewing, or any
            other outcome — a person always makes that decision. See{" "}
            <code className="text-xs">/AI_SAFETY_RULES.md</code>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Acceptable use</h2>
          <p className="mt-2 text-ink/80">
            You must not use this site to submit false information, to
            attempt to bypass its security or rate-limiting controls, to
            upload malicious files, or to interfere with its normal
            operation. We may take reasonable steps to prevent abuse of
            our forms, including automated rate limiting (see{" "}
            <code className="text-xs">/SECURITY.md</code>).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Liability</h2>
          <p className="mt-2 text-ink/80">
            We try to keep the information on this site accurate and
            up to date, but we do not guarantee it is free of errors. Where
            information is unverified, unconfirmed, or still awaiting
            professional review, this is stated clearly on the page
            itself, and nothing in that state should be relied upon. This
            section does not attempt to exclude any liability that cannot
            lawfully be excluded under English law, and its precise wording
            requires solicitor review before publication.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Governing law</h2>
          <p className="mt-2 text-ink/80">
            These terms are governed by the law of England and Wales, and
            any dispute will be subject to the exclusive jurisdiction of
            the courts of England and Wales.
          </p>
        </div>

        <p className="text-xs text-ink/70">Last drafted: 7 September 2026.</p>
      </Section>
    </>
  );
}
