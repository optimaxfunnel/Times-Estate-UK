import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { ContentStatus } from "@/lib/site-config";

/**
 * A visible, unmissable notice wrapping any placeholder/demo/unverified
 * content block. Required by CLAUDE.md Rule 2: demonstration material must
 * be clearly labelled wherever a visitor could see it, not just in code.
 */
export function PlaceholderNotice({
  status,
  className,
  children,
}: {
  status: Extract<
    ContentStatus,
    "missing" | "requires-verification" | "requires-professional-review"
  >;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border-2 border-dashed border-warning/60 bg-warning/5 p-4",
        className,
      )}
    >
      <Badge status={status} className="mb-2" />
      <div className="text-sm text-ink/80">{children}</div>
    </div>
  );
}
