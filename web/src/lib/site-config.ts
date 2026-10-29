/**
 * Single source of truth for confirmed business facts used on the site.
 *
 * Every value here must trace back to a row in
 * /CONTENT_VERIFICATION_REGISTER.md at the repository root. Do not add a
 * fact here that isn't in that register — add it to the register first.
 *
 * `status` on each fact mirrors the status labels defined in the root
 * CLAUDE.md: "confirmed" | "supplied-by-owner" | "missing" |
 * "requires-verification" | "requires-professional-review".
 */

export type ContentStatus =
  | "confirmed"
  | "supplied-by-owner"
  | "missing"
  | "requires-verification"
  | "requires-professional-review";

export interface VerifiedFact<T> {
  value: T;
  status: ContentStatus;
}

export const siteConfig = {
  /**
   * Customer-facing brand name — use this everywhere in UI, navigation
   * and marketing copy. Previously "Times Estates" (a contraction adopted
   * in Phase 5), retired 2026-09-11 when the owner deliberately rebranded
   * again to a new "skyline" identity whose logo artwork itself spells out
   * the full legal name — so the display and legal names now coincide.
   * See DECISIONS.md (2026-09-11, "second rebrand") for the full account.
   * `legalName` below is kept as a separate field for any future case
   * where the two might need to differ again.
   */
  displayName: {
    value: "Times Estate Ltd",
    status: "confirmed",
  } satisfies VerifiedFact<string>,

  legalName: {
    value: "Times Estate Ltd",
    status: "confirmed",
  } satisfies VerifiedFact<string>,

  companiesHouseNumber: {
    value: "09597081",
    status: "confirmed",
  } satisfies VerifiedFact<string>,

  registeredOffice: {
    value: "145 Upper Tooting Road, London, SW17 7TJ",
    status: "confirmed",
  } satisfies VerifiedFact<string>,

  /**
   * The address printed on the owner's current business card. Kept
   * separate from registeredOffice rather than replacing it — a
   * trading address and a Companies House registered office are
   * legitimately allowed to differ. See DECISIONS.md (2026-09-09).
   */
  tradingAddress: {
    value: "127 Upper Tooting Road, London, SW17 7TJ",
    status: "supplied-by-owner",
  } satisfies VerifiedFact<string | null>,

  phoneLandline: {
    value: "0208 672 8080",
    status: "supplied-by-owner",
  } satisfies VerifiedFact<string | null>,

  phoneMobile: {
    value: "0777 999 1313",
    status: "supplied-by-owner",
  } satisfies VerifiedFact<string | null>,

  email: {
    value: "timesestatesuk@gmail.com",
    status: "supplied-by-owner",
  } satisfies VerifiedFact<string | null>,

  /**
   * A separate phone line for Construction/renovation services, shown on
   * the owner's business cards alongside the estate-agency numbers.
   * Construction is not a service this website covers (SITEMAP.md §14,
   * DECISIONS.md 2026-09-09) — this number exists only for the single
   * factual mention on /about and in the footer, never as its own page.
   */
  constructionPhone: {
    value: "0208 6738 555",
    status: "supplied-by-owner",
  } satisfies VerifiedFact<string | null>,

  openingHours: {
    value: null,
    status: "missing",
  } satisfies VerifiedFact<string | null>,

  redressScheme: {
    value: "Property Redress Scheme, Membership No. PRS030616",
    status: "requires-verification",
  } satisfies VerifiedFact<string>,

  clientMoneyProtection: {
    value: "Client Money Protect, Membership No. CMP013294",
    status: "requires-verification",
  } satisfies VerifiedFact<string>,

  professionalIndemnityInsurance: {
    value: "Folgate Insurance Company Limited / APC Underwriting",
    status: "requires-verification",
  } satisfies VerifiedFact<string>,
} as const;

/** The twelve service areas confirmed in BUSINESS_REQUIREMENTS.md. */
export const confirmedServices = [
  "Residential sales",
  "Residential lettings",
  "Residential property management",
  "Commercial sales",
  "Commercial lettings",
  "Commercial property management",
  "Valuation requests",
  "Viewing requests",
  "Repair reporting",
  "Property enquiries",
  "Controlled AI assistance",
  "Lead-management automation",
] as const;

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup extends NavLink {
  /** Dropdown entries. Every one points at a route that already exists. */
  children?: readonly NavLink[];
}

/**
 * Header navigation, regrouped 2026-10-20 to match the owner's reference
 * homepage (Home · Properties · Landlords · Tenants · Services · About ·
 * Contact, with dropdowns). This is a re-grouping of the SITEMAP.md
 * routes, not new pages: every destination below existed already, and
 * the flat Sell · Let · Buy · Rent · Commercial · Property Management ·
 * About · Contact list it replaces is still reachable one level down.
 * See DECISIONS.md (2026-10-20).
 */
export const headerNav: readonly NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    href: "/buy",
    children: [
      { label: "Property for sale", href: "/buy" },
      { label: "Property to rent", href: "/rent" },
      { label: "Commercial for sale", href: "/commercial/for-sale" },
      { label: "Commercial to let", href: "/commercial/to-let" },
      { label: "Property alerts", href: "/property-alerts" },
      { label: "Saved properties", href: "/favourites" },
    ],
  },
  {
    label: "Landlords",
    href: "/let",
    children: [
      { label: "Let your property", href: "/let" },
      { label: "Property management", href: "/property-management" },
      { label: "Landlords overview", href: "/landlords" },
      { label: "Commercial lettings", href: "/commercial" },
    ],
  },
  {
    label: "Tenants",
    href: "/rent",
    children: [
      { label: "Property to rent", href: "/rent" },
      { label: "Renting with us", href: "/buyers#tenants" },
      { label: "Report a repair", href: "/report-a-repair" },
      { label: "Property alerts", href: "/property-alerts" },
    ],
  },
  {
    label: "Services",
    href: "/residential",
    children: [
      { label: "Sell your home", href: "/sell" },
      { label: "Let your property", href: "/let" },
      { label: "Residential", href: "/residential" },
      { label: "Commercial", href: "/commercial" },
      { label: "Property management", href: "/property-management" },
      { label: "Buying with us", href: "/buyers" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About us", href: "/about" },
      { label: "Why choose us", href: "/why-choose-us" },
      { label: "Areas we cover", href: "/areas" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  Sellers: [{ label: "Sell your home", href: "/sell" }],
  Landlords: [
    { label: "Let your property", href: "/let" },
    { label: "Property management", href: "/property-management" },
  ],
  "Buyers & Tenants": [
    { label: "Property for sale", href: "/buy" },
    { label: "Property to rent", href: "/rent" },
    { label: "Property alerts", href: "/property-alerts" },
    { label: "Saved properties", href: "/favourites" },
  ],
  Commercial: [
    { label: "Commercial for sale", href: "/commercial/for-sale" },
    { label: "Commercial to let", href: "/commercial/to-let" },
  ],
  Company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Terms of Website Use", href: "/terms" },
    { label: "Complaints Handling Procedure", href: "/complaints" },
    { label: "Fee Information", href: "/fees" },
    { label: "Accessibility Statement", href: "/accessibility" },
  ],
} as const;
