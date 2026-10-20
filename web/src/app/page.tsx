import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HomeHero } from "@/components/home/HomeHero";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import { ValuationBand } from "@/components/home/ValuationBand";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import type { SearchParams } from "@/lib/property/search-params";

export const metadata: Metadata = {
  description:
    "Times Estate Ltd — residential and commercial sales, lettings and property management, based in London.",
  alternates: { canonical: "/" },
};

/**
 * Homepage to the owner's 2026-10-20 reference: hero with quick search,
 * service strip, the full listing explorer (every public listing,
 * filterable in place — the URL carries the filters, so `/?bedrooms=3`
 * is a shareable search), then the valuation band.
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <>
      <HomeHero />
      <ServiceStrip />
      <Container size="wide" className="py-8 sm:py-10">
        <ListingExplorer
          basePath="/"
          params={params}
          alertHref="/property-alerts"
        />
      </Container>
      <ValuationBand />
    </>
  );
}
