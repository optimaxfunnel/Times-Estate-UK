import { cn } from "@/lib/cn";

/**
 * Loading placeholder blocks. Decorative (`aria-hidden`) — the region
 * that contains them announces "Loading…" once via `LoadingRegion`.
 * The gentle pulse stops entirely under prefers-reduced-motion.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-sm bg-border/70 motion-safe:animate-[skeleton-pulse_1.6s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}

export function LoadingRegion({
  label = "Loading…",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** Skeleton matching the listing card's shape, so nothing jumps when data arrives. */
export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-surface">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
