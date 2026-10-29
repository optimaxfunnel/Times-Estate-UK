/**
 * Machine-readable version of the field tables in /DATA_MODEL.md: for
 * every property field, whether it is mandatory, whether it may appear
 * on a public page, and how it is verified. Tests read this, so the
 * document and the code cannot drift apart silently.
 *
 * verification:
 *  - "system"      set by the software (ids, dates, flags) — nothing to verify
 *  - "as-supplied" entered by staff; shown as supplied
 *  - "must-verify" must be checked against a source document before a
 *                  real listing is published (EPC certificate, title
 *                  register, planning record, yield evidence)
 */
export type Verification = "system" | "as-supplied" | "must-verify";

export interface FieldRule {
  mandatory: boolean;
  visibility: "public" | "private";
  verification: Verification;
  note?: string;
}

const r = (
  mandatory: boolean,
  visibility: FieldRule["visibility"],
  verification: Verification,
  note?: string,
): FieldRule => ({ mandatory, visibility, verification, note });

export const COMMON_FIELD_RULES: Record<string, FieldRule> = {
  id: r(true, "private", "system", "Internal reference"),
  listingType: r(true, "public", "system"),
  category: r(true, "public", "system"),
  privateAddress: r(
    true,
    "private",
    "as-supplied",
    "Never sent to a public page",
  ),
  displayAddress: r(true, "public", "as-supplied"),
  postcode: r(true, "public", "as-supplied"),
  coordinates: r(false, "public", "as-supplied", "Approximate only on maps"),
  price: r(
    false,
    "public",
    "as-supplied",
    "Omitted for POA; for commercial sales this is the purchase price",
  ),
  priceQualifier: r(true, "public", "system"),
  status: r(
    true,
    "public",
    "system",
    "Only publicly visible statuses reach public pages",
  ),
  summary: r(true, "public", "as-supplied"),
  description: r(true, "public", "as-supplied"),
  features: r(false, "public", "as-supplied"),
  "media.images": r(
    false,
    "public",
    "as-supplied",
    "Required before a real listing goes live; licence recorded",
  ),
  "media.floorPlans": r(false, "public", "as-supplied"),
  "media.brochureUrl": r(false, "public", "as-supplied"),
  "media.virtualTourUrl": r(false, "public", "as-supplied"),
  branch: r(false, "public", "as-supplied"),
  assignedStaffMemberId: r(false, "private", "system"),
  internalNotes: r(false, "private", "as-supplied"),
  createdAt: r(
    true,
    "private",
    "system",
    "Used for sorting, never displayed raw",
  ),
  updatedAt: r(
    true,
    "private",
    "system",
    "Used for sorting, never displayed raw",
  ),
  verification: r(true, "private", "system", "Drives admin-only warnings"),
  isDemo: r(true, "public", "system", "Drives the Sample property label"),
};

export const RESIDENTIAL_FIELD_RULES: Record<string, FieldRule> = {
  propertyType: r(true, "public", "as-supplied"),
  bedrooms: r(true, "public", "as-supplied"),
  bathrooms: r(true, "public", "as-supplied"),
  receptionRooms: r(false, "public", "as-supplied"),
  tenure: r(false, "public", "must-verify", "Title register"),
  councilTaxBand: r(false, "public", "must-verify", "Council tax record"),
  epcRating: r(false, "public", "must-verify", "EPC register certificate"),
  deposit: r(
    false,
    "public",
    "as-supplied",
    "Lettings; capped by the Tenant Fees Act",
  ),
  furnishing: r(false, "public", "as-supplied", "Lettings"),
  availableFrom: r(false, "public", "as-supplied", "Lettings availability"),
  leaseLengthYears: r(false, "public", "must-verify", "Lease document"),
  serviceCharge: r(false, "public", "must-verify", "Managing agent statement"),
  groundRent: r(false, "public", "must-verify", "Lease document"),
  chainStatus: r(false, "public", "as-supplied", "Sales"),
};

export const COMMERCIAL_FIELD_RULES: Record<string, FieldRule> = {
  commercialUse: r(true, "public", "as-supplied"),
  floorAreaSqFt: r(true, "public", "must-verify", "Measured survey"),
  units: r(false, "public", "as-supplied"),
  tenure: r(false, "public", "must-verify", "Title register"),
  rentPerAnnum: r(false, "public", "as-supplied", "Lettings"),
  businessRatesPayable: r(
    false,
    "public",
    "must-verify",
    "Rating list; shown as indicative",
  ),
  serviceChargePerAnnum: r(false, "public", "as-supplied"),
  vatPosition: r(false, "public", "as-supplied"),
  leaseTermsSummary: r(false, "public", "as-supplied"),
  useClass: r(false, "public", "must-verify", "Planning record"),
  energyRating: r(false, "public", "must-verify", "Commercial EPC certificate"),
  possessionDate: r(false, "public", "as-supplied"),
  investmentYieldPercent: r(
    false,
    "public",
    "must-verify",
    "Shown only when its own verified flag is true",
  ),
};

/** Field names marked private in the common rules. */
export const PRIVATE_FIELDS = Object.entries(COMMON_FIELD_RULES)
  .filter(([, rule]) => rule.visibility === "private")
  .map(([name]) => name);
