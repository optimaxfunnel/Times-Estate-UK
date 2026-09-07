import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PropertySearchForm } from "@/components/property/PropertySearchForm";
import { PropertyResultsGrid } from "@/components/property/PropertyResultsGrid";
import { propertyProvider } from "@/lib/property/provider";
import { buildListParams, toUrlSearchParams, type SearchParams } from "@/lib/property/search-params";

export const metadata: Metadata = {
  title: "Commercial Property for Sale",
  description: "Search commercial property for sale with Times Estate Ltd, London.",
  alternates: { canonical: "/commercial/for-sale" },
};

export default async function CommercialForSalePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const listParams = buildListParams(params, "commercial", "sale");
  const result = await propertyProvider.list(listParams);
  const urlParams = toUrlSearchParams(params);

  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Commercial property for sale"
        intro="Search current commercial sales listings. Every result below is demonstration data."
      />
      <Section className="space-y-8">
        <PropertySearchForm
          category="commercial"
          action="/commercial/for-sale"
          defaults={{
            location: params.location as string,
            minPrice: params.minPrice as string,
            maxPrice: params.maxPrice as string,
            commercialUse: params.commercialUse as string,
            minFloorAreaSqFt: params.minFloorAreaSqFt as string,
            sort: params.sort as string,
          }}
        />
        <PropertyResultsGrid
          result={result}
          basePath="/commercial/for-sale"
          currentParams={urlParams}
          alertHref={`/property-alerts?listingType=sale&category=commercial&${urlParams.toString()}`}
        />
      </Section>
    </>
  );
}
