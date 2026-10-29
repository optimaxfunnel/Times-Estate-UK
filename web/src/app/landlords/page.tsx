import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Landlords and Property Owners",
  description:
    "Letting and managing residential and commercial property with Times Estate Ltd — let-only or full management, rental valuations and repairs.",
  alternates: { canonical: "/landlords" },
};

const SERVICES = [
  {
    title: "Let only",
    body: "We find and set up the tenancy; you look after the property day to day.",
    href: "/let",
    cta: "Request a rental valuation",
  },
  {
    title: "Full management",
    body: "We let the property and look after it: rent, repairs and tenant contact.",
    href: "/property-management",
    cta: "Request a management appraisal",
  },
  {
    title: "Commercial property",
    body: "Lettings and management for shops, offices and other commercial premises.",
    href: "/commercial",
    cta: "Enquire about commercial",
  },
];

export default function LandlordsPage() {
  return (
    <>
      <PageHero
        eyebrow="Landlords"
        title="Letting and managing your property"
        intro="Choose how much you want us to do. Every rental figure comes from an in-person appraisal, never an online estimate."
      >
        <ButtonLink href="/let">Request a Rental Valuation</ButtonLink>
      </PageHero>

      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <li
              key={s.title}
              className="flex flex-col rounded-sm border border-border bg-surface p-6"
            >
              <h2 className="text-lg font-bold text-ink">{s.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink/80">{s.body}</p>
              <TextLink href={s.href} className="mt-4 text-sm">
                {s.cta} →
              </TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-accent-tint/40">
        <h2 className="text-2xl font-bold text-ink">Before you instruct us</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <PlaceholderNotice status="missing">
            <strong>Fees.</strong> Our landlord fees have not yet been
            published. We will quote them in writing before you instruct us —
            see <TextLink href="/fees">Fees</TextLink>.
          </PlaceholderNotice>
          <PlaceholderNotice status="requires-verification">
            <strong>Your money.</strong> Client Money Protection and redress
            scheme details are on{" "}
            <TextLink href="/why-choose-us">Why choose us</TextLink>, with their
            current verification status.
          </PlaceholderNotice>
          <PlaceholderNotice status="requires-professional-review">
            <strong>Renters&rsquo; Rights Act 2025.</strong> Guidance on the new
            rules for landlords will be added once a solicitor has reviewed it.
          </PlaceholderNotice>
          <PlaceholderNotice status="requires-professional-review">
            <strong>Guaranteed rent.</strong> Not offered on this website until
            the scheme&rsquo;s terms are confirmed and legally reviewed.
          </PlaceholderNotice>
        </div>
      </Section>
    </>
  );
}
