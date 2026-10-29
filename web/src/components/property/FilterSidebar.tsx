import type { Facets, FacetOption } from "@/lib/property/facets";
import type { SearchParams } from "@/lib/property/search-params";
import { cn } from "@/lib/cn";
import { IconChevronDown } from "@/components/icons";

function selected(params: SearchParams, key: string): string[] {
  const value = params[key];
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function single(params: SearchParams, key: string): string {
  const value = params[key];
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/**
 * One collapsible filter group. A native <details> element: it opens and
 * closes with no JavaScript, is keyboard-operable out of the box, and
 * announces its expanded state to screen readers for free.
 */
function Group({
  title,
  open = true,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={open} className="group/filter border-b border-border py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-sm text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <IconChevronDown className="h-4 w-4 text-ink/50 transition-transform group-open/filter:rotate-180" />
      </summary>
      <div className="mt-2 space-y-1.5">{children}</div>
    </details>
  );
}

function CheckboxList({
  name,
  options,
  checked,
}: {
  name: string;
  options: FacetOption[];
  checked: string[];
}) {
  if (options.length === 0) {
    return (
      <p className="text-xs text-secondary">None in the current listings.</p>
    );
  }
  return (
    <ul className="space-y-1.5">
      {options.map((option) => (
        <li key={option.value}>
          <label className="flex min-h-6 cursor-pointer items-center gap-2 text-sm text-ink/80 hover:text-ink">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              defaultChecked={checked.includes(option.value)}
              className="h-4 w-4 rounded-sm border-border accent-accent"
            />
            <span>
              {option.label}{" "}
              <span className="text-secondary">({option.count})</span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

/**
 * The "Filter Results" sidebar: a plain GET form, so every combination
 * of filters is a normal, shareable URL and the whole thing works with
 * the keyboard, a screen reader, or JavaScript switched off. The
 * current sort and view are carried through as hidden fields so
 * applying a filter doesn't silently reset them.
 */
export function FilterSidebar({
  action,
  params,
  facets,
  scope,
  listingType,
  className,
}: {
  action: string;
  params: SearchParams;
  facets: Facets;
  /** Which groups make sense: a residential page hides commercial uses, and vice versa. */
  scope: "residential" | "commercial" | "all";
  /** Sale or letting page — lettings get furnishing and availability filters. */
  listingType?: "sale" | "letting";
  className?: string;
}) {
  const sort = single(params, "sort");
  const view = single(params, "view");

  return (
    <form
      action={action}
      method="get"
      role="search"
      aria-label="Filter results"
      className={cn(
        "rounded-sm border border-border bg-surface p-4",
        className,
      )}
    >
      <h2 className="font-sans text-base font-bold text-ink">Filter Results</h2>
      {sort && <input type="hidden" name="sort" value={sort} />}
      {view && <input type="hidden" name="view" value={view} />}

      {scope !== "commercial" && (
        <Group title="Property Type">
          <CheckboxList
            name="propertyType"
            options={facets.propertyTypes}
            checked={selected(params, "propertyType")}
          />
        </Group>
      )}

      {scope !== "residential" && (
        <Group title={scope === "all" ? "Commercial Use" : "Use"}>
          <CheckboxList
            name="commercialUse"
            options={facets.commercialUses}
            checked={selected(params, "commercialUse")}
          />
        </Group>
      )}

      {scope !== "commercial" && (
        <Group title="Bedrooms">
          <CheckboxList
            name="bedrooms"
            options={facets.bedrooms}
            checked={selected(params, "bedrooms")}
          />
        </Group>
      )}

      <Group title="Price Range">
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-xs text-ink/60">Min £</span>
            <input
              type="number"
              name="minPrice"
              min={0}
              step={1000}
              defaultValue={single(params, "minPrice")}
              placeholder="0"
              className="mt-1 w-full rounded-sm border border-border-strong bg-surface px-2 py-1.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs text-ink/60">Max £</span>
            <input
              type="number"
              name="maxPrice"
              min={0}
              step={1000}
              defaultValue={single(params, "maxPrice")}
              placeholder="No max"
              className="mt-1 w-full rounded-sm border border-border-strong bg-surface px-2 py-1.5 text-sm"
            />
          </label>
        </div>
        {scope === "all" && (
          <p className="text-[0.7rem] leading-snug text-secondary">
            Sale prices and monthly/annual rents are compared as entered.
          </p>
        )}
      </Group>

      <Group title="Locations" open={false}>
        <label className="block">
          <span className="sr-only">Location or postcode</span>
          <input
            type="search"
            name="location"
            defaultValue={single(params, "location")}
            placeholder="Area or postcode, e.g. SW17"
            className="w-full rounded-sm border border-border-strong bg-surface px-2 py-1.5 text-sm"
          />
        </label>
        <CheckboxList
          name="postcode"
          options={facets.postcodes}
          checked={selected(params, "postcode").map((p) => p.toUpperCase())}
        />
      </Group>

      <Group title="Property Features" open={false}>
        <CheckboxList
          name="feature"
          options={facets.features}
          checked={selected(params, "feature")}
        />
      </Group>

      {scope !== "residential" && (
        <Group title="Floor area (sq ft)" open={false}>
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="text-xs text-secondary">Min</span>
              <input
                type="number"
                name="minFloorAreaSqFt"
                min={0}
                step={100}
                defaultValue={single(params, "minFloorAreaSqFt")}
                className="mt-1 w-full rounded-sm border border-border-strong bg-surface px-2 py-1.5 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs text-secondary">Max</span>
              <input
                type="number"
                name="maxFloorAreaSqFt"
                min={0}
                step={100}
                defaultValue={single(params, "maxFloorAreaSqFt")}
                className="mt-1 w-full rounded-sm border border-border-strong bg-surface px-2 py-1.5 text-sm"
              />
            </label>
          </div>
        </Group>
      )}

      <Group title="Tenure" open={false}>
        <CheckboxList
          name="tenure"
          options={facets.tenures}
          checked={selected(params, "tenure")}
        />
      </Group>

      {listingType === "letting" && scope !== "commercial" && (
        <Group title="Furnishing" open={false}>
          <CheckboxList
            name="furnishing"
            options={facets.furnishings}
            checked={selected(params, "furnishing")}
          />
        </Group>
      )}

      <Group title="Availability" open={false}>
        {listingType === "letting" && (
          <label className="block">
            <span className="text-xs text-secondary">Available by</span>
            <input
              type="date"
              name="availableBy"
              defaultValue={single(params, "availableBy")}
              className="mt-1 w-full rounded-sm border border-border-strong bg-surface px-2 py-1.5 text-sm"
            />
          </label>
        )}
        <CheckboxList
          name="status"
          options={facets.statuses}
          checked={selected(params, "status")}
        />
      </Group>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="submit"
          className="w-full rounded-sm bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Apply Filters
        </button>
        <a
          href={action}
          className="text-center text-xs text-ink/60 underline underline-offset-4 hover:text-accent"
        >
          Clear all filters
        </a>
      </div>
    </form>
  );
}
