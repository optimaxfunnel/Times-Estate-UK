import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PropertySearchForm } from "@/components/property/PropertySearchForm";
import { PropertyResultsGrid } from "@/components/property/PropertyResultsGrid";
import { propertyProvider } from "@/lib/property/provider";
import {
  buildListParams,
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
  const listParams = buildListParams(params, "residential", "letting");
  const result = await propertyProvider.list(listParams);
  const urlParams = toUrlSearchParams(params);

  return (
    <>
      <PageHero
        eyebrow="Rent"
        title="Residential property to rent"
        intro="Search current rental listings. Every result below is demonstration data — see the note on each card."
      />
      <Section className="space-y-8">
        <PropertySearchForm
          category="residential"
          action="/rent"
          defaults={{
            location: params.location as string,
            minPrice: params.minPrice as string,
            maxPrice: params.maxPrice as string,
            minBedrooms: params.minBedrooms as string,
            propertyType: params.propertyType as string,
            sort: params.sort as string,
          }}
        />
        <PropertyResultsGrid
          result={result}
          basePath="/rent"
          currentParams={urlParams}
          alertHref={`/property-alerts?listingType=letting&category=residential&${urlParams.toString()}`}
        />
      </Section>
    </>
  );
}
