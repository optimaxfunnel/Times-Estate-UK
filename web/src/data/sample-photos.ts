import type { PropertyImage } from "@/lib/property/types";

/**
 * DEMONSTRATION PHOTOS ONLY (CLAUDE.md Rule 2).
 *
 * Free stock photographs from Unsplash (Unsplash Licence: free for
 * commercial use; credit not required but given anyway), shown on the
 * fabricated sample listings in `demo-properties.ts` so the listing grid
 * looks like a listing grid. They are interiors, chosen so no photo shows
 * a real, identifiable address that could be mistaken for a property on
 * the market with Times Estate Ltd (Rule 1). Every card still carries the
 * "Sample property — not real" label, the property page says "Sample
 * photo — not this property", and each credit is shown there and
 * recorded in `brand/property-photos/LICENCES.md`.
 *
 * Applied at display time (see `toPublicProperty`) rather than written
 * into the stored records, so sample listings already saved in the live
 * database pick the photos up without being edited — and a real listing
 * (isDemo false) never does.
 *
 * Files live in `web/public/sample-photos/` (4:3, 640 and 1200 px wide).
 */
const UNSPLASH_LICENCE = "Unsplash Licence";
const UNSPLASH_LICENCE_URL = "https://unsplash.com/license";

function photo(
  file: string,
  alt: string,
  author: string,
  photoId: string,
): PropertyImage {
  return {
    url: `/sample-photos/${file}-1200.webp`,
    thumbnailUrl: `/sample-photos/${file}-640.webp`,
    alt,
    credit: {
      author,
      licence: UNSPLASH_LICENCE,
      licenceUrl: UNSPLASH_LICENCE_URL,
      sourceUrl: `https://unsplash.com/photos/${photoId}`,
    },
  };
}

export const SAMPLE_PHOTOS: Record<string, PropertyImage[]> = {
  "demo-res-sale-1": [
    photo(
      "living-room-fireplace",
      "Sample photo: a bright living room with a fireplace and built-in shelves",
      "Lotus Design N Print",
      "WgkA3CSFrjc",
    ),
  ],
  "demo-res-sale-2": [
    photo(
      "flat-living-room",
      "Sample photo: a light, simply furnished living room with a sofa and round coffee table",
      "Katja Rooke",
      "77JACslA8G0",
    ),
  ],
  "demo-res-let-1": [
    photo(
      "kitchen",
      "Sample photo: a fitted kitchen with dark grey cabinets and open shelves",
      "Collov Home Design",
      "-aDGbdTsBZg",
    ),
  ],
  "demo-res-let-2": [
    photo(
      "bedroom",
      "Sample photo: a calm bedroom with a made bed, cushions and bedside lamp",
      "Clay Banks",
      "UvVHCAz9mFY",
    ),
  ],
  "demo-com-sale-1": [
    photo(
      "warehouse",
      "Sample photo: an empty warehouse with a polished concrete floor",
      "Craftsman Concrete Floors",
      "3lkaszxWfGc",
    ),
  ],
  "demo-com-let-1": [
    photo(
      "retail-unit",
      "Sample photo: an empty retail unit ready for fitting out",
      "Ulises Ramirez",
      "aGgmKntVLJQ",
    ),
  ],
  "demo-com-let-2": [
    photo(
      "office",
      "Sample photo: an office suite with glass partitions and plants",
      "Caroline Badran",
      "B74lBYC3PXI",
    ),
  ],
};
