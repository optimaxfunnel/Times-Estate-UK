"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  readSavedSearches,
  removeSavedSearch,
  type SavedSearch,
} from "@/lib/saved-searches";

function subscribe(cb: () => void) {
  window.addEventListener("saved-searches-changed", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("saved-searches-changed", cb);
    window.removeEventListener("storage", cb);
  };
}

let cache: { raw: string; list: SavedSearch[] } = { raw: "", list: [] };
function snapshot(): SavedSearch[] {
  const list = readSavedSearches();
  const raw = JSON.stringify(list);
  if (raw !== cache.raw) cache = { raw, list };
  return cache.list;
}
const empty: SavedSearch[] = [];

export function SavedSearchList() {
  const searches = useSyncExternalStore(subscribe, snapshot, () => empty);
  return (
    <section aria-labelledby="saved-searches" className="mt-10">
      <h2 id="saved-searches" className="text-xl font-semibold text-ink">
        Saved searches
      </h2>
      {searches.length === 0 ? (
        <p className="mt-2 text-sm text-ink/80">
          None yet. Use &ldquo;Save this search&rdquo; on any results page.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {searches.map((s) => (
            <li
              key={s.url}
              className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-surface p-3 text-sm"
            >
              <Link
                href={s.url}
                className="font-medium text-accent underline underline-offset-4"
              >
                {s.label}
              </Link>
              <button
                type="button"
                onClick={() => removeSavedSearch(s.url)}
                className="min-h-10 px-2 text-secondary underline underline-offset-4 hover:text-danger"
              >
                Remove<span className="sr-only"> saved search {s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-secondary">
        Saved in this browser only. Email alerts for saved searches will start
        once an email service is approved.
      </p>
    </section>
  );
}
