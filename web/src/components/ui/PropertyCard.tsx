import { cn } from "@/lib/cn";

export interface PropertyCardProps {
  address: string;
  priceLabel: string;
  bedrooms: number;
  bathrooms: number;
  transactionType: "For Sale" | "To Let";
  /**
   * Every property card on the site today is demonstration data (no live
   * feed exists yet — see /CONTENT_REQUIRED.md). This must stay true and
   * visible until a real listings feed is connected and verified.
   */
  isDemo: true;
  className?: string;
}

export function PropertyCard({
  address,
  priceLabel,
  bedrooms,
  bathrooms,
  transactionType,
  isDemo,
  className,
}: PropertyCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-sm border border-border bg-surface",
        className,
      )}
    >
      {isDemo && (
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-warning px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
          Sample property — not real
        </span>
      )}
      {/* Placeholder image block: no stock photography is used, per Rule 1/2. */}
      <div
        aria-hidden="true"
        className="flex h-44 items-center justify-center bg-secondary/10 text-xs text-secondary"
      >
        Photograph not yet supplied
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-accent">
          {transactionType}
        </p>
        <h3 className="text-base font-semibold text-ink">{address}</h3>
        <p className="text-sm text-ink/70">
          {bedrooms} bed &middot; {bathrooms} bath
        </p>
        <p className="text-lg font-semibold text-ink">{priceLabel}</p>
      </div>
    </article>
  );
}
