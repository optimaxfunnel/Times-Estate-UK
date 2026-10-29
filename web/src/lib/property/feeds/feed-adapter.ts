import { propertySchema } from "@/lib/property/schema";
import type { Property } from "@/lib/property/types";

/**
 * Boundary for a future, AUTHORISED property feed from a CRM (Reapit,
 * Alto, Dezrez, Jupix, Street, SME Professional or another confirmed
 * provider). No feed is connected: Times Estate Ltd has not confirmed a
 * CRM or portal agreement, and no credentials exist (INTEGRATIONS.md).
 *
 * Shape of a connection, so adding a provider later is one new adapter
 * and nothing else:
 *
 *   CRM  --(adapter.fetchListings)-->  raw records
 *        --(adapter.toProperty)----->  candidate Property
 *        --(importListings)--------->  validated against propertySchema,
 *                                       forced into a non-public state,
 *                                       private fields kept private
 *
 * Rules enforced here, not left to each adapter:
 *  1. Every imported record is validated; invalid ones are reported,
 *     never half-imported.
 *  2. Nothing imported is published automatically. Imports arrive as
 *     "awaiting_approval" unless the owner later approves the CRM as the
 *     source of truth for status (a recorded decision, not a default).
 *  3. Imported records are never demo data and never "verified" until a
 *     person checks them.
 *  4. Portals (Rightmove, Zoopla, OnTheMarket) are publication targets,
 *     not sources: this boundary never scrapes or reads from them.
 */
export interface FeedAdapter<Raw = unknown> {
  /** Stable id, e.g. "reapit". */
  readonly id: string;
  /** Human name for admin screens and logs. */
  readonly name: string;
  /** True only when the agreement, credentials and owner approval are all in place. */
  isConfigured(): boolean;
  /** Read listings from the provider (read-only; this site never writes back). */
  fetchListings(): Promise<Raw[]>;
  /** Map one provider record onto the site's model. Must not invent missing values. */
  toProperty(raw: Raw): Partial<Property> & { id: string };
}

export interface ImportReport {
  adapter: string;
  accepted: Property[];
  rejected: { id: string; reasons: string[] }[];
}

export class FeedNotConfiguredError extends Error {
  constructor(adapter: string) {
    super(
      `${adapter} is not connected: no agreement, credentials or owner approval are recorded (INTEGRATIONS.md).`,
    );
    this.name = "FeedNotConfiguredError";
  }
}

/**
 * Validates and normalises a batch from any adapter. Pure apart from the
 * adapter's own fetch, so it can be tested with a fake adapter and no
 * network.
 */
export async function importListings(
  adapter: FeedAdapter,
  now: Date = new Date(),
): Promise<ImportReport> {
  if (!adapter.isConfigured()) throw new FeedNotConfiguredError(adapter.name);

  const report: ImportReport = {
    adapter: adapter.id,
    accepted: [],
    rejected: [],
  };
  for (const raw of await adapter.fetchListings()) {
    let candidate: Partial<Property> & { id: string };
    try {
      candidate = adapter.toProperty(raw);
    } catch (err) {
      report.rejected.push({
        id: "unknown",
        reasons: [`Could not map record: ${(err as Error).message}`],
      });
      continue;
    }
    const parsed = propertySchema.safeParse(candidate);
    if (!parsed.success) {
      report.rejected.push({
        id: candidate.id,
        reasons: parsed.error.issues.map(
          (i) => `${i.path.join(".") || "record"}: ${i.message}`,
        ),
      });
      continue;
    }
    const timestamp = now.toISOString();
    report.accepted.push({
      ...(parsed.data as unknown as Property),
      id: `${adapter.id}-${candidate.id}`,
      media: candidate.media ?? { images: [], floorPlans: [] },
      coordinates: candidate.coordinates,
      status: "awaiting_approval",
      verification: "unverified",
      isDemo: false,
      createdAt: candidate.createdAt ?? timestamp,
      updatedAt: timestamp,
    });
  }
  return report;
}

/**
 * Placeholder for each provider named in the brief. Each reports itself
 * as not configured and refuses to fetch, so nothing can be called by
 * accident. Replacing one with a real implementation requires the
 * owner's written approval, a signed agreement and credentials held in
 * environment variables (never in code).
 */
function unconfigured(id: string, name: string): FeedAdapter {
  return {
    id,
    name,
    isConfigured: () => false,
    fetchListings: async () => {
      throw new FeedNotConfiguredError(name);
    },
    toProperty: () => {
      throw new FeedNotConfiguredError(name);
    },
  };
}

export const FEED_ADAPTERS: readonly FeedAdapter[] = [
  unconfigured("reapit", "Reapit Foundations"),
  unconfigured("alto", "Alto (Zoopla)"),
  unconfigured("dezrez", "Dezrez Rezi"),
  unconfigured("jupix", "Jupix"),
  unconfigured("street", "Street.co.uk"),
  unconfigured("sme", "SME Professional"),
];
