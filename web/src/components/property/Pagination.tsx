import { cn } from "@/lib/cn";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";

function withPage(
  basePath: string,
  params: URLSearchParams,
  page: number,
): string {
  const next = new URLSearchParams(params);
  next.set("page", String(page));
  return `${basePath}?${next.toString()}`;
}

/** Page numbers to show: always 1 and the last, the current ±1, "…" for gaps. */
function pageWindow(current: number, total: number): (number | "gap")[] {
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

export function Pagination({
  basePath,
  params,
  page,
  totalPages,
  pageSize,
  total,
  noun = "properties",
}: {
  basePath: string;
  params: URLSearchParams;
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  noun?: string;
}) {
  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);
  const circle =
    "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors";

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      {totalPages > 1 ? (
        <nav
          aria-label="Search results pages"
          className="flex items-center gap-1"
        >
          {page > 1 ? (
            <a
              href={withPage(basePath, params, page - 1)}
              aria-label="Previous page"
              className={cn(circle, "text-ink hover:bg-accent-tint")}
            >
              <IconChevronLeft className="h-5 w-5" />
            </a>
          ) : (
            <span className={cn(circle, "text-ink/30")} aria-hidden>
              <IconChevronLeft className="h-5 w-5" />
            </span>
          )}
          {pageWindow(page, totalPages).map((item, i) =>
            item === "gap" ? (
              <span key={`gap-${i}`} className="px-1 text-secondary">
                …
              </span>
            ) : (
              <a
                key={item}
                href={withPage(basePath, params, item)}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  circle,
                  item === page
                    ? "bg-accent text-white"
                    : "text-ink hover:bg-accent-tint",
                )}
              >
                {item}
              </a>
            ),
          )}
          {page < totalPages ? (
            <a
              href={withPage(basePath, params, page + 1)}
              aria-label="Next page"
              className={cn(circle, "text-ink hover:bg-accent-tint")}
            >
              <IconChevronRight className="h-5 w-5" />
            </a>
          ) : (
            <span className={cn(circle, "text-ink/30")} aria-hidden>
              <IconChevronRight className="h-5 w-5" />
            </span>
          )}
        </nav>
      ) : (
        <span />
      )}
      <p className="text-sm text-ink/60">
        Showing {first} – {last} of {total} {noun}
      </p>
    </div>
  );
}
