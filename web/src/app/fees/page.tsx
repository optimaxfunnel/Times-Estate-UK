import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { DraftLegalNotice } from "@/components/layout/DraftLegalNotice";

export const metadata: Metadata = {
  title: "Fee Information",
  description:
    "The fees that may apply to our lettings, sales and management services.",
  alternates: { canonical: "/fees" },
};

export default function FeesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Fee Information"
        intro="Estate and letting agents in England are required to display their fees clearly. This page sets out the structure we use — the specific amounts are shown once the business owner confirms them."
      />

      <Section className="max-w-3xl space-y-10">
        <DraftLegalNotice />
        <div>
          <h2 className="text-xl font-semibold text-ink">
            Tenants — permitted payments
          </h2>
          <p className="mt-2 text-ink/80">
            Under the Tenant Fees Act 2019, we can only charge a tenant for a
            small, fixed list of payments: the rent itself, a refundable tenancy
            deposit (capped by law), a refundable holding deposit, a payment for
            a tenant-requested change to the tenancy, a payment for ending a
            tenancy early at the tenant&rsquo;s request, utilities and
            communication services where the tenancy agreement provides for
            them, and a default payment for a genuinely late rent payment or a
            lost key, each capped as the Act requires. We do not charge tenants
            a fee for anything outside this list.
          </p>
          <PlaceholderNotice status="missing" className="mt-4">
            The specific amounts we charge for the payments above (deposit
            level, any default charges) have not yet been confirmed by the
            business owner. Nothing is charged, and nothing is displayed as a
            specific figure, until it is.
          </PlaceholderNotice>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Landlords — lettings and management fees
          </h2>
          <PlaceholderNotice status="missing" className="mt-2">
            Our fee structure for let-only and fully managed lettings services
            (e.g. a percentage of rent, or a fixed fee) has not yet been
            confirmed by the business owner. We publish a fee schedule here, not
            on request only, once it is.
          </PlaceholderNotice>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Sellers — sales commission
          </h2>
          <PlaceholderNotice status="missing" className="mt-2">
            Our commission structure for residential and commercial sales has
            not yet been confirmed by the business owner.
          </PlaceholderNotice>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">
            Value Added Tax (VAT)
          </h2>
          <PlaceholderNotice status="missing" className="mt-2">
            Whether our fees are quoted inclusive or exclusive of VAT, and our
            VAT registration status, have not yet been confirmed — see{" "}
            <code className="text-xs">/BUSINESS_REQUIREMENTS.md</code>.
          </PlaceholderNotice>
        </div>
      </Section>
    </>
  );
}
