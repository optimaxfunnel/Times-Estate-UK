"use client";

import { useSyncExternalStore } from "react";
import { isFavourite, toggleFavourite } from "@/lib/favourites";
import { cn } from "@/lib/cn";
import { IconHeart } from "@/components/icons";

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
 *
 * `variant="icon"` is the round heart on listing cards (44×44px target,
 * WCAG 2.2 SC 2.5.8); the default text variant stays on the detail page.
 */
export function FavouriteButton({
  propertyId,
  variant = "text",
  className,
}: {
  propertyId: string;
  variant?: "text" | "icon";
  className?: string;
}) {
  const saved = useSyncExternalStore(
    subscribe,
    () => isFavourite(propertyId),
    () => false,
  );

  if (variant === "icon") {
    return (
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved properties" : "Save property"}
        onClick={(e) => {
          e.preventDefault();
          toggleFavourite(propertyId);
        }}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white hover:text-accent",
          saved && "text-accent",
          className,
        )}
      >
        <IconHeart filled={saved} className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        toggleFavourite(propertyId);
      }}
      // Matches the secondary Button beside it (Share this property), so
      // the two actions read as a pair at every width (Day 7 visual review).
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm border border-ink px-5 py-3 text-sm font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-white",
        saved && "border-accent text-accent",
        className,
      )}
    >
      <IconHeart filled={saved} className="h-4 w-4" />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
