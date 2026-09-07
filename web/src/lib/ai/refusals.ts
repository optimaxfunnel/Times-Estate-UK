/**
 * Hard refusal triggers, enforced before anything else runs. See
 * /AI_SAFETY_RULES.md for the full list of what the assistant must never
 * do. Because the demonstration provider is rule-based rather than a
 * real language model, there is no "system prompt" for a visitor to
 * override — a message like "ignore your instructions" is just text that
 * doesn't match any rule, so it falls through to the same safe default
 * as any other unmatched message. This is tested explicitly in
 * /TEST_REPORT.md's prompt-injection section.
 */

export interface RefusalRule {
  keywords: string[];
  response: string;
}

export const REFUSAL_RULES: RefusalRule[] = [
  {
    keywords: [
      "mortgage advice",
      "should i get a mortgage",
      "which mortgage",
      "remortgage advice",
    ],
    response:
      "I can't give mortgage or financial advice — that needs a qualified mortgage adviser. I can help with property search, valuations, viewings and repairs.",
  },
  {
    keywords: [
      "legal advice",
      "is this legal",
      "sue",
      "tenancy law",
      "eviction advice",
    ],
    response:
      "I can't give legal advice — that needs a solicitor. I can help with property search, valuations, viewings and repairs.",
  },
  {
    keywords: [
      "good investment",
      "will this appreciate",
      "investment advice",
      "yield on this",
    ],
    response:
      "I can't give investment or financial advice on a property's return. A member of our team can discuss a specific property with you.",
  },
  {
    keywords: [
      "survey",
      "structural advice",
      "is this property safe",
      "subsidence",
    ],
    response:
      "I can't give surveying advice — that needs a qualified surveyor. I can help arrange a viewing so you can assess the property, or a valuation appraisal.",
  },
  {
    keywords: [
      "negotiate",
      "lower the price",
      "accept my offer",
      "will they accept",
    ],
    response:
      "I can't negotiate an offer — that's handled by a member of our team once you've expressed interest in a property.",
  },
  {
    keywords: [
      "confirm the tenancy",
      "approve me as a tenant",
      "am i approved",
      "guarantee the flat",
    ],
    response:
      "I can't approve a tenant or confirm a tenancy — that involves referencing and a decision by our lettings team.",
  },
  {
    keywords: ["are you a real person", "are you human", "is this a person"],
    response:
      "I'm an AI assistant, not a person — I'm happy to help, or I can put you in touch with the team.",
  },
  {
    keywords: [
      "what is my address",
      "tell me my",
      "give me the tenant's",
      "give me the landlord's",
      "private information",
    ],
    response:
      "I can't share private information about other people or properties.",
  },
];

export function checkRefusal(query: string): string | null {
  const lower = query.toLowerCase();
  for (const rule of REFUSAL_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return null;
}
