import {
  BEDROOM_TOP_BUCKET,
  type PropertyFilter,
  type PropertyListParams,
  type PropertySortKey,
} from "@/lib/property/provider";
import {
  COMMERCIAL_USES,
  PUBLICLY_VISIBLE_STATUSES,
  RESIDENTIAL_PROPERTY_TYPES,
  type CommercialUse,
  type ListingType,
  type PropertyCategory,
  type PropertyStatus,
  type ResidentialPropertyType,
  type Tenure,
  type Furnishing,
} from "@/lib/property/types";

const TENURES = [
  "freehold",
  "leasehold",
  "share_of_freehold",
  "commonhold",
] as const;
const FURNISHINGS = ["furnished", "unfurnished", "part_furnished"] as const;

export type SearchParams = Record<string, string | string[] | undefined>;

function str(params: SearchParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

/** Every value for a repeated key (checkbox groups submit `?bedrooms=1&bedrooms=3`). */
function list(params: SearchParams, key: string): string[] {
  const value = params[key];
  if (value === undefined) return [];
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

function num(params: SearchParams, key: string): number | undefined {
  const value = str(params, key);
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/** Keeps only the values that are genuinely members of an allow-list (anything else in the URL is ignored, not errored). */
function allowed<T extends string>(
  values: string[],
  allowList: readonly T[],
): T[] {
  return values.filter((v): v is T =>
    (allowList as readonly string[]).includes(v),
  );
}

const VALID_SORT: PropertySortKey[] = ["price_asc", "price_desc", "newest"];

export type ResultsView = "grid" | "list";

export function readView(params: SearchParams): ResultsView {
  return str(params, "view") === "list" ? "list" : "grid";
}

export function readSort(params: SearchParams): PropertySortKey {
  const sortValue = str(params, "sort");
  return VALID_SORT.includes(sortValue as PropertySortKey)
    ? (sortValue as PropertySortKey)
    : "newest";
}

/**
 * Turns a page's URL query into provider parameters. `category` and
 * `listingType` scope a dedicated search page (/buy is residential +
 * sale); the homepage passes neither and searches everything public.
 */
export function buildListParams(
  params: SearchParams,
  category?: PropertyCategory,
  listingType?: ListingType,
  options: { pageSize?: number } = {},
): PropertyListParams {
  const filter: PropertyFilter = {
    category,
    listingType,
    location: str(params, "location") || undefined,
    minPrice: num(params, "minPrice"),
    maxPrice: num(params, "maxPrice"),
    minBedrooms: num(params, "minBedrooms"),
    minFloorAreaSqFt: num(params, "minFloorAreaSqFt"),
    propertyTypes: allowed(
      list(params, "propertyType"),
      RESIDENTIAL_PROPERTY_TYPES,
    ) as ResidentialPropertyType[],
    commercialUses: allowed(
      list(params, "commercialUse"),
      COMMERCIAL_USES,
    ) as CommercialUse[],
    bedrooms: list(params, "bedrooms")
      .map(Number)
      .filter((n) => Number.isInteger(n) && n >= 0 && n <= BEDROOM_TOP_BUCKET),
    postcodes: list(params, "postcode")
      .map((p) => p.trim())
      .filter(Boolean),
    features: list(params, "feature"),
    tenures: allowed(list(params, "tenure"), TENURES) as Tenure[],
    furnishings: allowed(
      list(params, "furnishing"),
      FURNISHINGS,
    ) as Furnishing[],
    availableBy: /^\d{4}-\d{2}-\d{2}$/.test(str(params, "availableBy") ?? "")
      ? str(params, "availableBy")
      : undefined,
    maxFloorAreaSqFt: num(params, "maxFloorAreaSqFt"),
    // A visitor can narrow by marketing status, but only ever within the
    // statuses that are public anyway (types.ts PUBLICLY_VISIBLE_STATUSES).
    statuses: allowed(
      list(params, "status"),
      PUBLICLY_VISIBLE_STATUSES,
    ) as PropertyStatus[],
  };

  const page = num(params, "page") ?? 1;

  return { filter, sort: readSort(params), page, pageSize: options.pageSize };
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
    parts.push(
      `priced ${minPrice ? `from £${minPrice}` : ""}${maxPrice ? ` up to £${maxPrice}` : ""}`.trim(),
    );
  }
  const minBedrooms = str(params, "minBedrooms");
  if (minBedrooms) parts.push(`${minBedrooms}+ bedrooms`);
  return parts.length > 0 ? parts.join(", ") : "no specific filters";
}
