import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import {
  toUrlSearchParams,
  type SearchParams,
} from "@/lib/property/search-params";

export const metadata: Metadata = {
  title: "Commercial Property to Let",
  description:
    "Search commercial property to let with Times Estate Ltd, London.",
  alternates: { canonical: "/commercial/to-let" },
};

export default async function CommercialToLetPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const urlParams = toUrlSearchParams(params);

  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Commercial property to let"
        intro="Search current commercial lettings. Every result below is demonstration data."
      />
      <Container size="wide" className="py-8 sm:py-10">
        <ListingExplorer
          basePath="/commercial/to-let"
          params={params}
          category="commercial"
          listingType="letting"
          alertHref={`/property-alerts?listingType=letting&category=commercial&${urlParams.toString()}`}
        />
      </Container>
    </>
  );
}
