import { cn } from "@/lib/cn";
import type { ContentStatus } from "@/lib/site-config";

const labels: Record<ContentStatus, string> = {
  confirmed: "Confirmed",
  "supplied-by-owner": "Supplied by owner",
  missing: "Missing",
  "requires-verification": "Requires verification",
  "requires-professional-review": "Requires professional review",
};

const styles: Record<ContentStatus, string> = {
  confirmed: "bg-success/10 text-success border-success/30",
  "supplied-by-owner": "bg-secondary/10 text-secondary border-secondary/30",
  missing: "bg-danger/10 text-danger border-danger/30",
  "requires-verification": "bg-warning/10 text-warning-text border-warning/30",
  "requires-professional-review": "bg-warning/10 text-warning-text border-warning/30",
};

/**
 * Visible status label for any fact or content block whose status is not
 * "confirmed" — enforces Rule 2 (label demonstration/unverified material)
 * in the interface itself, not just in project documents.
 */
export function Badge({
  status,
  className,
}: {
  status: ContentStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm border px-2 py-0.5 text-xs font-medium uppercase tracking-wide",
        styles[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}
