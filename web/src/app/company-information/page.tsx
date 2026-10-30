import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { DraftLegalNotice } from "@/components/layout/DraftLegalNotice";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Company Information",
  description:
    "Company details for Times Estate Ltd: registered name and number, registered office, contact details, redress scheme and client money protection.",
  alternates: { canonical: "/company-information" },
};

/**
 * Company disclosure in one place. Every value comes from site-config,
 * which mirrors CONTENT_VERIFICATION_REGISTER.md, and shows its current
 * status — a membership the owner has supplied but nobody has yet
 * checked with the scheme is labelled as such, never as confirmed.
 */
export default function CompanyInformationPage() {
  const rows = [
    { label: "Registered name", fact: siteConfig.legalName },
    { label: "Company number", fact: siteConfig.companiesHouseNumber },
    { label: "Registered office", fact: siteConfig.registeredOffice },
    { label: "Office (trading address)", fact: siteConfig.tradingAddress },
    { label: "Telephone (landline)", fact: siteConfig.phoneLandline },
    { label: "Telephone (mobile)", fact: siteConfig.phoneMobile },
    { label: "Email", fact: siteConfig.email },
    { label: "Redress scheme", fact: siteConfig.redressScheme },
    {
      label: "Client money protection",
      fact: siteConfig.clientMoneyProtection,
    },
    {
      label: "Professional indemnity insurance",
      fact: siteConfig.professionalIndemnityInsurance,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Company Information"
        intro="Times Estate Ltd is a private limited company registered in England and Wales."
      />
      <Section className="max-w-3xl space-y-8">
        <DraftLegalNotice />
        <dl className="divide-y divide-border border-y border-border">
          {rows.map(({ label, fact }) => (
            <div
              key={label}
              className="grid gap-1 py-3 sm:grid-cols-[14rem_minmax(0,1fr)]"
            >
              <dt className="text-sm font-medium text-ink/70">{label}</dt>
              <dd className="flex flex-wrap items-center gap-2 text-ink">
                {fact.value ?? "Not yet published"}
                {fact.status !== "confirmed" && <Badge status={fact.status} />}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-ink/80">
          You can check our company details on the Companies House register
          using company number {siteConfig.companiesHouseNumber.value}.
        </p>
        <PlaceholderNotice status="missing">
          Still to add once supplied: VAT registration number (or confirmation
          the company is not VAT registered), ICO data-protection registration
          number, and any professional body membership. None is shown until
          confirmed.
        </PlaceholderNotice>
      </Section>
    </>
  );
}
