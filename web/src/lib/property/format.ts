import {
  PRICE_QUALIFIER_LABELS,
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
