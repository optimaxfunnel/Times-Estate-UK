import {
  PUBLICLY_VISIBLE_STATUSES,
  type CommercialUse,
  type ListingType,
  type Property,
  type PropertyCategory,
  type PropertyStatus,
  type ResidentialPropertyType,
  type Tenure,
  type Furnishing,
} from "@/lib/property/types";
import { demoProperties } from "@/data/demo-properties";
import { recordAuditEvent } from "@/lib/auth/audit-log";

/**
 * The adapter boundary for property data.
 *
 * Today, the only implementation is `DemoPropertyProvider`, backed by an
 * in-memory array of fabricated demonstration properties. No live CRM or
 * portal is connected — see /INTEGRATIONS.md for the comparison of real
 * providers (Reapit, Alto, Dezrez, Jupix, Street, SME Professional) and
 * what each would require.
 *
 * The point of this interface is that connecting a real provider later
 * means writing one new class that implements `PropertyProvider` —
 * nothing in the search, listing or admin UI needs to change, because
 * they only ever talk to this interface, never to `DemoPropertyProvider`
 * directly.
 */

export interface PropertyFilter {
  category?: PropertyCategory;
  listingType?: ListingType;
  /** Free-text match against display address and postcode. */
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  propertyType?: ResidentialPropertyType;
  commercialUse?: CommercialUse;
  minFloorAreaSqFt?: number;
  maxFloorAreaSqFt?: number;
  tenure?: Tenure;
  features?: string[];
  /**
   * Multi-select variants used by the filter sidebar's checkboxes
   * (2026-10-20). Any-of semantics within a list; an empty list means
   * "no restriction". `bedrooms` matches exactly, except that the
   * highest bucket (5) means "five or more", as the sidebar labels it.
   */
  propertyTypes?: ResidentialPropertyType[];
  commercialUses?: CommercialUse[];
  bedrooms?: number[];
  postcodes?: string[];
  /** Narrows within whatever statuses the caller may already see — never widens past the public set. */
  statuses?: PropertyStatus[];
  /** Any-of tenure (residential or commercial). */
  tenures?: Tenure[];
  /** Lettings: any-of furnishing. */
  furnishings?: Furnishing[];
  /** Lettings: available on or before this ISO date (properties with no date count as available now). */
  availableBy?: string;
}

export type PropertySortKey = "price_asc" | "price_desc" | "newest";

export interface PropertyListParams {
  filter?: PropertyFilter;
  sort?: PropertySortKey;
  page?: number;
  pageSize?: number;
  /** Admin use only — when false (the default), only publicly visible statuses are returned. */
  includeNonPublicStatuses?: boolean;
  /** Admin use only — restrict to specific statuses regardless of the public/private default. */
  statuses?: PropertyStatus[];
}

