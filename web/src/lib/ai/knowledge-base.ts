/**
 * Approved retrieval content for the AI assistant. Every entry links to a
 * real page already on this site — the assistant is not allowed to
 * answer from anything outside this list plus live property data (see
 * /AI_SAFETY_RULES.md, "Retrieval only from approved content").
 *
 * Adding a new FAQ here means adding real, confirmed content — never a
 * plausible-sounding guess, per CLAUDE.md Rule 1.
 */
export interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  sourceHref: string;
  sourceLabel: string;
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ["valuation", "value my", "worth", "appraisal", "sell my house", "sell my property"],
    answer:
      "We offer a free initial market appraisal — a member of our team visits your property and gives their opinion of price. We don't generate a valuation figure automatically.",
    sourceHref: "/sell",
    sourceLabel: "Book a Valuation",
  },
  {
    keywords: ["rent my", "let my property", "landlord", "rental valuation", "letting"],
    answer:
      "We offer a free rental appraisal for landlords, covering both let-only and full management options.",
    sourceHref: "/let",
    sourceLabel: "Request a Rental Appraisal",
  },
  {
    keywords: ["commercial"],
    answer: "We handle commercial sales, lettings and management, separately from our residential team.",
    sourceHref: "/commercial",
    sourceLabel: "Commercial services",
  },
  {
    keywords: ["repair", "broken", "leak", "not working", "fix"],
    answer:
      "If you're a managed tenant, you can report a repair directly — the page also shows emergency safety guidance.",
    sourceHref: "/report-a-repair",
    sourceLabel: "Report a Repair",
  },
  {
    keywords: ["client money", "protect", "cmp", "redress", "ombudsman", "regulated"],
    answer:
      "We hold Client Money Protection and redress scheme membership. Both are currently being independently verified — see the About page for the exact status of each.",
    sourceHref: "/about",
    sourceLabel: "About Us — regulatory information",
  },
  {
    keywords: ["buy", "for sale", "properties for sale", "looking to buy"],
    answer: "You can search current residential properties for sale.",
    sourceHref: "/buy",
    sourceLabel: "Search property for sale",
  },
  {
    keywords: ["rent a", "to rent", "properties to rent", "looking to rent"],
    answer: "You can search current residential properties to rent.",
    sourceHref: "/rent",
    sourceLabel: "Search property to rent",
  },
  {
    keywords: ["contact", "phone number", "email address", "speak to someone", "call you"],
    answer:
      "Our phone number and email address haven't been published on the site yet — the quickest way to reach us right now is the contact form, or request a callback.",
    sourceHref: "/contact",
    sourceLabel: "Contact Us",
  },
  {
    keywords: ["callback", "call me", "ring me"],
    answer: "You can request a callback and a member of the team will ring you.",
    sourceHref: "/callback",
    sourceLabel: "Request a Callback",
  },
  {
    keywords: ["register", "notify me", "alert", "let me know when"],
    answer: "You can register your requirements, or set up a property alert for a specific search.",
    sourceHref: "/register",
    sourceLabel: "Register your requirements",
  },
];

export function searchKnowledgeBase(query: string): KnowledgeEntry | null {
  const lower = query.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry;
    }
  }
  return null;
}
