import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import {
  toUrlSearchParams,
  type SearchParams,
} from "@/lib/property/search-params";

export const metadata: Metadata = {
  title: "Commercial Property for Sale",
  description:
    "Search commercial property for sale with Times Estate Ltd, London.",
  alternates: { canonical: "/commercial/for-sale" },
};

export default async function CommercialForSalePage({
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
        title="Commercial property for sale"
        intro="Search current commercial sales listings. Every result below is demonstration data."
      />
      <Container size="wide" className="py-8 sm:py-10">
        <ListingExplorer
          basePath="/commercial/for-sale"
          params={params}
          category="commercial"
          listingType="sale"
          alertHref={`/property-alerts?listingType=sale&category=commercial&${urlParams.toString()}`}
        />
      </Container>
    </>
  );
}
