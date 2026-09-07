"use client";

/**
 * Favourites are stored per-browser in localStorage only. No account or
 * server-side storage exists — this is a lightweight convenience, not a
 * synced "saved properties" feature. If a real user-account system is
 * approved later, this should move server-side so favourites survive
 * across devices.
 */
const STORAGE_KEY = "times-estate-favourites";

function readFavourites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavourites(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("favourites-changed"));
  } catch {
    // localStorage unavailable (private browsing, etc.) — fail silently,
    // favouriting simply won't persist for this visitor.
  }
}

export function isFavourite(propertyId: string): boolean {
  return readFavourites().includes(propertyId);
}

export function toggleFavourite(propertyId: string): boolean {
  const current = readFavourites();
  const next = current.includes(propertyId)
    ? current.filter((id) => id !== propertyId)
    : [...current, propertyId];
  writeFavourites(next);
  return next.includes(propertyId);
}

export function getFavouriteIds(): string[] {
  return readFavourites();
}
