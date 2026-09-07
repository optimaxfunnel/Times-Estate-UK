"use server";

import { propertyProvider } from "@/lib/property/provider";
import { PUBLICLY_VISIBLE_STATUSES, toPublicProperty, type PublicProperty } from "@/lib/property/types";

/** Used by the client-side Favourites page to resolve localStorage IDs into real property data. */
export async function getFavouriteProperties(ids: string[]): Promise<PublicProperty[]> {
  const results = await Promise.all(ids.map((id) => propertyProvider.getById(id)));
  return results
    .filter((p): p is NonNullable<typeof p> => p !== null && PUBLICLY_VISIBLE_STATUSES.includes(p.status))
    .map(toPublicProperty);
}
