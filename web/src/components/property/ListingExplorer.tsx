import Link from "next/link";
import { propertyProvider } from "@/lib/property/provider";
import { computeFacets } from "@/lib/property/facets";
import {
  buildListParams,
  readSort,
  readView,
  toUrlSearchParams,
  type SearchParams,
} from "@/lib/property/search-params";
import {
  toPublicProperty,
  type ListingType,
  type PropertyCategory,
} from "@/lib/property/types";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { EmptyState } from "@/components/ui/StatusPanel";
import { SaveSearchButton } from "@/components/property/SaveSearchButton";
import { CategorySwitcher } from "@/components/property/CategorySwitcher";
import { FilterSidebar } from "@/components/property/FilterSidebar";
import { SortSelect } from "@/components/property/SortSelect";
import { Pagination } from "@/components/property/Pagination";
import { AreaPanel } from "@/components/property/AreaPanel";
import { IconGrid, IconList, IconSliders } from "@/components/icons";

const PAGE_SIZE = 8;

/**
 * The three-column listing explorer from the owner's reference: filter
 * sidebar · results grid with sort/view toolbar and pagination · area
 * panel. Used by the homepage (everything public) and by each dedicated
 * search page (scoped by `category` + `listingType`). Server-rendered
 * from URL parameters, so every state is a shareable link.
 */
