import {
  COMMERCIAL_USE_LABELS,
  PRICE_QUALIFIER_LABELS,
  RESIDENTIAL_PROPERTY_TYPE_LABELS,
  STATUS_LABELS,
  type PublicProperty,
} from "@/lib/property/types";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function formatPriceLabel(property: PublicProperty): string {
  if (property.priceQualifier === "poa" || property.price === undefined) {
    return "POA";
  }
  const amount = currencyFormatter.format(property.price);
  const qualifier = PRICE_QUALIFIER_LABELS[property.priceQualifier];
  switch (property.priceQualifier) {
    case "per_calendar_month":
    case "per_annum":
    case "per_sq_ft_per_annum":
      return `${amount} ${qualifier}`;
    default:
      return `${qualifier} ${amount}`;
  }
}

/**
 * The same price, split for the card layout: a large amount with the
 * qualifier set small beside it ("£650,000" + "Guide Price", or
 * "£1,850" + "pcm"). `formatPriceLabel` above remains the single-string
 * form for running text and the detail page.
 */
export function formatPriceParts(property: PublicProperty): {
  amount: string;
  qualifier: string | null;
  qualifierAfter: boolean;
} {
  if (property.priceQualifier === "poa" || property.price === undefined) {
    return { amount: "POA", qualifier: null, qualifierAfter: false };
  }
  const amount = currencyFormatter.format(property.price);
  const qualifier = PRICE_QUALIFIER_LABELS[property.priceQualifier];
  switch (property.priceQualifier) {
    case "per_calendar_month":
    case "per_annum":
    case "per_sq_ft_per_annum":
      return { amount, qualifier, qualifierAfter: true };
    case "fixed_price":
      return { amount, qualifier: null, qualifierAfter: false };
    default:
      return { amount, qualifier, qualifierAfter: false };
  }
}

/** "3 bed terraced house", "2 bed flat", "Office — 1,100 sq ft". */
export function describeProperty(property: PublicProperty): string {
  if (property.residential) {
    const { bedrooms, propertyType } = property.residential;
    const type = RESIDENTIAL_PROPERTY_TYPE_LABELS[propertyType].toLowerCase();
    if (propertyType === "studio") return "Studio";
    return `${bedrooms} bed ${type}`;
  }
  if (property.commercial) {
    const { commercialUse, floorAreaSqFt } = property.commercial;
    return `${COMMERCIAL_USE_LABELS[commercialUse]} — ${floorAreaSqFt.toLocaleString("en-GB")} sq ft`;
  }
  return "";
}

export function formatStatusLabel(status: PublicProperty["status"]): string {
  return STATUS_LABELS[status];
}

export function summariseBedsAndBaths(property: PublicProperty): string | null {
  if (!property.residential) return null;
  const { bedrooms, bathrooms } = property.residential;
  return `${bedrooms} bed · ${bathrooms} bath`;
}

export function summariseFloorArea(property: PublicProperty): string | null {
  if (!property.commercial) return null;
  return `${property.commercial.floorAreaSqFt.toLocaleString("en-GB")} sq ft`;
}
