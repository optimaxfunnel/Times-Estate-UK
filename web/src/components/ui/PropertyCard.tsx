import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PublicProperty } from "@/lib/property/types";
import {
  describeProperty,
  formatPriceParts,
  formatStatusLabel,
} from "@/lib/property/format";
import { FavouriteButton } from "@/components/property/FavouriteButton";
import { PropertyImagePlaceholder } from "@/components/property/PropertyImagePlaceholder";
import { IconArea, IconBath, IconBed, IconSofa } from "@/components/icons";

/**
 * Listing card to the owner's 2026-10-20 reference: image with a
 * listing-type ribbon and a heart, then price, description, address and
 * a row of key figures. `variant="list"` lays the same card out
 * horizontally for the results toolbar's list view.
 *
 * Two labels the reference doesn't have are deliberate: the "Sample
 * property — not real" ribbon (Rule 2 — every listing today is
 * demonstration data) and the marketing-status chip ("Under offer",
 * "Let agreed"), which a buyer or tenant needs before they enquire.
 */
export function PropertyCard({
  property,
  variant = "grid",
  className,
}: {
  property: PublicProperty;
  variant?: "grid" | "list";
  className?: string;
}) {
  const href = `/property/${property.id}`;
  const price = formatPriceParts(property);
  const listingLabel = property.commercial
    ? "Commercial"
    : property.listingType === "sale"
      ? "For Sale"
      : "To Let";
  const isList = variant === "list";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-sm border border-border bg-surface shadow-sm transition-shadow hover:shadow-md",
        isList && "sm:flex",
        className,
      )}
    >
      {/* The image is a second route to the same page as the address link
          below. Hidden from assistive tech so a screen-reader user hears
          one well-named link per card, not a duplicate named after the
          ribbons' text. */}
      <Link
        href={href}
        aria-hidden="true"
        tabIndex={-1}
        className={cn(
          "relative block aspect-[4/3] overflow-hidden",
          isList && "sm:aspect-auto sm:w-64 sm:shrink-0",
        )}
      >
        <PropertyImagePlaceholder property={property} caption={false} />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-sm px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white",
            property.commercial ? "bg-ink" : "bg-accent",
          )}
        >
          {listingLabel}
        </span>
        {property.isDemo && (
          <span className="absolute bottom-2 left-2 rounded-sm bg-warning px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
            Sample property — not real
          </span>
        )}
      </Link>

      <FavouriteButton
        propertyId={property.id}
        variant="icon"
        className="absolute right-3 top-3"
      />

      <div className={cn("p-4", isList && "sm:flex-1")}>
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          {price.qualifier && !price.qualifierAfter && (
            <span className="text-xs font-medium text-ink/60">
              {price.qualifier}
            </span>
          )}
          <span className="text-lg font-bold tracking-tight text-ink">
            {price.amount}
          </span>
          {price.qualifier && price.qualifierAfter && (
            <span className="text-sm font-semibold text-ink/70">
              {price.qualifier}
            </span>
          )}
        </p>
        <p className="mt-0.5 text-sm font-medium text-ink">
          {describeProperty(property)}
        </p>
        <h3 className="mt-0.5 font-sans text-sm font-normal text-ink/70">
          <Link href={href} className="hover:text-accent">
            <span>{property.displayAddress}</span>{" "}
            <span className="whitespace-nowrap">{property.postcode}</span>
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-ink/70">
          {property.residential && (
            <>
              <span className="inline-flex items-center gap-1.5">
                <IconBed className="h-4 w-4 text-secondary" />
                {property.residential.bedrooms}
                <span className="sr-only"> bedrooms</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconBath className="h-4 w-4 text-secondary" />
                {property.residential.bathrooms}
                <span className="sr-only"> bathrooms</span>
              </span>
              {property.residential.receptionRooms !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <IconSofa className="h-4 w-4 text-secondary" />
                  {property.residential.receptionRooms}
                  <span className="sr-only"> reception rooms</span>
                </span>
              )}
            </>
          )}
          {property.commercial && (
            <span className="inline-flex items-center gap-1.5">
              <IconArea className="h-4 w-4 text-secondary" />
              {property.commercial.floorAreaSqFt.toLocaleString("en-GB")} sq ft
            </span>
          )}
          {property.status !== "available" && (
            <span className="ml-auto rounded-sm bg-warning px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
              {formatStatusLabel(property.status)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
