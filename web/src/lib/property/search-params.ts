import type { PropertyFilter, PropertyListParams, PropertySortKey } from "@/lib/property/provider";
import type {
  CommercialUse,
  ListingType,
  PropertyCategory,
  ResidentialPropertyType,
} from "@/lib/property/types";

export type SearchParams = Record<string, string | string[] | undefined>;

function str(params: SearchParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function num(params: SearchParams, key: string): number | undefined {
  const value = str(params, key);
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

const VALID_SORT: PropertySortKey[] = ["price_asc", "price_desc", "newest"];

export function buildListParams(
  params: SearchParams,
  category: PropertyCategory,
  listingType: ListingType,
): PropertyListParams {
  const filter: PropertyFilter = {
    category,
    listingType,
    location: str(params, "location") || undefined,
    minPrice: num(params, "minPrice"),
    maxPrice: num(params, "maxPrice"),
    minBedrooms: num(params, "minBedrooms"),
    propertyType: (str(params, "propertyType") as ResidentialPropertyType) || undefined,
    commercialUse: (str(params, "commercialUse") as CommercialUse) || undefined,
    minFloorAreaSqFt: num(params, "minFloorAreaSqFt"),
  };

  const sortValue = str(params, "sort");
  const sort: PropertySortKey = VALID_SORT.includes(sortValue as PropertySortKey)
    ? (sortValue as PropertySortKey)
    : "newest";

  const page = num(params, "page") ?? 1;

  return { filter, sort, page };
}

/** Converts the current search params into a URLSearchParams (drops "page" so pagination links can set it fresh). */
export function toUrlSearchParams(params: SearchParams): URLSearchParams {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "page") continue;
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => usp.append(key, v));
    } else {
      usp.set(key, value);
    }
  }
  return usp;
}

/** Summarises the active filters in plain English, for the alert/no-results prompts. */
export function summariseSearch(params: SearchParams): string {
  const parts: string[] = [];
  const location = str(params, "location");
  if (location) parts.push(`in "${location}"`);
  const minPrice = str(params, "minPrice");
  const maxPrice = str(params, "maxPrice");
  if (minPrice || maxPrice) {
    parts.push(`priced ${minPrice ? `from £${minPrice}` : ""}${maxPrice ? ` up to £${maxPrice}` : ""}`.trim());
  }
  const minBedrooms = str(params, "minBedrooms");
  if (minBedrooms) parts.push(`${minBedrooms}+ bedrooms`);
  return parts.length > 0 ? parts.join(", ") : "no specific filters";
}
