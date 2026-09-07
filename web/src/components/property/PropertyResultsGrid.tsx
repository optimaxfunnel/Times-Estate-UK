import { PropertyCard } from "@/components/ui/PropertyCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { PropertyListResult } from "@/lib/property/provider";
import { toPublicProperty } from "@/lib/property/types";

function withPage(basePath: string, params: URLSearchParams, page: number): string {
  const next = new URLSearchParams(params);
  next.set("page", String(page));
  return `${basePath}?${next.toString()}`;
}

export function PropertyResultsGrid({
  result,
  basePath,
  currentParams,
  alertHref,
}: {
  result: PropertyListResult;
  basePath: string;
  currentParams: URLSearchParams;
  alertHref: string;
}) {
  if (result.items.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-border bg-secondary/5 p-8 text-center">
        <p className="text-lg font-semibold text-ink">No properties match your search</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
          Try widening your search — for example, a lower minimum price or a
          wider location — or register for an alert and we&rsquo;ll let you
          know when something suitable becomes available.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <ButtonLink href={basePath} variant="secondary">
            Clear filters
          </ButtonLink>
          <ButtonLink href={alertHref}>Create a Property Alert</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-ink/70" role="status">
        {result.total} {result.total === 1 ? "property" : "properties"} found
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.items.map((property) => (
          <li key={property.id}>
            <PropertyCard property={toPublicProperty(property)} />
          </li>
        ))}
      </ul>

      {result.totalPages > 1 && (
        <nav aria-label="Search results pages" className="mt-8 flex justify-center gap-2">
          {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={withPage(basePath, currentParams, page)}
              aria-current={page === result.page ? "page" : undefined}
              className={`rounded-sm border px-3 py-1.5 text-sm ${
                page === result.page
                  ? "border-accent bg-accent text-white"
                  : "border-border text-ink hover:border-accent"
              }`}
            >
              {page}
            </a>
          ))}
        </nav>
      )}

      <div className="mt-8 text-center">
        <ButtonLink href={alertHref} variant="ghost">
          Can&rsquo;t find the right property? Create a Property Alert &rarr;
        </ButtonLink>
      </div>
    </div>
  );
}
