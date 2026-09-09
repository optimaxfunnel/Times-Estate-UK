import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge } from "@/components/ui/Badge";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { HomeSearchTabs } from "@/components/home/HomeSearchTabs";
import { SellLetCtaBand } from "@/components/home/SellLetCtaBand";
import { siteConfig } from "@/lib/site-config";
import { propertyProvider } from "@/lib/property/provider";
import { toPublicProperty } from "@/lib/property/types";

export const metadata: Metadata = {
  description:
    "Times Estates — residential and commercial sales, lettings and property management, based in London.",
  alternates: { canonical: "/" },
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

export default async function HomePage() {
  const featured = await propertyProvider.list({ sort: "newest", pageSize: 3 });

  return (
    <>
      <h1 className="sr-only">
        {siteConfig.displayName.value} — straightforward London estate agency
        advice
      </h1>
      <HeroSlideshow />
      <HomeSearchTabs />

      <Section className="pt-10 sm:pt-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          <p className="text-sm text-ink/70">
            Companies House-registered since 2015
          </p>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <div className="flex items-center gap-2 text-sm text-ink/70">
            {siteConfig.redressScheme.value}
            <Badge status={siteConfig.redressScheme.status} />
          </div>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <div className="flex items-center gap-2 text-sm text-ink/70">
            {siteConfig.clientMoneyProtection.value}
            <Badge status={siteConfig.clientMoneyProtection.status} />
          </div>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
          <p className="text-sm text-ink/70">
            We never invent a valuation figure
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-ink">How we can help</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.href}
              href={service.href}
              className="block rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="text-lg font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{service.description}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/5">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-ink">
            Featured properties
          </h2>
          <Badge status="missing" />
        </div>
        <p className="mb-6 max-w-2xl text-sm text-ink/70">
          Search now works, but no real property feed has been supplied yet (see
          /CONTENT_REQUIRED.md) — every result below is demonstration data, not
          a genuine {siteConfig.displayName.value} instruction.
        </p>
        {featured.items.length === 0 ? (
          <p className="text-sm text-ink/70">No properties currently listed.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {featured.items.map((property) => (
              <PropertyCard
                key={property.id}
                property={toPublicProperty(property)}
              />
            ))}
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/buy" variant="secondary">
            Search Property for Sale
          </ButtonLink>
          <ButtonLink href="/rent" variant="secondary">
            Search Property to Rent
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <SellLetCtaBand />
      </Section>
    </>
  );
}
