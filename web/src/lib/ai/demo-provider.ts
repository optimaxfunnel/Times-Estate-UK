import type { AIMessage, AIProvider, AIResponse } from "@/lib/ai/provider";
import { checkRefusal } from "@/lib/ai/refusals";
import { searchKnowledgeBase } from "@/lib/ai/knowledge-base";
import { propertyProvider } from "@/lib/property/provider";
import { formatPriceLabel } from "@/lib/property/format";
import { toPublicProperty } from "@/lib/property/types";

/**
 * Phrases typical of prompt-injection or data-extraction attempts. The
 * demonstration assistant has no hidden prompt or tools to leak, but a
 * future live model will — so the pattern is enforced now, before any
 * provider is connected, and tested.
 */
const INJECTION =
  /ignore (all |any |the )?(previous|prior|above) (instructions|rules)|you are now|act as (an? )?(admin|administrator|developer|system)|system prompt|reveal (your )?(instructions|prompt|rules)|developer mode|jailbreak|list (all )?(leads|enquiries|tenants|users|customers)|show (me )?(all )?(leads|enquiries|private address)|internal notes|private address/i;

/** Points a refusal at the page where the visitor can get the real thing from a person. */
function sourcesForRefusal(text: string) {
  if (/Sell or Let/.test(text))
    return [
      { href: "/sell", label: "Book a valuation (sales)" },
      { href: "/let", label: "Book a valuation (lettings)" },
    ];
  if (/Report a Repair/.test(text))
    return [{ href: "/report-a-repair", label: "Report a Repair" }];
  if (/viewing or callback/.test(text))
    return [{ href: "/callback", label: "Request a callback" }];
  return [];
}

export function looksLikeInjection(query: string): boolean {
  return INJECTION.test(query);
}

const GREETING =
  "Hello — I'm the Times Estate Ltd AI assistant (demonstration mode). I can help you find a page, search for a property, or start a callback/viewing request. I can't give legal, financial or valuation advice, and everything I suggest is reviewed by a person before anything is sent.";

const FALLBACK =
  "I'm not sure about that from what I've been given access to. I can help with property search, valuations, viewings, repairs or general enquiries — or I can point you to a member of the team.";

async function tryPropertyLookup(query: string): Promise<AIResponse | null> {
  const lower = query.toLowerCase();
  const wantsSale = /\bsale|buy|buying\b/.test(lower);
  const wantsLetting = /\brent|renting|let\b/.test(lower);
  if (!wantsSale && !wantsLetting && !lower.includes("propert")) return null;
  if (
    !lower.includes("available") &&
    !lower.includes("what") &&
    !lower.includes("show")
  )
    return null;

  const result = await propertyProvider.list({
    filter: {
      category: "residential",
      listingType: wantsLetting ? "letting" : "sale",
      // Only listings actually on the market — never under offer, let
      // agreed, or anything not publicly approved.
      statuses: ["available"],
    },
    pageSize: 3,
    sort: "newest",
  });

  if (result.items.length === 0) {
    return {
      content:
        "I don't have any genuinely available properties matching that right now — you can register your requirements and we'll contact you when something suitable comes up.",
      sources: [{ href: "/register", label: "Register your requirements" }],
      suggestsHumanFollowUp: true,
    };
  }

  const list = result.items
    .map((p) => {
      const pub = toPublicProperty(p);
      return `${pub.displayAddress} — ${formatPriceLabel(pub)} (sample data — /property/${pub.id})`;
    })
    .join("; ");

  return {
    content: `Here are up to three currently available properties (demonstration data — not real instructions): ${list}`,
    sources: result.items.map((p) => ({
      href: `/property/${p.id}`,
      label: p.displayAddress,
    })),
    suggestsHumanFollowUp: false,
  };
}

export class DemoAIProvider implements AIProvider {
  readonly name =
    "Demonstration (rule-based, no external AI service connected)";
  readonly isLiveProvider = false;

  async respond(messages: AIMessage[]): Promise<AIResponse> {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    if (!lastUserMessage) {
      return { content: GREETING, sources: [], suggestsHumanFollowUp: false };
    }

    const query = lastUserMessage.content.trim();

    // Refusals are checked first and unconditionally — nothing below can
    // override this, including text in the message asking the assistant
    // to ignore its rules (see /lib/ai/refusals.ts).
    const refusal = checkRefusal(query);
    if (refusal) {
      return {
        content: refusal,
        sources: sourcesForRefusal(refusal),
        suggestsHumanFollowUp: true,
      };
    }

    // Then: attempts to change the assistant's rules or extract internal data
    // get one fixed answer; the request itself is never acted on.
    if (looksLikeInjection(query)) {
      return {
        content:
          "I can't change how I work or share internal or private information. I can help you search properties, find a page, or start a callback or viewing request.",
        sources: [{ href: "/contact", label: "Contact Us" }],
        suggestsHumanFollowUp: false,
      };
    }

    const propertyAnswer = await tryPropertyLookup(query);
    if (propertyAnswer) return propertyAnswer;

    const knowledge = searchKnowledgeBase(query);
    if (knowledge) {
      return {
        content: knowledge.answer,
        sources: [{ href: knowledge.sourceHref, label: knowledge.sourceLabel }],
        suggestsHumanFollowUp: true,
      };
    }

    return {
      content: FALLBACK,
      sources: [{ href: "/contact", label: "Contact Us" }],
      suggestsHumanFollowUp: true,
    };
  }
}

export const aiProvider: AIProvider = new DemoAIProvider();
export const AI_GREETING = GREETING;
