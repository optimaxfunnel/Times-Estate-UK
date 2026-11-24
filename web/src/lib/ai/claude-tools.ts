/**
 * The only things the live AI assistant can do (AI_AGENT_PLAN.md §3, §A2).
 *
 * Every tool is READ-ONLY. None can send, submit, book, approve, price,
 * publish or delete anything, so even a successfully "tricked" model
 * has nothing dangerous to do. Listings are reduced to the public,
 * available fields a visitor could already see on the site; private
 * address, owner details and internal notes are never passed to the
 * model (toPublicProperty, plus the explicit field list below).
 *
 * Each tool result also reports the links it returned, so the output
 * guard can check that every property the model mentions is real.
 */
import type Anthropic from "@anthropic-ai/sdk";
import { propertyProvider } from "@/lib/property/provider";
import { formatPriceLabel } from "@/lib/property/format";
import { toPublicProperty, type Property } from "@/lib/property/types";
import { KNOWLEDGE_BASE } from "@/lib/ai/knowledge-base";
import type { AISource } from "@/lib/ai/provider";

/** Forms a visitor can be pointed to. The visitor fills in and sends the form themselves. */
export const FORM_LINKS = {
  sales_valuation: { href: "/sell", label: "Book a sales valuation" },
  lettings_valuation: { href: "/let", label: "Book a lettings valuation" },
  callback: { href: "/callback", label: "Request a callback" },
  repair: { href: "/report-a-repair", label: "Report a repair" },
  register: { href: "/register", label: "Register your requirements" },
  property_alert: { href: "/property-alerts", label: "Set up a property alert" },
  general: { href: "/contact", label: "Contact us" },
  complaint: { href: "/complaints", label: "Complaints" },
} as const satisfies Record<string, AISource>;
type FormKey = keyof typeof FORM_LINKS;

export const TOOL_DEFINITIONS: Anthropic.Tool[] = [
  {
    name: "search_listings",
    description:
      "Search Times Estate Ltd's listings that are currently available. Returns at most 5 listings with their public details and page link. Use it whenever a visitor asks what properties there are. Never describe a property that this tool did not return.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        category: { type: "string", enum: ["residential", "commercial"] },
        listingType: { type: "string", enum: ["sale", "letting"] },
        location: {
          type: ["string", "null"],
          description: "Area, street or postcode text to match, e.g. 'Tooting' or 'SW17'. null for anywhere.",
        },
        minBedrooms: { type: ["integer", "null"] },
        maxPrice: {
          type: ["integer", "null"],
          description: "Pounds. For lettings this is per calendar month.",
        },
      },
      required: ["category", "listingType", "location", "minBedrooms", "maxPrice"],
      additionalProperties: false,
    },
  },
  {
    name: "get_listing",
    description:
      "Get the public details of one available listing by its id (from search_listings), including its description and features.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "lookup_faq",
    description:
      "Look up Times Estate Ltd's approved answers about its services, valuations, viewings, repairs, registering, callbacks and contact. Each answer has the page it came from. Use it before answering any question about the company or how things work.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "A few words, e.g. 'report a repair' or 'landlord services'." },
      },
      required: ["topic"],
      additionalProperties: false,
    },
  },
  {
    name: "find_form",
    description:
      "Get the link to the form a visitor uses to take the next step. The visitor fills in and sends it themselves; you cannot submit anything.",
    strict: true,
    input_schema: {
      type: "object",
      properties: { form: { type: "string", enum: Object.keys(FORM_LINKS) } },
      required: ["form"],
      additionalProperties: false,
    },
  },
];

export interface ToolOutcome {
  /** JSON text returned to the model. */
  content: string;
  /** Links this result contains: the only links the reply may cite. */
  sources: AISource[];
  /** Listing ids this result contains: the only listings the reply may mention. */
  listingIds: string[];
  isError?: boolean;
}

/** The fields of a listing the model may see. Nothing private, no unverified yield. */
function listingSummary(p: Property, detail: boolean) {
  const pub = toPublicProperty(p);
  return {
    id: pub.id,
    link: `/property/${pub.id}`,
    sampleListing: pub.isDemo,
    category: pub.category,
    listingType: pub.listingType,
    status: pub.status,
    displayAddress: pub.displayAddress,
    price: formatPriceLabel(pub),
    propertyType: pub.residential?.propertyType ?? pub.commercial?.commercialUse ?? null,
    bedrooms: pub.residential?.bedrooms ?? null,
    bathrooms: pub.residential?.bathrooms ?? null,
    floorAreaSqFt: pub.commercial?.floorAreaSqFt ?? null,
    summary: pub.summary,
    ...(detail
      ? { description: pub.description, features: pub.features.slice(0, 12) }
      : {}),
  };
}

const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 80) : undefined);
const int = (v: unknown) =>
  typeof v === "number" && Number.isInteger(v) && v >= 0 && v < 1e9 ? v : undefined;

/** Runs one tool. Never throws: a failure becomes an error result the model can explain. */
export async function runTool(name: string, input: unknown): Promise<ToolOutcome> {
  const args = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  try {
    switch (name) {
      case "search_listings": {
        const category = args.category === "commercial" ? "commercial" : "residential";
        const listingType = args.listingType === "letting" ? "letting" : "sale";
        const result = await propertyProvider.list({
          filter: {
            category,
            listingType,
            location: str(args.location) || undefined,
            minBedrooms: int(args.minBedrooms),
            maxPrice: int(args.maxPrice),
            statuses: ["available"],
          },
          pageSize: 5,
          sort: "newest",
        });
        const items = result.items.map((p) => listingSummary(p, false));
        return {
          content: JSON.stringify({ totalMatching: result.total, listings: items }),
          sources: items.map((i) => ({ href: i.link, label: i.displayAddress })),
          listingIds: items.map((i) => i.id),
        };
      }
      case "get_listing": {
        const id = str(args.id) ?? "";
        const p = id ? await propertyProvider.getById(id) : null;
        // Only a listing the public can see and that is still available.
        if (!p || p.status !== "available") {
          return { content: JSON.stringify({ error: "No available listing with that id." }), sources: [], listingIds: [] };
        }
        const item = listingSummary(p, true);
        return {
          content: JSON.stringify(item),
          sources: [{ href: item.link, label: item.displayAddress }],
          listingIds: [item.id],
        };
      }
      case "lookup_faq": {
        const topic = (str(args.topic) ?? "").toLowerCase();
        const words = topic.split(/\W+/).filter((w) => w.length > 2);
        const matches = KNOWLEDGE_BASE.filter((e) =>
          e.keywords.some((kw) => topic.includes(kw) || words.some((w) => kw.includes(w))),
        ).slice(0, 3);
        return {
          content: JSON.stringify(
            matches.length
              ? matches.map((m) => ({ answer: m.answer, page: m.sourceHref }))
              : { result: "No approved answer on this topic. Say you don't know and offer the Contact page." },
          ),
          sources: matches.map((m) => ({ href: m.sourceHref, label: m.sourceLabel })),
          listingIds: [],
        };
      }
      case "find_form": {
        const key = (typeof args.form === "string" && args.form in FORM_LINKS ? args.form : "general") as FormKey;
        const link = FORM_LINKS[key];
        return { content: JSON.stringify({ page: link.href, name: link.label }), sources: [link], listingIds: [] };
      }
      default:
        return { content: JSON.stringify({ error: "Unknown tool." }), sources: [], listingIds: [], isError: true };
    }
  } catch {
    return {
      content: JSON.stringify({ error: "That information isn't available right now." }),
      sources: [],
      listingIds: [],
      isError: true,
    };
  }
}
