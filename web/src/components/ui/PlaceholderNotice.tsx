import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { ContentStatus } from "@/lib/site-config";

/**
 * Whether internal content notes are shown. They are for the owner and
 * staff reviewing the site (development, or a staging build with
 * NEXT_PUBLIC_SHOW_CONTENT_NOTES=true), never for public visitors: a
 * note such as "fees not yet supplied" is a to-do, not information a
 * customer can act on. The full list stays visible to staff at
 * /admin/content and in /CONTENT_VERIFICATION_REGISTER.md.
 */
export function showContentNotes(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_SHOW_CONTENT_NOTES === "true"
  );
}

/**
 * A visible, unmissable notice wrapping a missing or unverified content
 * block (CLAUDE.md Rule 2). In a public build it renders `publicText`
 * instead — a plain, factual line that makes no claim — or nothing.
 * Demonstration listings are labelled separately and always visibly.
 */
export function PlaceholderNotice({
  status,
  className,
  publicText,
  children,
}: {
  status: Extract<
    ContentStatus,
    "missing" | "requires-verification" | "requires-professional-review"
  >;
  className?: string;
  publicText?: React.ReactNode;
  children: React.ReactNode;
}) {
  if (!showContentNotes()) {
    return publicText ? (
      <p className={cn("text-sm text-ink/80", className)}>{publicText}</p>
    ) : null;
  }
  return (
    <div
      className={cn(
        "rounded-sm border-2 border-dashed border-warning/60 bg-warning/5 p-4",
        className,
      )}
    >
      <Badge status={status} className="mb-2" />
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink/60">
        Internal note — hidden from the public site
      </span>
      <div className="text-sm text-ink/80">{children}</div>
    </div>
  );
}
