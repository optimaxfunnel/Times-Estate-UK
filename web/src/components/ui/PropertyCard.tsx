import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PublicProperty } from "@/lib/property/types";
import {
  formatPriceLabel,
  formatStatusLabel,
  summariseBedsAndBaths,
  summariseFloorArea,
} from "@/lib/property/format";
import { FavouriteButton } from "@/components/property/FavouriteButton";

const STATUS_TONE: Record<string, string> = {
  available: "bg-success text-white",
  under_offer: "bg-warning text-white",
  sold_stc: "bg-warning text-white",
  let_agreed: "bg-warning text-white",
};

export function PropertyCard({
  property,
  className,
}: {
  property: PublicProperty;
  className?: string;
}) {
  const secondaryLine =
    summariseBedsAndBaths(property) ?? summariseFloorArea(property);
  const transactionLabel =
    property.listingType === "sale" ? "For Sale" : "To Let";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-sm border border-border bg-surface",
        className,
      )}
    >
      {property.isDemo && (
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-warning px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
          Sample property — not real
        </span>
      )}
      <span
        className={cn(
          "absolute right-3 top-3 z-10 rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
          STATUS_TONE[property.status] ?? "bg-secondary text-white",
        )}
      >
        {formatStatusLabel(property.status)}
      </span>

      <Link href={`/property/${property.id}`} className="block">
        <div
          aria-hidden="true"
          className="flex h-44 items-center justify-center bg-secondary/10 text-xs text-secondary"
        >
          Photograph not yet supplied
        </div>
        <div className="space-y-1 p-4 pb-2">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            {transactionLabel}
          </p>
          <h3 className="text-base font-semibold text-ink">
            {property.displayAddress}
          </h3>
          {secondaryLine && (
            <p className="text-sm text-ink/70">{secondaryLine}</p>
          )}
          <p className="text-lg font-semibold text-ink">
            {formatPriceLabel(property)}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 pb-4">
        <Link
          href={`/property/${property.id}`}
          className="-m-2 inline-flex min-h-6 items-center p-2 text-sm font-medium text-accent underline underline-offset-4"
        >
          View details
        </Link>
        <FavouriteButton propertyId={property.id} />
      </div>
    </article>
  );
}
