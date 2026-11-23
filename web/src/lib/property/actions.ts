"use server";

import { propertyProvider } from "@/lib/property/provider";
import { tryDb } from "@/lib/db/safe";
import {
  PUBLICLY_VISIBLE_STATUSES,
  toPublicProperty,
  type PublicProperty,
} from "@/lib/property/types";

/**
 * Used by the client-side Favourites page to resolve localStorage IDs into
 * real property data. Returns `null` when the database is unreachable, so
 * the page can say so instead of claiming nothing is saved.
 */
export async function getFavouriteProperties(
  ids: string[],
): Promise<PublicProperty[] | null> {
  const loaded = await tryDb("favourites", () =>
    Promise.all(ids.map((id) => propertyProvider.getById(id))),
  );
  if (!loaded.ok) return null;
  const results = loaded.value;
  return results
    .filter(
      (p): p is NonNullable<typeof p> =>
        p !== null && PUBLICLY_VISIBLE_STATUSES.includes(p.status),
    )
    .map(toPublicProperty);
}
