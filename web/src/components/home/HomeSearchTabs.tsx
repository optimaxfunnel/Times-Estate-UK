"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { COMMERCIAL_USES, COMMERCIAL_USE_LABELS } from "@/lib/property/types";

const PRICE_BANDS = [
  { value: "", label: "Any price" },
  { value: "150000", label: "£150,000+" },
  { value: "300000", label: "£300,000+" },
  { value: "500000", label: "£500,000+" },
  { value: "750000", label: "£750,000+" },
  { value: "1000000", label: "£1,000,000+" },
] as const;

type TabKey = "buy" | "rent" | "commercial-sale" | "commercial-rent";

const TABS: {
  key: TabKey;
  label: string;
  action: string;
  category: "residential" | "commercial";
}[] = [
  { key: "buy", label: "Buy", action: "/buy", category: "residential" },
  { key: "rent", label: "Rent", action: "/rent", category: "residential" },
  {
    key: "commercial-sale",
    label: "Commercial Sale",
    action: "/commercial/for-sale",
    category: "commercial",
  },
  {
    key: "commercial-rent",
    label: "Commercial Rent",
    action: "/commercial/to-let",
    category: "commercial",
  },
];

/**
 * The homepage's four-tab quick search. Each tab is a real GET form
 * pointing at the matching search page (/buy, /rent, /commercial/for-sale,
 * /commercial/to-let) using the same query-parameter names those pages
 * already read (see lib/property/search-params.ts) — this is a shortcut
 * into the existing search, not a second search system.
 */
export function HomeSearchTabs() {
  const [active, setActive] = useState<TabKey>("buy");
  const baseId = useId();

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
    <div className="relative z-10 mx-4 -mt-16 rounded-lg border border-border bg-surface p-4 shadow-lg sm:mx-auto sm:max-w-3xl sm:p-6 lg:-mt-20">
      <div
        role="tablist"
        aria-label="Search properties"
        className="flex flex-wrap gap-1 border-b border-border"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.key}
            id={`${baseId}-tab-${tab.key}`}
            role="tab"
            type="button"
            aria-selected={active === tab.key}
            aria-controls={`${baseId}-panel-${tab.key}`}
            tabIndex={active === tab.key ? 0 : -1}
            onClick={() => setActive(tab.key)}
            onKeyDown={(e) => onTabKeyDown(e, i)}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm font-semibold whitespace-nowrap",
              active === tab.key
                ? "border-accent text-accent"
                : "border-transparent text-ink/60 hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {TABS.map((tab) => (
        <form
          key={tab.key}
          id={`${baseId}-panel-${tab.key}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.key}`}
          hidden={active !== tab.key}
          action={tab.action}
          method="get"
          className="grid gap-3 pt-4 sm:grid-cols-[2fr_1fr_1fr_auto]"
        >
          <div>
            <label
              htmlFor={`${baseId}-location-${tab.key}`}
              className="sr-only"
            >
              Location
            </label>
            <input
              id={`${baseId}-location-${tab.key}`}
              name="location"
              type="text"
              placeholder="Location, e.g. SW17"
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus-visible:border-accent"
            />
          </div>

          <div>
            <label htmlFor={`${baseId}-price-${tab.key}`} className="sr-only">
              Minimum price
            </label>
            <select
              id={`${baseId}-price-${tab.key}`}
              name="minPrice"
              defaultValue=""
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-ink focus-visible:border-accent"
            >
              {PRICE_BANDS.map((band) => (
                <option key={band.value} value={band.value}>
                  {band.label}
                </option>
              ))}
            </select>
          </div>

          {tab.category === "residential" ? (
            <div>
              <label htmlFor={`${baseId}-beds-${tab.key}`} className="sr-only">
                Minimum bedrooms
              </label>
              <select
                id={`${baseId}-beds-${tab.key}`}
                name="minBedrooms"
                defaultValue=""
                className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-ink focus-visible:border-accent"
              >
                <option value="">Any beds</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+ beds
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor={`${baseId}-use-${tab.key}`} className="sr-only">
                Commercial use
              </label>
              <select
                id={`${baseId}-use-${tab.key}`}
                name="commercialUse"
                defaultValue=""
                className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-ink focus-visible:border-accent"
              >
                <option value="">Any use</option>
                {COMMERCIAL_USES.map((use) => (
                  <option key={use} value={use}>
                    {COMMERCIAL_USE_LABELS[use]}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="rounded-sm bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            Search
          </button>
        </form>
      ))}
    </div>
  );
}