export async function ListingExplorer({
  basePath,
  params,
  category,
  listingType,
  alertHref,
}: {
  basePath: string;
  params: SearchParams;
  category?: PropertyCategory;
  listingType?: ListingType;
  alertHref: string;
}) {
  const listParams = buildListParams(params, category, listingType, {
    pageSize: PAGE_SIZE,
  });
  const [result, scope] = await Promise.all([
    propertyProvider.list(listParams),
    // Facet counts come from the whole public set this page covers, so
    // the sidebar shows what *could* match, not just what currently does.
    propertyProvider.list({
      filter: { category, listingType },
      pageSize: 1000,
    }),
  ]);
  const facets = computeFacets(scope.items);
  const urlParams = toUrlSearchParams(params);
  const query = urlParams.toString();
  const view = readView(params);
  const sort = readSort(params);
  const sidebarScope = category ?? "all";

  // Human label for "Save this search", e.g. "Residential to let · 2 filters".
  const activeKeys = [...new Set([...urlParams.keys()])].filter(
    (k) => !["sort", "view"].includes(k),
  );
  const categoryLabel = !category
    ? "All properties"
    : `${category === "residential" ? "Residential" : "Commercial"} ${listingType === "sale" ? "for sale" : "to let"}`;
  const searchLabel =
    activeKeys.length === 0
      ? categoryLabel
      : `${categoryLabel} · ${activeKeys.length} filter${activeKeys.length === 1 ? "" : "s"}`;

  // No-result alternatives: drop one active filter at a time.
  const FILTER_NAMES: Record<string, string> = {
    location: "any location",
    postcode: "all areas",
    minPrice: "no minimum price",
    maxPrice: "no maximum price",
    bedrooms: "any bedrooms",
    minBedrooms: "any bedrooms",
    propertyType: "any property type",
    commercialUse: "any use",
    feature: "without feature filters",
    tenure: "any tenure",
    furnishing: "any furnishing",
    availableBy: "any availability date",
    minFloorAreaSqFt: "any minimum size",
    maxFloorAreaSqFt: "any maximum size",
    status: "any availability",
  };
  const suggestions = activeKeys
    .filter((k) => FILTER_NAMES[k])
    .slice(0, 4)
    .map((k) => {
      const next = new URLSearchParams(urlParams);
      next.delete(k);
      const q = next.toString();
      return {
        label: FILTER_NAMES[k],
        href: q ? `${basePath}?${q}` : basePath,
      };
    });

  const viewHref = (v: "grid" | "list") => {
    const next = new URLSearchParams(urlParams);
    if (v === "grid") next.delete("view");
    else next.set("view", v);
    const q = next.toString();
    return q ? `${basePath}?${q}` : basePath;
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_15rem]">
      {category && (
        <div className="lg:col-span-2 xl:col-span-3">
          <CategorySwitcher current={basePath} />
        </div>
      )}
      {/* On small screens the sidebar collapses behind a "Filters" toggle
          so the results aren't pushed below the fold. */}
      <details className="group/mobile lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-sm border border-border bg-surface px-4 py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <IconSliders className="h-5 w-5 text-accent" />
            Filter Results
          </span>
          <span className="text-xs font-normal text-ink/60 group-open/mobile:hidden">
            Show
          </span>
          <span className="hidden text-xs font-normal text-ink/60 group-open/mobile:inline">
            Hide
          </span>
        </summary>
        <FilterSidebar
          action={basePath}
          params={params}
          facets={facets}
          scope={sidebarScope}
          listingType={listingType}
          className="mt-2"
        />
      </details>
      <FilterSidebar
        action={basePath}
        params={params}
        facets={facets}
        scope={sidebarScope}
        listingType={listingType}
        className="hidden self-start lg:block"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-sans text-lg font-bold text-ink">
              {result.total} {result.total === 1 ? "Property" : "Properties"}{" "}
              Found
            </h2>
            <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-ink/60">
              <Badge status="missing" />
              No live property feed is connected yet — every listing shown is
              demonstration data.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <SaveSearchButton
              url={query ? `${basePath}?${query}` : basePath}
              label={searchLabel}
            />
            <SortSelect basePath={basePath} query={query} value={sort} />
            <div
              role="group"
              aria-label="Results layout"
              className="inline-flex overflow-hidden rounded-sm border border-border"
            >
              <Link
                href={viewHref("grid")}
                aria-label="Grid view"
                aria-current={view === "grid" ? "true" : undefined}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center",
                  view === "grid"
                    ? "bg-accent text-white"
                    : "text-ink hover:bg-accent-tint",
                )}
              >
                <IconGrid className="h-4 w-4" />
              </Link>
              <Link
                href={viewHref("list")}
                aria-label="List view"
                aria-current={view === "list" ? "true" : undefined}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center",
                  view === "list"
                    ? "bg-accent text-white"
                    : "text-ink hover:bg-accent-tint",
                )}
              >
                <IconList className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {result.items.length === 0 ? (
          <EmptyState
            className="mt-6"
            title="No properties match your search"
            actions={
              <>
                <ButtonLink href={basePath} variant="secondary">
                  Clear filters
                </ButtonLink>
                <ButtonLink href={alertHref}>
                  Create a Property Alert
                </ButtonLink>
              </>
            }
          >
            {suggestions.length > 0 && (
              <span className="mb-3 block">
                <span className="font-medium text-ink">Try: </span>
                {suggestions.map((s, i) => (
                  <span key={s.href}>
                    {i > 0 && " · "}
                    <Link
                      href={s.href}
                      className="text-accent underline underline-offset-4"
                    >
                      {s.label}
                    </Link>
                  </span>
                ))}
              </span>
            )}
            Try widening your search — for example, a lower minimum price or a
            wider location — or register for an alert and we&rsquo;ll let you
            know when something suitable becomes available.
          </EmptyState>
        ) : (
          <ul
            className={cn(
              "mt-5 grid gap-4",
              view === "grid"
                ? "sm:grid-cols-2 xl:grid-cols-3 min-[1400px]:grid-cols-4"
                : "grid-cols-1",
            )}
          >
            {result.items.map((property) => (
              <li key={property.id}>
                <PropertyCard
                  property={toPublicProperty(property)}
                  variant={view}
                />
              </li>
            ))}
          </ul>
        )}

        {result.items.length > 0 && (
          <div className="mt-6">
            <Pagination
              basePath={basePath}
              params={urlParams}
              page={result.page}
              totalPages={result.totalPages}
              pageSize={result.pageSize}
              total={result.total}
            />
          </div>
        )}

        <p className="mt-6 text-center text-sm">
          <Link
            href={alertHref}
            className="text-ink underline underline-offset-4 hover:text-accent"
          >
            Can&rsquo;t find the right property? Create a Property Alert &rarr;
          </Link>
        </p>
      </div>

      <div className="self-start lg:col-span-2 xl:col-span-1">
        <AreaPanel basePath={basePath} areas={facets.postcodes} />
      </div>
    </div>
  );
}
