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
import { getDb } from "@/lib/db/client";

/**
 * The adapter boundary for property data.
 *
 * Today, the implementation is `DbPropertyProvider`: properties are kept in
 * the database (`properties` table) since 2026-11-09, so edits and status
 * changes survive restarts. While no real listings exist, an empty table is
 * filled with the fabricated, clearly labelled sample properties. No live CRM or
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

type Row = { data: Property | string };
const parse = (r: Row): Property =>
  typeof r.data === "string" ? (JSON.parse(r.data) as Property) : r.data;

/**
 * Sample listings are loaded into an EMPTY properties table only, and only
 * while SEED_DEMO_PROPERTIES is not "false". Set it to "false" once real
 * listings replace the samples, so a cleared table is never refilled with
 * fabricated data (CLAUDE.md Rules 1–2).
 */
const seedDemoProperties = () => process.env.SEED_DEMO_PROPERTIES !== "false";

/** `ifNew`: skip silently if the id exists (makes sample loading safe to repeat). */
async function insertProperty(p: Property, ifNew = false): Promise<void> {
  const db = await getDb();
  await db.query(
    `insert into properties (id, data, status, created_at, updated_at)
     values ($1, $2::text::jsonb, $3, $4, $5)${ifNew ? " on conflict (id) do nothing" : ""}`,
    [p.id, JSON.stringify(p), p.status, p.createdAt, p.updatedAt],
  );
}

/**
 * Database-backed provider. The property volume of a single agency is
 * small (hundreds at most), so records are read whole and the existing,
 * tested filter and sort logic above runs unchanged on them.
 */
class DbPropertyProvider implements PropertyProvider {
  private async all(): Promise<Property[]> {
    const db = await getDb();
    let rows = await db.query<Row>("select data from properties");
    if (rows.length === 0 && seedDemoProperties()) {
      // Two first visitors may both get here; "on conflict do nothing"
      // makes the second load a harmless no-op.
      for (const p of demoProperties) await insertProperty(p, true);
      rows = await db.query<Row>("select data from properties");
    }
    return rows.map(parse);
  }

  async list(params: PropertyListParams): Promise<PropertyListResult> {
    const page = Math.max(1, params.page ?? 1);
    const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;

    let scoped = await this.all();
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
    await this.all(); // makes sure sample listings are loaded on first use
    const db = await getDb();
    const rows = await db.query<Row>("select data from properties where id = $1", [id]);
    return rows[0] ? parse(rows[0]) : null;
  }

  async create(input: Property, actor: string): Promise<Property> {
    await this.all();
    await insertProperty(input);
    await recordAuditEvent({
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
    const before = await this.getById(id);
    if (!before) throw new Error(`Property ${id} not found`);
    const updated: Property = {
      ...before,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    const db = await getDb();
    await db.query(
      "update properties set data = $2::text::jsonb, status = $3, updated_at = $4 where id = $1",
      [id, JSON.stringify(updated), updated.status, updated.updatedAt],
    );
    if (patch.status && patch.status !== before.status) {
      await recordAuditEvent({
        actor,
        action: "status_change",
        propertyId: id,
        details: `${before.status} -> ${patch.status}`,
      });
    } else {
      await recordAuditEvent({
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
 * Single shared instance. A CRM feed (see /INTEGRATIONS.md) would add
 * records through this same interface; every caller already goes through
 * it only.
 */
export const propertyProvider: PropertyProvider = new DbPropertyProvider();
