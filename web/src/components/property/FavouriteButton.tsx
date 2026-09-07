"use client";

import { useSyncExternalStore } from "react";
import { isFavourite, toggleFavourite } from "@/lib/favourites";
import { cn } from "@/lib/cn";

function subscribe(callback: () => void) {
  window.addEventListener("favourites-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("favourites-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Uses useSyncExternalStore (rather than useState+useEffect) so this
 * correctly and safely reads a browser-only store (localStorage) without
 * a server/client hydration mismatch: the server snapshot is always
 * "not saved", and the real value is read as soon as the client hydrates.
 */
export function FavouriteButton({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const saved = useSyncExternalStore(
    subscribe,
    () => isFavourite(propertyId),
    () => false,
  );

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        toggleFavourite(propertyId);
      }}
      className={cn(
        "text-sm font-medium text-ink/70 hover:text-accent",
        saved && "text-accent",
        className,
      )}
    >
      {saved ? "★ Saved" : "☆ Save"}
    </button>
  );
}
