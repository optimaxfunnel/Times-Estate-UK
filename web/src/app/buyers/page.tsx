import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextLink } from "@/components/ui/TextLink";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Buyers and Tenants",
  description:
    "How buying and renting through Times Estate Ltd works — searching, viewings, alerts and what happens next.",
  alternates: { canonical: "/buyers" },
};

const BUYING = [
  [
    "Search",
    "Filter by area, price, type and bedrooms, and save the ones you like.",
  ],
  [
    "Request a viewing",
    "Pick two or three times that suit you. We confirm by phone or email.",
  ],
  ["Make an offer", "We pass every offer to the seller and keep you updated."],
];

const RENTING = [
  ["Search", "Every rental shows a single fixed monthly rent."],
  [
    "Request a viewing",
    "A person confirms the time with you and the current occupier.",
  ],
  ["Apply", "We explain referencing and what you will pay before you commit."],
];

function Steps({ steps }: { steps: string[][] }) {
  return (
    <ol className="mt-4 grid gap-4 md:grid-cols-3">
      {steps.map(([title, body], i) => (
        <li
          key={title}
          className="rounded-sm border border-border bg-surface p-5"
        >
          <span className="font-heading text-2xl font-bold text-accent">
            {i + 1}
          </span>
          <h3 className="mt-1 font-bold text-ink">{title}</h3>
          <p className="mt-1 text-sm text-ink/80">{body}</p>
        </li>
      ))}
    </ol>
  );
}

/** One page for both audiences (sitemap /buyers and /tenants), in two sections. */
export default function BuyersAndTenantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Buyers & tenants"
        title="Finding your next home"
        intro="Search, save and ask for a viewing — a real person confirms every appointment."
      >
        <ButtonLink href="/buy">Property for sale</ButtonLink>
        <ButtonLink href="/rent" variant="secondary">
          Property to rent
        </ButtonLink>
      </PageHero>

      <Section aria-labelledby="buying">
        <h2 id="buying" className="text-2xl font-bold text-ink">
          Buying
        </h2>
        <Steps steps={BUYING} />
        <p className="mt-4 text-sm">
          Nothing matching yet?{" "}
          <TextLink href="/property-alerts">Create a property alert</TextLink>.
        </p>
      </Section>

      <Section
        id="tenants"
        className="bg-accent-tint/40"
        aria-labelledby="renting"
      >
        <h2 id="renting" className="text-2xl font-bold text-ink">
          Renting
        </h2>
        <Steps steps={RENTING} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PlaceholderNotice status="missing">
            <strong>Tenant fees and deposit.</strong> Permitted payments, the
            deposit level and our deposit protection scheme have not yet been
            supplied. They will be listed on{" "}
            <TextLink href="/fees">Fees</TextLink>.
          </PlaceholderNotice>
          <PlaceholderNotice status="missing">
            <strong>Already a managed tenant?</strong>{" "}
            <TextLink href="/report-a-repair">Report a repair</TextLink>. Our
            out-of-hours emergency process has not yet been supplied.
          </PlaceholderNotice>
        </div>
      </Section>
    </>
  );
}
