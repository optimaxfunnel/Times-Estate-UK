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
  const listParams = buildListParams(params, "commercial", "letting");
  const result = await propertyProvider.list(listParams);
  const urlParams = toUrlSearchParams(params);

  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Commercial property to let"
        intro="Search current commercial lettings. Every result below is demonstration data."
      />
      <Section className="space-y-8">
        <PropertySearchForm
          category="commercial"
          action="/commercial/to-let"
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
          basePath="/commercial/to-let"
          currentParams={urlParams}
          alertHref={`/property-alerts?listingType=letting&category=commercial&${urlParams.toString()}`}
        />
      </Section>
    </>
  );
}
