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

  phone: {
    value: null,
    status: "missing",
  } satisfies VerifiedFact<string | null>,

  email: {
    value: null,
    status: "missing",
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

/**
 * Matches the navigation approved in /SITEMAP.md exactly: Sell · Let ·
 * Buy · Rent · Commercial · Property Management · About · Contact. The
 * standalone "Residential" hub page built on Day 3 (before Buy/Rent
 * search existed) is kept for cross-linking from Sell/Let, but is no
 * longer in the primary nav, so the approved structure isn't exceeded.
 */
export const primaryNav = [
  { label: "Sell", href: "/sell" },
  { label: "Let", href: "/let" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Commercial", href: "/commercial" },
  { label: "Property Management", href: "/property-management" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

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
