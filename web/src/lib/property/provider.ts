import {
  PUBLICLY_VISIBLE_STATUSES,
  type CommercialUse,
  type ListingType,
  type Property,
  type PropertyCategory,
  type PropertyStatus,
  type ResidentialPropertyType,
  type Tenure,
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
  update(id: string, patch: Partial<Property>, actor: string): Promise<Property>;
}

const DEFAULT_PAGE_SIZE = 6;

function matchesFilter(property: Property, filter: PropertyFilter | undefined): boolean {
  if (!filter) return true;
  if (filter.category && property.category !== filter.category) return false;
  if (filter.listingType && property.listingType !== filter.listingType) return false;
  if (filter.location) {
    const needle = filter.location.trim().toLowerCase();
    const haystack = `${property.displayAddress} ${property.postcode}`.toLowerCase();
    if (needle && !haystack.includes(needle)) return false;
  }
  if (filter.minPrice !== undefined && (property.price ?? 0) < filter.minPrice) return false;
  if (filter.maxPrice !== undefined && (property.price ?? Infinity) > filter.maxPrice) return false;
  if (filter.minBedrooms !== undefined) {
    if (!property.residential || property.residential.bedrooms < filter.minBedrooms) return false;
  }
  if (filter.propertyType && property.residential?.propertyType !== filter.propertyType) return false;
  if (filter.commercialUse && property.commercial?.commercialUse !== filter.commercialUse) return false;
  if (filter.minFloorAreaSqFt !== undefined) {
    if (!property.commercial || property.commercial.floorAreaSqFt < filter.minFloorAreaSqFt) return false;
  }
  if (filter.maxFloorAreaSqFt !== undefined) {
    if (!property.commercial || property.commercial.floorAreaSqFt > filter.maxFloorAreaSqFt) return false;
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
  return true;
}

function sortProperties(items: Property[], sort: PropertySortKey | undefined): Property[] {
  const sorted = [...items];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    case "price_desc":
      return sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    case "newest":
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
      scoped = scoped.filter((p) => PUBLICLY_VISIBLE_STATUSES.includes(p.status));
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
    recordAuditEvent({ actor, action: "create", propertyId: input.id, details: `status=${input.status}` });
    return input;
  }

  async update(id: string, patch: Partial<Property>, actor: string): Promise<Property> {
    const index = this.items.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Property ${id} not found`);
    const before = this.items[index];
    const updated: Property = { ...before, ...patch, updatedAt: new Date().toISOString() };
    this.items[index] = updated;
    if (patch.status && patch.status !== before.status) {
      recordAuditEvent({
        actor,
        action: "status_change",
        propertyId: id,
        details: `${before.status} -> ${patch.status}`,
      });
    } else {
      recordAuditEvent({ actor, action: "update", propertyId: id, details: "fields edited" });
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
