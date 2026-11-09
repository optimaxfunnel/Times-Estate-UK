/**
 * Every unresolved content item on the public site, for staff at
 * /admin/content. Mirrors the "Placeholder" and "Requires legal or
 * professional review" rows of /CONTENT_VERIFICATION_REGISTER.md — update
 * both together. Nothing here is shown to the public.
 */
export type GapStatus =
  | "Placeholder"
  | "Requires legal or professional review"
  | "Supplied by the business owner";

export interface ContentGap {
  item: string;
  location: string;
  status: GapStatus;
  action: string;
  /** True when the site should not launch until this is resolved. */
  blocksLaunch: boolean;
}

export const contentGaps: readonly ContentGap[] = [
  { item: "Tenant permitted payments, deposit level and deposit protection scheme", location: "/fees, /buyers", status: "Placeholder", action: "Owner to supply; agents must publish fees on their website", blocksLaunch: true },
  { item: "Landlord letting and management fees", location: "/fees, /let, /landlords", status: "Placeholder", action: "Owner to supply fee schedule (incl. VAT)", blocksLaunch: true },
  { item: "Sales commission", location: "/fees, /sell", status: "Placeholder", action: "Owner to supply", blocksLaunch: false },
  { item: "VAT registration and whether fees include VAT", location: "/fees", status: "Placeholder", action: "Owner / accountant to confirm", blocksLaunch: true },
  { item: "Redress scheme and Client Money Protection membership", location: "/why-choose-us, footer", status: "Supplied by the business owner", action: "Confirm with each scheme directly, then mark Verified", blocksLaunch: true },
  { item: "Cookie Policy table out of date (found 2026-11-09)", location: "/cookie-policy", status: "Requires legal or professional review", action: "Replace the old 'dev_mock_role' cookie name; add saved searches and 'intro seen' storage. Part of the solicitor review.", blocksLaunch: false },
  { item: "Professional indemnity insurance schedule", location: "/why-choose-us", status: "Supplied by the business owner", action: "Owner to supply the policy schedule (only the wording was supplied)", blocksLaunch: false },
  { item: "Opening hours", location: "/contact", status: "Placeholder", action: "Owner to supply", blocksLaunch: false },
  { item: "Complaints acknowledgement and response times", location: "/complaints", status: "Requires legal or professional review", action: "Owner to set timescales consistent with the redress scheme's rules", blocksLaunch: true },
  { item: "Repair response times and out-of-hours process", location: "/report-a-repair, /buyers", status: "Placeholder", action: "Owner to supply the real process", blocksLaunch: false },
  { item: "Emergency guidance wording", location: "/report-a-repair", status: "Requires legal or professional review", action: "Professional review", blocksLaunch: true },
  { item: "Privacy policy, cookie policy, terms (drafts)", location: "/privacy-policy, /cookie-policy, /terms", status: "Requires legal or professional review", action: "Solicitor review; retention periods to decide", blocksLaunch: true },
  { item: "Renters' Rights Act 2025 guidance for landlords", location: "/landlords", status: "Requires legal or professional review", action: "Solicitor to review before publishing", blocksLaunch: false },
  { item: "Areas covered beyond SW17", location: "/about, /areas", status: "Placeholder", action: "Owner to confirm areas served", blocksLaunch: false },
  { item: "Commercial sectors covered", location: "/commercial", status: "Placeholder", action: "Owner to confirm", blocksLaunch: false },
  { item: "Team, history, reviews and track record", location: "/about, /why-choose-us", status: "Placeholder", action: "Only with evidence and consent", blocksLaunch: false },
  { item: "\"London Property Experts\" tagline", location: "Logo, header, homepage", status: "Supplied by the business owner", action: "Owner to confirm the coverage it implies", blocksLaunch: false },
];
