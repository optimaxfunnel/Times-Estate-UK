import type { AIMessage, AIProvider, AIResponse } from "@/lib/ai/provider";
import { checkRefusal } from "@/lib/ai/refusals";
import { searchKnowledgeBase } from "@/lib/ai/knowledge-base";
import { propertyProvider } from "@/lib/property/provider";
import { formatPriceLabel } from "@/lib/property/format";
import { toPublicProperty } from "@/lib/property/types";

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
      return { content: refusal, sources: [], suggestsHumanFollowUp: true };
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
