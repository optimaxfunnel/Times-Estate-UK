"use client";

import { useSyncExternalStore } from "react";
import {
  isSearchSaved,
  removeSavedSearch,
  saveSearch,
} from "@/lib/saved-searches";

function subscribe(cb: () => void) {
  window.addEventListener("saved-searches-changed", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("saved-searches-changed", cb);
    window.removeEventListener("storage", cb);
  };
}

/** Saves the current search URL in this browser (see lib/saved-searches.ts). */
export function SaveSearchButton({
  url,
  label,
}: {
  url: string;
  label: string;
}) {
  const saved = useSyncExternalStore(
    subscribe,
    () => isSearchSaved(url),
    () => false,
  );
  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => (saved ? removeSavedSearch(url) : saveSearch(label, url))}
      className="inline-flex min-h-10 items-center rounded-sm border border-border-strong px-3 text-sm font-medium text-ink hover:border-accent hover:text-accent"
    >
      {saved ? "Search saved ✓" : "Save this search"}
    </button>
  );
}
