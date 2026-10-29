import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { TextLink } from "@/components/ui/TextLink";
import { siteConfig, type ContentStatus } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "How Times Estate Ltd works: in-person appraisals, regulatory information shown with its real status, and a real phone number.",
  alternates: { canonical: "/why-choose-us" },
};

/**
 * Built only from things that are true today (BRAND_STRATEGY.md S2.3).
 * No statistics, awards, reviews or "leading/best" claims — none are
 * evidenced. Each item carries its real verification status. This page
 * also carries the sitemap's "How we protect you" content.
 */
const REASONS: { title: string; body: string; status: ContentStatus }[] = [
  {
    title: "A valuation from someone who has seen the property",
    body: "This website never produces an automated price. Booking a valuation arranges a free, no-obligation initial market appraisal in person.",
    status: "confirmed",
  },
  {
    title: "A registered company you can check",
    body: `${siteConfig.legalName.value} is registered at Companies House, number ${siteConfig.companiesHouseNumber.value}, incorporated in 2015.`,
    status: "confirmed",
  },
  {
    title: "A real person on the phone",
    body: `Call ${siteConfig.phoneLandline.value} or ${siteConfig.phoneMobile.value}.`,
    status: siteConfig.phoneLandline.status,
  },
  {
    title: "A repair route tenants can actually find",
    body: "Managed tenants can report a repair online from any page, with emergency guidance shown first.",
    status: "confirmed",
  },
];

const PROTECTION: { label: string; value: string; status: ContentStatus }[] = [
  { label: "Redress scheme", ...siteConfig.redressScheme },
  { label: "Client Money Protection", ...siteConfig.clientMoneyProtection },
  {
    label: "Professional indemnity insurance",
    ...siteConfig.professionalIndemnityInsurance,
  },
  {
    label: "Tenancy deposit protection",
    value: "Scheme details not yet supplied",
    status: "missing",
  },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why choose us"
        title="Straight answers before a sales pitch"
        intro="We would rather tell you a few true things than a long list of claims we can't back up. Each one below says how sure we are of it."
      />

      <Section>
        <ul className="grid gap-6 sm:grid-cols-2">
          {REASONS.map((r) => (
            <li
              key={r.title}
              className="rounded-sm border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-ink">{r.title}</h2>
                <Badge status={r.status} />
              </div>
              <p className="mt-2 text-sm text-ink/80">{r.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-accent-tint/40" aria-labelledby="protect-heading">
        <h2 id="protect-heading" className="text-2xl font-bold text-ink">
          How you are protected
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/80">
          These memberships were supplied to us but have not yet been confirmed
          with each scheme. We show that status rather than hide it.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {PROTECTION.map((p) => (
            <div key={p.label} className="rounded-sm bg-surface p-4">
              <dt className="text-sm font-medium text-secondary">{p.label}</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2 text-ink">
                {p.value} <Badge status={p.status} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm">
          <TextLink href="/complaints">Complaints procedure</TextLink> ·{" "}
          <TextLink href="/fees">Fees</TextLink>
        </p>
      </Section>

      <Section>
        <PlaceholderNotice status="missing">
          Client reviews, team profiles and track-record figures are not shown
          because none have been supplied with evidence. They will appear only
          when they are genuine, dated and consented.
        </PlaceholderNotice>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/sell">Book a Valuation</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
