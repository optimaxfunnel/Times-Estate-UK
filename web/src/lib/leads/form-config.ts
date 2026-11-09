import type { LeadCategory } from "@/lib/leads/types";

/**
 * Which extra fields each lead form must have, decided on the server.
 *
 * These used to be bound into the server action from the page
 * (`submitLeadForm.bind(null, category, sourcePage, fields)`). A bound
 * action is re-created on every render, and when a form is posted before
 * the page's JavaScript has loaded, React's server renderer waited on each
 * new binding in turn and never finished — pinning the CPU and taking the
 * whole site offline (the "server-hang" defect, TEST_REPORT.md, Day 7).
 * The action is now unbound; the page sends only the category and source
 * page as plain fields, and the rules stay here where a visitor can't
 * change them. Each category is used by exactly one form; keep this in
 * step with the `required: true` fields on that page (a test checks the
 * pages against it).
 */
export const REQUIRED_FIELDS_BY_CATEGORY: Partial<
  Record<LeadCategory, readonly string[]>
> = {
  sales_valuation: ["propertyAddress"],
  rental_valuation: ["propertyAddress", "currentlyTenanted"],
  commercial_sales_valuation: ["propertyAddress"],
  commercial_rental_valuation: ["propertyAddress"],
  commercial_enquiry: ["requirement"],
  management_enquiry: ["propertyAddress", "currentArrangement"],
  viewing_request: ["preferredDate1", "preferredTime1", "qualification"],
  callback_request: ["bestTimeToCall"],
  general_enquiry: ["message"],
  landlord_vendor_enquiry: ["enquirerType", "message"],
  buyer_registration: ["preferredAreas", "budget"],
  tenant_registration: ["preferredAreas", "budget"],
};

/** Hidden fields the form sends alongside the visitor's answers. */
export const CATEGORY_FIELD = "leadCategory";
export const SOURCE_PAGE_FIELD = "sourcePage";

/**
 * Only categories handled by the general lead form are accepted here —
 * repair reports have their own action with upload checks, so a post
 * claiming "repair_report" is refused rather than let through.
 */
export function parseLeadCategory(value: unknown): LeadCategory | null {
  return typeof value === "string" &&
    Object.hasOwn(REQUIRED_FIELDS_BY_CATEGORY, value)
    ? (value as LeadCategory)
    : null;
}

/** Only a same-site path is accepted as the source page; anything else becomes "/". */
export function parseSourcePage(value: unknown): string {
  return typeof value === "string" && /^\/[A-Za-z0-9/_\-]{0,150}$/.test(value)
    ? value
    : "/";
}
