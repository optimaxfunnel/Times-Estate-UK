import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Areas We Cover",
  description:
    "Times Estate Ltd is based on Upper Tooting Road, London SW17. Confirmed coverage areas will be listed here.",
  alternates: { canonical: "/areas" },
  // Not indexed until coverage is confirmed and real guides exist (SEO_REDIRECT_PLAN.md).
  robots: { index: false, follow: true },
};

/**
 * The area list is the one printed on the business's existing website
 * (segment-1/CONTENT_REGISTER.md). It has NOT been re-confirmed by the
 * owner, so it is shown as a candidate list with that status — no area
 * guide or coverage claim is made from it.
 */
const CANDIDATE_AREAS = [
  "Tooting",
  "Mitcham",
  "Streatham",
  "Balham",
  "Colliers Wood",
  "Wimbledon",
  "Clapham",
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas we cover"
        title="Based in Tooting, South West London"
        intro={`Our office is at ${siteConfig.tradingAddress.value}.`}
      />
      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-ink">Areas</h2>
          <Badge status="requires-verification" />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-ink/80">
          These areas are listed on our existing website and have not yet been
          re-confirmed for this one. Area guides will be added only once each
          area is confirmed and every fact in the guide has a source.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CANDIDATE_AREAS.map((area) => (
            <li
              key={area}
              className="rounded-sm border border-border-strong px-3 py-1.5 text-sm text-ink"
            >
              {area}
            </li>
          ))}
        </ul>
        <PlaceholderNotice status="missing" className="mt-8">
          Area guides (transport, local amenities, listings by area) have not
          been written yet.
        </PlaceholderNotice>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/buy">Search property</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Ask if we cover your area
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
