import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PropertySearchForm } from "@/components/property/PropertySearchForm";
import { PropertyResultsGrid } from "@/components/property/PropertyResultsGrid";
import { propertyProvider } from "@/lib/property/provider";
import { buildListParams, toUrlSearchParams, type SearchParams } from "@/lib/property/search-params";

export const metadata: Metadata = {
  title: "Property for Sale",
  description: "Search residential property for sale with Times Estate Ltd, London.",
  alternates: { canonical: "/buy" },
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const listParams = buildListParams(params, "residential", "sale");
  const result = await propertyProvider.list(listParams);
  const urlParams = toUrlSearchParams(params);

  return (
    <>
      <PageHero
        eyebrow="Buy"
        title="Residential property for sale"
        intro="Search current sales listings. Every result below is demonstration data — see the note on each card."
      />
      <Section className="space-y-8">
        <PropertySearchForm
          category="residential"
          action="/buy"
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
          basePath="/buy"
          currentParams={urlParams}
          alertHref={`/property-alerts?listingType=sale&category=residential&${urlParams.toString()}`}
        />
      </Section>
    </>
  );
}