export interface PropertyListResult {
  items: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PropertyProvider {
  list(params: PropertyListParams): Promise<PropertyListResult>;
  getById(id: string): Promise<Property | null>;
  create(input: Property, actor: string): Promise<Property>;
  update(
    id: string,
    patch: Partial<Property>,
    actor: string,
  ): Promise<Property>;
}

const DEFAULT_PAGE_SIZE = 6;

function matchesFilter(
  property: Property,
  filter: PropertyFilter | undefined,
): boolean {
  if (!filter) return true;
  if (filter.category && property.category !== filter.category) return false;
  if (filter.listingType && property.listingType !== filter.listingType)
    return false;
  if (filter.location) {
    const needle = filter.location.trim().toLowerCase();
    const haystack =
      `${property.displayAddress} ${property.postcode}`.toLowerCase();
    if (needle && !haystack.includes(needle)) return false;
  }
  if (filter.minPrice !== undefined && (property.price ?? 0) < filter.minPrice)
    return false;
  if (
    filter.maxPrice !== undefined &&
    (property.price ?? Infinity) > filter.maxPrice
  )
    return false;
  if (filter.minBedrooms !== undefined) {
    if (
      !property.residential ||
      property.residential.bedrooms < filter.minBedrooms
    )
      return false;
  }
  if (
    filter.propertyType &&
    property.residential?.propertyType !== filter.propertyType
  )
    return false;
  if (
    filter.commercialUse &&
    property.commercial?.commercialUse !== filter.commercialUse
  )
    return false;
  if (filter.minFloorAreaSqFt !== undefined) {
    if (
      !property.commercial ||
      property.commercial.floorAreaSqFt < filter.minFloorAreaSqFt
    )
      return false;
  }
  if (filter.maxFloorAreaSqFt !== undefined) {
    if (
      !property.commercial ||
      property.commercial.floorAreaSqFt > filter.maxFloorAreaSqFt
    )
      return false;
  }
  if (filter.tenure) {
    const tenure = property.residential?.tenure ?? property.commercial?.tenure;
    if (tenure !== filter.tenure) return false;
  }
  if (filter.features && filter.features.length > 0) {
    const propertyFeatures = property.features.map((f) => f.toLowerCase());
    const wanted = filter.features.map((f) => f.toLowerCase());
    if (!wanted.every((f) => propertyFeatures.includes(f))) return false;
  }
  if (filter.propertyTypes && filter.propertyTypes.length > 0) {
    if (
      !property.residential ||
      !filter.propertyTypes.includes(property.residential.propertyType)
    )
      return false;
  }
  if (filter.commercialUses && filter.commercialUses.length > 0) {
    if (
      !property.commercial ||
      !filter.commercialUses.includes(property.commercial.commercialUse)
    )
      return false;
  }
  if (filter.bedrooms && filter.bedrooms.length > 0) {
    if (!property.residential) return false;
    const beds = property.residential.bedrooms;
    const bucket = Math.min(beds, BEDROOM_TOP_BUCKET);
    if (!filter.bedrooms.includes(bucket)) return false;
  }
  if (filter.postcodes && filter.postcodes.length > 0) {
    const wanted = filter.postcodes.map((p) => p.toUpperCase());
    if (!wanted.includes(property.postcode.toUpperCase())) return false;
  }
  if (filter.statuses && filter.statuses.length > 0) {
    if (!filter.statuses.includes(property.status)) return false;
  }
  if (filter.tenures && filter.tenures.length > 0) {
    const tenure = property.residential?.tenure ?? property.commercial?.tenure;
    if (!tenure || !filter.tenures.includes(tenure)) return false;
  }
  if (filter.furnishings && filter.furnishings.length > 0) {
    const f = property.residential?.furnishing;
    if (!f || !filter.furnishings.includes(f)) return false;
  }
  if (filter.availableBy) {
    const from = property.residential?.availableFrom;
    if (from && from > filter.availableBy) return false;
  }
  return true;
}

/** The sidebar's last bedroom option is "5+" — see PropertyFilter.bedrooms. */
export const BEDROOM_TOP_BUCKET = 5;

function sortProperties(
  items: Property[],
  sort: PropertySortKey | undefined,
): Property[] {
  const sorted = [...items];
  switch (sort) {
    case "price_asc":
      return sorted.sort(
        (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
      );
    case "price_desc":
      return sorted.sort(
        (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity),
      );
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

/**
 * In-memory demonstration provider. Mutations persist only for the
 * lifetime of the running server process — restarting `next dev` resets
 * everything back to /web/src/data/demo-properties.ts.
 */
class DemoPropertyProvider implements PropertyProvider {
  private items: Property[] = [...demoProperties];

  async list(params: PropertyListParams): Promise<PropertyListResult> {
    const page = Math.max(1, params.page ?? 1);
    const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;

    let scoped = this.items;
    if (params.statuses) {
      scoped = scoped.filter((p) => params.statuses!.includes(p.status));
    } else if (!params.includeNonPublicStatuses) {
      scoped = scoped.filter((p) =>
        PUBLICLY_VISIBLE_STATUSES.includes(p.status),
      );
    }

    const filtered = sortProperties(
      scoped.filter((p) => matchesFilter(p, params.filter)),
      params.sort,
    );

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return { items, total, page, pageSize, totalPages };
  }

  async getById(id: string): Promise<Property | null> {
    return this.items.find((p) => p.id === id) ?? null;
  }

  async create(input: Property, actor: string): Promise<Property> {
    this.items.push(input);
    recordAuditEvent({
      actor,
      action: "create",
      propertyId: input.id,
      details: `status=${input.status}`,
    });
    return input;
  }

  async update(
    id: string,
    patch: Partial<Property>,
    actor: string,
  ): Promise<Property> {
    const index = this.items.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Property ${id} not found`);
    const before = this.items[index];
    const updated: Property = {
      ...before,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.items[index] = updated;
    if (patch.status && patch.status !== before.status) {
      recordAuditEvent({
        actor,
        action: "status_change",
        propertyId: id,
        details: `${before.status} -> ${patch.status}`,
      });
    } else {
      recordAuditEvent({
        actor,
        action: "update",
        propertyId: id,
        details: "fields edited",
      });
    }
    return updated;
  }
}

/**
 * Single shared instance for the running server process — a stand-in for
 * a real database connection pool. Replace with a real `PropertyProvider`
 * implementation once a CRM/database is approved (see /INTEGRATIONS.md);
 * every caller below already goes through this interface only.
 */
export const propertyProvider: PropertyProvider = new DemoPropertyProvider();
