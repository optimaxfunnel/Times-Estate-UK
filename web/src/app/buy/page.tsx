import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import {
  toUrlSearchParams,
  type SearchParams,
} from "@/lib/property/search-params";

export const metadata: Metadata = {
  title: "Property for Sale",
  description:
    "Search residential property for sale with Times Estate Ltd, London.",
  alternates: { canonical: "/buy" },
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const urlParams = toUrlSearchParams(params);

  return (
    <>
      <PageHero
        eyebrow="Buy"
        title="Residential property for sale"
        intro="Search current sales listings. Every result below is demonstration data — see the note on each card."
      />
      <Container size="wide" className="py-8 sm:py-10">
        <ListingExplorer
          basePath="/buy"
          params={params}
          category="residential"
          listingType="sale"
          alertHref={`/property-alerts?listingType=sale&category=residential&${urlParams.toString()}`}
        />
      </Container>
    </>
  );
}
