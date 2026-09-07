/**
 * The property data model. See /DATA_MODEL.md at the repository root for
 * the plain-language explanation of every field, including which are
 * mandatory/optional, public/private, and verified/unverified.
 *
 * IMPORTANT: `Property` is the full internal record. `PublicProperty` is
 * everything that may ever reach a public page. Converting one to the
 * other happens only via `toPublicProperty()`, which physically removes
 * the private fields rather than just hiding them — a public page cannot
 * receive a `Property`, only a `PublicProperty`, so a private field can
 * never leak through a rendering mistake.
 */

export type ListingType = "sale" | "letting";
export type PropertyCategory = "residential" | "commercial";

export const PROPERTY_STATUSES = [
  "draft",
  "awaiting_approval",
  "available",
  "under_offer",
  "sold_stc",
  "sold",
  "let_agreed",
  "let",
  "withdrawn",
  "archived",
] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

/**
 * Assumption pending owner confirmation (see /DATA_MODEL.md): only these
 * statuses ever appear in public search or on a public detail page.
 */
export const PUBLICLY_VISIBLE_STATUSES: readonly PropertyStatus[] = [
  "available",
  "under_offer",
  "sold_stc",
  "let_agreed",
];

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  draft: "Draft",
  awaiting_approval: "Awaiting approval",
  available: "Available",
  under_offer: "Under offer",
  sold_stc: "Sold subject to contract",
  sold: "Sold",
  let_agreed: "Let agreed",
  let: "Let",
  withdrawn: "Withdrawn",
  archived: "Archived",
};

export type PriceQualifier =
  | "guide_price"
  | "offers_in_excess_of"
  | "offers_in_region_of"
  | "fixed_price"
  | "poa"
  | "per_calendar_month"
  | "per_annum"
  | "per_sq_ft_per_annum";

export const PRICE_QUALIFIER_LABELS: Record<PriceQualifier, string> = {
  guide_price: "Guide Price",
  offers_in_excess_of: "Offers in Excess of",
  offers_in_region_of: "Offers in the Region of",
  fixed_price: "Fixed Price",
  poa: "POA",
  per_calendar_month: "pcm",
  per_annum: "per annum",
  per_sq_ft_per_annum: "per sq ft per annum",
};

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PropertyImage {
  url: string;
  alt: string;
}

export interface PropertyMedia {
  images: PropertyImage[];
  floorPlans: PropertyImage[];
  brochureUrl?: string;
  virtualTourUrl?: string;
}

export const RESIDENTIAL_PROPERTY_TYPES = [
  "flat",
  "terraced_house",
  "semi_detached_house",
  "detached_house",
  "bungalow",
  "maisonette",
  "studio",
  "other",
] as const;
export type ResidentialPropertyType =
  (typeof RESIDENTIAL_PROPERTY_TYPES)[number];

export const RESIDENTIAL_PROPERTY_TYPE_LABELS: Record<
  ResidentialPropertyType,
  string
> = {
  flat: "Flat",
  terraced_house: "Terraced House",
  semi_detached_house: "Semi-Detached House",
  detached_house: "Detached House",
  bungalow: "Bungalow",
  maisonette: "Maisonette",
  studio: "Studio",
  other: "Other",
};

export type Tenure =
  "freehold" | "leasehold" | "share_of_freehold" | "commonhold";
export type EpcRating = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "exempt";
export type Furnishing = "furnished" | "unfurnished" | "part_furnished";
export type ChainStatus = "no_chain" | "chain_free_seller" | "in_a_chain";

export interface ResidentialDetails {
  propertyType: ResidentialPropertyType;
  bedrooms: number;
  bathrooms: number;
  receptionRooms?: number;
  tenure?: Tenure;
  councilTaxBand?: string;
  epcRating?: EpcRating;
  deposit?: number;
  furnishing?: Furnishing;
  availableFrom?: string; // ISO date
  leaseLengthYears?: number;
  serviceCharge?: number;
  groundRent?: number;
  chainStatus?: ChainStatus;
}

export const COMMERCIAL_USES = [
  "office",
  "retail",
  "industrial",
  "leisure",
  "land",
  "mixed_use",
  "other",
] as const;
export type CommercialUse = (typeof COMMERCIAL_USES)[number];

export const COMMERCIAL_USE_LABELS: Record<CommercialUse, string> = {
  office: "Office",
  retail: "Retail",
  industrial: "Industrial",
  leisure: "Leisure",
  land: "Land",
  mixed_use: "Mixed Use",
  other: "Other",
};

export type VatPosition = "vat_applicable" | "vat_not_applicable" | "tbc";

export interface VerifiedFigure {
  value: number;
  verified: boolean;
}

export interface CommercialDetails {
  commercialUse: CommercialUse;
  useClass?: string;
  floorAreaSqFt: number;
  units?: number;
  tenure?: Tenure;
  rentPerAnnum?: number;
  businessRatesPayable?: number;
  serviceChargePerAnnum?: number;
  vatPosition?: VatPosition;
  leaseTermsSummary?: string;
  possessionDate?: string; // ISO date
  /** Never shown publicly unless `verified` is true — see /DATA_MODEL.md. */
  investmentYieldPercent?: VerifiedFigure;
}

/** The full internal record. Never send this object to a public page. */
export interface Property {
  // Internal / private
  id: string;
  privateAddress: string;
  internalNotes?: string;
  assignedStaffMemberId?: string;
  createdAt: string;
  updatedAt: string;
  verification: "verified" | "unverified";

  // Public
  displayAddress: string;
  postcode: string;
  coordinates?: Coordinates;
  listingType: ListingType;
  category: PropertyCategory;
  price?: number;
  priceQualifier: PriceQualifier;
  status: PropertyStatus;
  summary: string;
  description: string;
  features: string[];
  media: PropertyMedia;
  branch?: string;

  /** True for every property in the system today — see /DATA_MODEL.md. */
  isDemo: boolean;

  residential?: ResidentialDetails;
  commercial?: CommercialDetails;
}

/**
 * Everything on `Property` except the fields marked Private in
 * /DATA_MODEL.md. This is the only shape ever passed to a public page.
 */
export type PublicProperty = Omit<
  Property,
  "privateAddress" | "internalNotes" | "assignedStaffMemberId"
>;

export function toPublicProperty(property: Property): PublicProperty {
  const {
    privateAddress: _privateAddress,
    internalNotes: _internalNotes,
    assignedStaffMemberId: _assignedStaffMemberId,
    ...publicFields
  } = property;
  return publicFields;
}

/** Strips an unverified investment yield before a property is shown publicly. */
export function toPublicCommercialDetails(
  details: CommercialDetails | undefined,
): CommercialDetails | undefined {
  if (!details) return details;
  if (
    details.investmentYieldPercent &&
    !details.investmentYieldPercent.verified
  ) {
    const { investmentYieldPercent: _omitted, ...rest } = details;
    return rest;
  }
  return details;
}
