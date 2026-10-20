"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import type { PropertySortKey } from "@/lib/property/provider";

const OPTIONS: { value: PropertySortKey; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

/**
 * "Sort by" control. Changing it navigates to the same search with a
 * new `sort` (and the page reset to 1), keeping every other filter in
 * the URL. The current query is passed in as a string so this needs no
 * Suspense boundary for `useSearchParams`.
 */
export function SortSelect({
  basePath,
  query,
  value,
}: {
  basePath: string;
  query: string;
  value: PropertySortKey;
}) {
  const router = useRouter();
  const id = useId();

  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 text-sm">
      <span className="text-ink/70">Sort by:</span>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(query);
          next.set("sort", e.target.value);
          next.delete("page");
          router.push(`${basePath}?${next.toString()}`);
        }}
        className="rounded-sm border border-border bg-surface px-2 py-1.5 text-sm font-medium text-ink"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
