import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * In-text link. Underlined by default (WCAG 1.4.1: colour is never the
 * only cue), accent colour 5.28:1 on white. External links open in the
 * same tab unless `external` is set, which adds a screen-reader note.
 */
export function TextLink({
  href,
  external = false,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "font-medium text-accent underline underline-offset-4 decoration-1 hover:text-accent-dark hover:decoration-2",
    className,
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
