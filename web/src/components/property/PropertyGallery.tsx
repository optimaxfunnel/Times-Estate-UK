import type { PropertyImage } from "@/lib/property/types";

export function PropertyGallery({ images }: { images: PropertyImage[] }) {
  if (images.length === 0) {
    return (
      <div
        role="img"
        aria-label="No photograph has been supplied for this property yet"
        className="flex h-72 items-center justify-center rounded-sm bg-secondary/10 text-sm text-secondary sm:h-96"
      >
        Photograph not yet supplied
      </div>
    );
  }
  // Real <img> rendering intentionally deferred: no genuine property
  // photography exists yet (see /CONTENT_REQUIRED.md). This branch is
  // ready for when images.url values are real, verified assets.
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {images.map((image) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={image.url}
          src={image.url}
          alt={image.alt}
          // Reserves space before the real image loads (CLS) — a fixed
          // width/height attribute pair isn't possible here since a real
          // photograph's dimensions vary per file, unlike the logo's fixed
          // SVG viewBox elsewhere.
          className="aspect-[4/3] w-full rounded-sm object-cover"
        />
      ))}
    </div>
  );
}
