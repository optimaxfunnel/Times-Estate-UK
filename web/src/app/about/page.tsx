import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import {
  PlaceholderNotice,
  showContentNotes,
} from "@/components/ui/PlaceholderNotice";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Times Estate Ltd is a registered London estate agency, company number 09597081. Read our company details and regulatory information.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={siteConfig.legalName.value}
        intro="A London-based estate agency covering residential and commercial sales, lettings and property management."
      />

      <Section>
        <h2 className="text-2xl font-semibold text-ink">Company details</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-secondary">Legal name</dt>
            <dd className="text-ink">
              {siteConfig.legalName.value}{" "}
              <Badge status={siteConfig.legalName.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-secondary">
              Companies House number
            </dt>
            <dd className="text-ink">
              {siteConfig.companiesHouseNumber.value}{" "}
              <Badge status={siteConfig.companiesHouseNumber.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-secondary">
              Registered office
            </dt>
            <dd className="text-ink">
              {siteConfig.registeredOffice.value}{" "}
              <Badge status={siteConfig.registeredOffice.status} />
            </dd>
          </div>
        </dl>
      </Section>

      <Section className="bg-secondary/5">
        <h2 className="text-2xl font-semibold text-ink">
          Regulatory information
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-secondary">
              Redress scheme
            </dt>
            <dd className="text-ink">
              {siteConfig.redressScheme.value}{" "}
              <Badge status={siteConfig.redressScheme.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-secondary">
              Client Money Protection
            </dt>
            <dd className="text-ink">
              {siteConfig.clientMoneyProtection.value}{" "}
              <Badge status={siteConfig.clientMoneyProtection.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-secondary">
              Professional indemnity insurance
            </dt>
            <dd className="text-ink">
              {siteConfig.professionalIndemnityInsurance.value}{" "}
              <Badge
                status={siteConfig.professionalIndemnityInsurance.status}
              />
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-ink/80">
          See our{" "}
          <a href="/complaints" className="text-accent underline">
            Complaints Handling Procedure
          </a>
          ,{" "}
          <a href="/fees" className="text-accent underline">
            Fee Information
          </a>
          , and{" "}
          <a href="/accessibility" className="text-accent underline">
            Accessibility Statement
          </a>
          .
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-ink">Why choose us</h2>
        <p className="mt-4 max-w-2xl text-ink/80">
          {siteConfig.legalName.value} is a genuinely registered, established
          London company. We would rather tell you three true things about
          ourselves than a long list of unverifiable claims.
        </p>
        <PlaceholderNotice status="missing" className="mt-6">
          A fuller account of our team, history and approach will go here once
          the owner supplies it. We do not publish invented staff biographies,
          awards or history — see CLAUDE.md Rule 1.
        </PlaceholderNotice>
      </Section>

      {showContentNotes() && (
        <Section>
          <h2 className="text-2xl font-semibold text-ink">Our team</h2>
          <PlaceholderNotice status="missing" className="mt-4">
            Staff names, roles and photography have not yet been supplied (see
            /CONTENT_REQUIRED.md). This section will only be populated with real
            people who have consented to appear.
          </PlaceholderNotice>
        </Section>
      )}

      <Section className="bg-secondary/5">
        <h2 className="text-2xl font-semibold text-ink">Areas we cover</h2>
        <PlaceholderNotice
          status="missing"
          className="mt-4"
          publicText="Our office is on Upper Tooting Road, Tooting, London SW17. Ask us whether we cover your area."
        >
          Our specific geographic coverage has not yet been confirmed beyond our
          registered office in South West London. We do not list neighbourhood
          names here until this is confirmed — see /SITEMAP.md, open question 4.
        </PlaceholderNotice>
      </Section>
    </>
  );
}
