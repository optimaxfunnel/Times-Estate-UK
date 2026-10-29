"use client";

/**
 * Saved-search foundation: a search is just its URL (every filter lives
 * in the query string), so saving one means remembering that URL. Kept
 * per-browser in localStorage, like favourites — no account, nothing
 * sent anywhere. When accounts and an email provider are approved, the
 * same {label, url} records become server-side saved searches that the
 * property-alert sender can match against.
 */
export interface SavedSearch {
  label: string;
  url: string;
  savedAt: string;
}

const KEY = "times-estate-saved-searches";
const MAX = 20;

export function readSavedSearches(): SavedSearch[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedSearch[]) : [];
  } catch {
    return [];
  }
}

function write(list: SavedSearch[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
    window.dispatchEvent(new CustomEvent("saved-searches-changed"));
  } catch {
    // Storage unavailable (private browsing) — saving simply won't persist.
  }
}

export function saveSearch(label: string, url: string) {
  const rest = readSavedSearches().filter((s) => s.url !== url);
  write([{ label, url, savedAt: new Date().toISOString() }, ...rest]);
}

export function removeSavedSearch(url: string) {
  write(readSavedSearches().filter((s) => s.url !== url));
}

export function isSearchSaved(url: string) {
  return readSavedSearches().some((s) => s.url === url);
}
