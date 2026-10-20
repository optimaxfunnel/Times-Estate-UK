"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import {
  COMMERCIAL_USES,
  COMMERCIAL_USE_LABELS,
  RESIDENTIAL_PROPERTY_TYPES,
  RESIDENTIAL_PROPERTY_TYPE_LABELS,
} from "@/lib/property/types";
import { IconPin, IconSearch } from "@/components/icons";

type TabKey = "buy" | "rent" | "commercial";

const TABS: { key: TabKey; label: string }[] = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "commercial", label: "Commercial" },
];

const SALE_BANDS = [
  150000, 250000, 350000, 500000, 750000, 1000000, 1500000, 2000000,
];
const RENT_BANDS = [750, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
const COMMERCIAL_BANDS = [
  10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2000000,
];

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const selectClass =
  "w-full appearance-none rounded-sm border border-border bg-surface px-3 py-2.5 text-sm text-ink focus-visible:border-accent";

/**
 * The hero's quick search: three tabs (Buy · Rent · Commercial), each a
 * real GET form into the matching search page using the same parameter
 * names those pages read (lib/property/search-params.ts). A shortcut
 * into the existing search, not a second search system.
 */
export function HeroSearchCard() {
  const [active, setActive] = useState<TabKey>("buy");
  const [commercialType, setCommercialType] = useState<"sale" | "letting">(
    "sale",
  );
  const baseId = useId();

  const bands =
    active === "buy"
      ? SALE_BANDS
      : active === "rent"
        ? RENT_BANDS
        : COMMERCIAL_BANDS;
  const suffix = active === "rent" ? " pcm" : "";
  const action =
    active === "buy"
      ? "/buy"
      : active === "rent"
        ? "/rent"
        : commercialType === "sale"
          ? "/commercial/for-sale"
          : "/commercial/to-let";

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % TABS.length
        : (index - 1 + TABS.length) % TABS.length;
    setActive(TABS[next].key);
    document.getElementById(`${baseId}-tab-${TABS[next].key}`)?.focus();
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-4 text-ink shadow-xl sm:p-5">
      <div role="tablist" aria-label="Search properties" className="flex gap-2">
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            id={`${baseId}-tab-${tab.key}`}
            role="tab"
            type="button"
            aria-selected={active === tab.key}
            aria-controls={`${baseId}-panel`}
            tabIndex={active === tab.key ? 0 : -1}
            onClick={() => setActive(tab.key)}
            onKeyDown={(e) => onTabKeyDown(e, i)}
            className={cn(
              "min-h-11 flex-1 rounded-sm px-3 text-sm font-semibold transition-colors",
              active === tab.key
                ? "bg-accent text-white"
                : "bg-accent-tint/60 text-ink hover:bg-accent-tint",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        action={action}
        method="get"
        className="mt-4 space-y-3"
      >
        <div className="flex gap-2">
          <label htmlFor={`${baseId}-location`} className="sr-only">
            Location, postcode or keyword
          </label>
          <div className="relative flex-1">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
            <input
              id={`${baseId}-location`}
              name="location"
              type="search"
              placeholder="Location, postcode or keyword (e.g. SW17)"
              className="w-full rounded-sm border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink/45 focus-visible:border-accent"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <div>
            <label htmlFor={`${baseId}-min`} className="sr-only">
              Minimum price
            </label>
            <select
              id={`${baseId}-min`}
              name="minPrice"
              defaultValue=""
              className={selectClass}
            >
              <option value="">Min Price</option>
              {bands.map((band) => (
                <option key={band} value={band}>
                  {gbp.format(band)}
                  {suffix}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${baseId}-max`} className="sr-only">
              Maximum price
            </label>
            <select
              id={`${baseId}-max`}
              name="maxPrice"
              defaultValue=""
              className={selectClass}
            >
              <option value="">Max Price</option>
              {bands.map((band) => (
                <option key={band} value={band}>
                  {gbp.format(band)}
                  {suffix}
                </option>
              ))}
            </select>
          </div>

          {active === "commercial" ? (
            <>
              <div>
                <label htmlFor={`${baseId}-use`} className="sr-only">
                  Commercial use
                </label>
                <select
                  id={`${baseId}-use`}
                  name="commercialUse"
                  defaultValue=""
                  className={selectClass}
                >
                  <option value="">Property Type</option>
                  {COMMERCIAL_USES.map((use) => (
                    <option key={use} value={use}>
                      {COMMERCIAL_USE_LABELS[use]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${baseId}-ctype`} className="sr-only">
                  For sale or to let
                </label>
                {/* Not a submitted field — it chooses which commercial
                    search page the form posts to. */}
                <select
                  id={`${baseId}-ctype`}
                  value={commercialType}
                  onChange={(e) =>
                    setCommercialType(e.target.value as "sale" | "letting")
                  }
                  className={selectClass}
                >
                  <option value="sale">For Sale</option>
                  <option value="letting">To Let</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor={`${baseId}-type`} className="sr-only">
                  Property type
                </label>
                <select
                  id={`${baseId}-type`}
                  name="propertyType"
                  defaultValue=""
                  className={selectClass}
                >
                  <option value="">Property Type</option>
                  {RESIDENTIAL_PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {RESIDENTIAL_PROPERTY_TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${baseId}-beds`} className="sr-only">
                  Minimum bedrooms
                </label>
                <select
                  id={`${baseId}-beds`}
                  name="minBedrooms"
                  defaultValue=""
                  className={selectClass}
                >
                  <option value="">Bedrooms</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}+ beds
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/70">
          <IconPin className="h-4 w-4 text-accent" />
          London &amp; surrounding areas
        </p>
      </form>
    </div>
  );
}
