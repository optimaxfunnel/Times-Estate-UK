import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import {
  toUrlSearchParams,
  type SearchParams,
} from "@/lib/property/search-params";

export const metadata: Metadata = {
  title: "Property to Rent",
  description:
    "Search residential property to rent with Times Estate Ltd, London.",
  alternates: { canonical: "/rent" },
};

export default async function RentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const urlParams = toUrlSearchParams(params);

  return (
    <>
      <PageHero
        eyebrow="Rent"
        title="Residential property to rent"
        intro="Search current rental listings. Every result below is demonstration data — see the note on each card."
      />
      <Container size="wide" className="py-8 sm:py-10">
        <ListingExplorer
          basePath="/rent"
          params={params}
          category="residential"
          listingType="letting"
          alertHref={`/property-alerts?listingType=letting&category=residential&${urlParams.toString()}`}
        />
      </Container>
    </>
  );
}
