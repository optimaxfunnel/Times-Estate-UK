import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: "Residential Sales & Lettings" };

const links = [
  {
    title: "Selling your home",
    description: "Book a free sales valuation and find out what's involved.",
    href: "/sell",
  },
  {
    title: "Letting your property",
    description:
      "Request a rental valuation, with let-only or full management options.",
    href: "/let",
  },
  {
    title: "Property management",
    description:
      "Full management for landlords, and repair reporting for tenants.",
    href: "/property-management",
  },
] as const;

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential"
        title="Residential sales and lettings"
        intro="Whether you're selling, letting, buying or renting, here's where to start."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {links.map((link) => (
            <div
              key={link.href}
              className="rounded-sm border border-border bg-surface p-6"
            >
              <h2 className="text-lg font-semibold text-ink">{link.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{link.description}</p>
              <ButtonLink
                href={link.href}
                variant="ghost"
                className="mt-4 px-0"
              >
                Learn more &rarr;
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
