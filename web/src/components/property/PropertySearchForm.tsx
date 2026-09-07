import {
  COMMERCIAL_USES,
  COMMERCIAL_USE_LABELS,
  RESIDENTIAL_PROPERTY_TYPES,
  RESIDENTIAL_PROPERTY_TYPE_LABELS,
} from "@/lib/property/types";

/**
 * A plain GET form: every filter is a real HTML form control, submitted
 * with no JavaScript required, producing a normal, shareable URL
 * (?location=...&minPrice=...). This is deliberate — it means the whole
 * search works with the keyboard, with a screen reader, and with
 * JavaScript disabled, without any extra effort to make it so.
 */
export function PropertySearchForm({
  category,
  action,
  defaults,
}: {
  category: "residential" | "commercial";
  action: string;
  defaults: Record<string, string | undefined>;
}) {
  const fieldId = (name: string) => `${category}-${name}`;

  return (
    <form
      action={action}
      method="get"
      role="search"
      aria-label={`${category === "residential" ? "Residential" : "Commercial"} property search filters`}
      className="grid gap-4 rounded-sm border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="space-y-1">
        <label
          htmlFor={fieldId("location")}
          className="block text-sm font-medium text-ink"
        >
          Location
        </label>
        <input
          id={fieldId("location")}
          name="location"
          type="text"
          defaultValue={defaults.location}
          placeholder="e.g. SW17"
          className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor={fieldId("minPrice")}
          className="block text-sm font-medium text-ink"
        >
          Min price
        </label>
        <input
          id={fieldId("minPrice")}
          name="minPrice"
          type="number"
          min={0}
          step={1000}
          defaultValue={defaults.minPrice}
          className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor={fieldId("maxPrice")}
          className="block text-sm font-medium text-ink"
        >
          Max price
        </label>
        <input
          id={fieldId("maxPrice")}
          name="maxPrice"
          type="number"
          min={0}
          step={1000}
          defaultValue={defaults.maxPrice}
          className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        />
      </div>

      {category === "residential" ? (
        <>
          <div className="space-y-1">
            <label
              htmlFor={fieldId("minBedrooms")}
              className="block text-sm font-medium text-ink"
            >
              Minimum bedrooms
            </label>
            <select
              id={fieldId("minBedrooms")}
              name="minBedrooms"
              defaultValue={defaults.minBedrooms ?? ""}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor={fieldId("propertyType")}
              className="block text-sm font-medium text-ink"
            >
              Property type
            </label>
            <select
              id={fieldId("propertyType")}
              name="propertyType"
              defaultValue={defaults.propertyType ?? ""}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              {RESIDENTIAL_PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {RESIDENTIAL_PROPERTY_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-1">
            <label
              htmlFor={fieldId("commercialUse")}
              className="block text-sm font-medium text-ink"
            >
              Commercial use
            </label>
            <select
              id={fieldId("commercialUse")}
              name="commercialUse"
              defaultValue={defaults.commercialUse ?? ""}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              {COMMERCIAL_USES.map((use) => (
                <option key={use} value={use}>
                  {COMMERCIAL_USE_LABELS[use]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label
              htmlFor={fieldId("minFloorAreaSqFt")}
              className="block text-sm font-medium text-ink"
            >
              Minimum floor area (sq ft)
            </label>
            <input
              id={fieldId("minFloorAreaSqFt")}
              name="minFloorAreaSqFt"
              type="number"
              min={0}
              defaultValue={defaults.minFloorAreaSqFt}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
            />
          </div>
        </>
      )}

      <div className="space-y-1">
        <label
          htmlFor={fieldId("sort")}
          className="block text-sm font-medium text-ink"
        >
          Sort by
        </label>
        <select
          id={fieldId("sort")}
          name="sort"
          defaultValue={defaults.sort ?? "newest"}
          className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </div>

      <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-1">
        <button
          type="submit"
          className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Search
        </button>
        <a
          href={action}
          className="text-sm text-ink/70 underline underline-offset-4"
        >
          Clear filters
        </a>
      </div>
    </form>
  );
}
