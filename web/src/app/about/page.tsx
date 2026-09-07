import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "About Us" };

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
              {siteConfig.legalName.value} <Badge status={siteConfig.legalName.status} />
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
        <h2 className="text-2xl font-semibold text-ink">Why choose us</h2>
        <p className="mt-4 max-w-2xl text-ink/80">
          {siteConfig.legalName.value} is a genuinely registered, established
          London company. We would rather tell you three true things about
          ourselves than a long list of unverifiable claims.
        </p>
        <PlaceholderNotice status="missing" className="mt-6">
          A fuller account of our team, history and approach will go here
          once the owner supplies it. We do not publish invented staff
          biographies, awards or history — see CLAUDE.md Rule 1.
        </PlaceholderNotice>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-ink">Our team</h2>
        <PlaceholderNotice status="missing" className="mt-4">
          Staff names, roles and photography have not yet been supplied (see
          /CONTENT_REQUIRED.md). This section will only be populated with
          real people who have consented to appear.
        </PlaceholderNotice>
      </Section>

      <Section className="bg-secondary/5">
        <h2 className="text-2xl font-semibold text-ink">Areas we cover</h2>
        <PlaceholderNotice status="missing" className="mt-4">
          Our specific geographic coverage has not yet been confirmed beyond
          our registered office in South West London. We do not list
          neighbourhood names here until this is confirmed — see
          /SITEMAP.md, open question 4.
        </PlaceholderNotice>
      </Section>
    </>
  );
}
