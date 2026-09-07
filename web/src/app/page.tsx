import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/Badge";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  description:
    "Times Estate Ltd — residential and commercial sales, lettings and property management, based in London.",
};

const services = [
  {
    title: "Residential",
    description:
      "Sales and lettings for homeowners, landlords, buyers and tenants.",
    href: "/residential",
  },
  {
    title: "Commercial",
    description:
      "Sales, lettings and management for commercial landlords and occupiers.",
    href: "/commercial",
  },
  {
    title: "Property Management",
    description:
      "Full management for landlords, and a straightforward way for tenants to report repairs.",
    href: "/property-management",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Section className="border-b border-border bg-surface">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
            A London estate agency built on straightforward advice.
          </h1>
          <p className="mt-4 text-lg text-ink/80">
            {siteConfig.legalName.value} handles residential and commercial
            sales, lettings and property management. Whatever stage you&rsquo;re
            at, start with a free valuation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/sell">Book a Valuation</ButtonLink>
            <ButtonLink href="/let" variant="secondary">
              Let Your Property
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-ink">How we can help</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.href}
              href={service.href}
              className="block rounded-sm border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{service.description}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/5">
        <h2 className="text-2xl font-semibold text-ink">Why Times Estate Ltd</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-ink">An established company</h3>
            <p className="mt-2 text-sm text-ink/70">
              {siteConfig.legalName.value} is registered in England &amp; Wales
              (company number {siteConfig.companiesHouseNumber.value}), verified
              against the Companies House public register.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-ink">How we protect you</h3>
            </div>
            <p className="mt-2 text-sm text-ink/70">
              We hold Client Money Protection and redress scheme membership.
              Both are currently being independently verified before we
              display them as confirmed — see the badges below.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex flex-wrap items-center gap-2">
                {siteConfig.clientMoneyProtection.value}
                <Badge status={siteConfig.clientMoneyProtection.status} />
              </li>
              <li className="flex flex-wrap items-center gap-2">
                {siteConfig.redressScheme.value}
                <Badge status={siteConfig.redressScheme.status} />
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-ink">Property search</h2>
          <Badge status="missing" />
        </div>
        <p className="mb-6 max-w-2xl text-sm text-ink/70">
          Live property search is not yet connected — no property feed has
          been supplied (see /CONTENT_REQUIRED.md). The cards below show how
          listings will look once real properties are added; they are sample
          data only.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <PropertyCard
            address="Sample Street, London"
            priceLabel="£000,000"
            bedrooms={3}
            bathrooms={1}
            transactionType="For Sale"
            isDemo
          />
          <PropertyCard
            address="Example Road, London"
            priceLabel="£0,000 pcm"
            bedrooms={2}
            bathrooms={1}
            transactionType="To Let"
            isDemo
          />
          <PropertyCard
            address="Placeholder Avenue, London"
            priceLabel="£000,000"
            bedrooms={4}
            bathrooms={2}
            transactionType="For Sale"
            isDemo
          />
        </div>
      </Section>
    </>
  );
}
