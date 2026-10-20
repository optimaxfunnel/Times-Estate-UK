import { BEDROOM_TOP_BUCKET } from "@/lib/property/provider";
import {
  COMMERCIAL_USE_LABELS,
  RESIDENTIAL_PROPERTY_TYPE_LABELS,
  STATUS_LABELS,
  type Property,
} from "@/lib/property/types";

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface Facets {
  propertyTypes: FacetOption[];
  commercialUses: FacetOption[];
  bedrooms: FacetOption[];
  postcodes: FacetOption[];
  features: FacetOption[];
  statuses: FacetOption[];
}

function tally(
  items: Property[],
  pick: (p: Property) => string | string[] | undefined,
  label: (value: string) => string,
): FacetOption[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const picked = pick(item);
    if (picked === undefined) continue;
    for (const value of Array.isArray(picked) ? picked : [picked]) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: label(value), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/**
 * The "(count)" figures beside each filter checkbox. Counted over the
 * whole public set the page is scoped to — not the currently filtered
 * results — so a visitor can see what *would* match if they ticked an
 * option. With only demonstration data loaded, every count here is a
 * count of sample listings (each card says so).
 */
export function computeFacets(items: Property[]): Facets {
  return {
    propertyTypes: tally(
      items,
      (p) => p.residential?.propertyType,
      (v) =>
        RESIDENTIAL_PROPERTY_TYPE_LABELS[
          v as keyof typeof RESIDENTIAL_PROPERTY_TYPE_LABELS
        ] ?? v,
    ),
    commercialUses: tally(
      items,
      (p) => p.commercial?.commercialUse,
      (v) =>
        COMMERCIAL_USE_LABELS[v as keyof typeof COMMERCIAL_USE_LABELS] ?? v,
    ),
    bedrooms: tally(
      items,
      (p) =>
        p.residential
          ? String(Math.min(p.residential.bedrooms, BEDROOM_TOP_BUCKET))
          : undefined,
      (v) => (Number(v) >= BEDROOM_TOP_BUCKET ? `${v}+` : v),
    ).sort((a, b) => Number(a.value) - Number(b.value)),
    postcodes: tally(
      items,
      (p) => p.postcode.toUpperCase(),
      (v) => v,
    ),
    features: tally(
      items,
      (p) => p.features,
      (v) => v,
    ),
    statuses: tally(
      items,
      (p) => p.status,
      (v) => STATUS_LABELS[v as keyof typeof STATUS_LABELS] ?? v,
    ),
  };
}
