import Link from "next/link";
import { cn } from "@/lib/cn";

const CATEGORIES = [
  { href: "/buy", label: "Residential for sale" },
  { href: "/rent", label: "Residential to let" },
  { href: "/commercial/for-sale", label: "Commercial for sale" },
  { href: "/commercial/to-let", label: "Commercial to let" },
] as const;

/**
 * Connects the four search experiences: one row of links, the current
 * one marked with aria-current. Plain links, so each category is its own
 * shareable, bookmarkable page.
 */
export function CategorySwitcher({ current }: { current: string }) {
  return (
    <nav aria-label="Property categories" className="overflow-x-auto">
      <ul className="flex min-w-max gap-2">
        {CATEGORIES.map((c) => {
          const active = c.href === current;
          return (
            <li key={c.href}>
              <Link
                href={c.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium",
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border-strong text-ink hover:border-accent hover:text-accent",
                )}
              >
                {c.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
