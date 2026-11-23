import type { PropertyImage } from "@/lib/property/types";

export function PropertyGallery({
  images,
  isDemo = false,
}: {
  images: PropertyImage[];
  /** Sample listing: say plainly the photos are stock, not the property. */
  isDemo?: boolean;
}) {
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
  return (
    <div>
      {isDemo && (
        <p className="mb-2 text-sm text-ink/70">
          <span className="mr-2 rounded-sm bg-warning-text px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
            Sample photo
          </span>
          Stock photographs for a demonstration listing — not this property.
        </p>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        {images.map((image, i) => (
          <figure key={image.url} className={i === 0 ? "sm:col-span-2" : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.alt}
              width={1200}
              height={900}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            {image.credit && (
              <figcaption className="mt-1 text-xs text-ink/60">
                Photo:{" "}
                <a
                  href={image.credit.sourceUrl}
                  className="underline underline-offset-2 hover:text-accent"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {image.credit.author}
                </a>
                ,{" "}
                {image.credit.licenceUrl ? (
                  <a
                    href={image.credit.licenceUrl}
                    className="underline underline-offset-2 hover:text-accent"
                    rel="noopener noreferrer license"
                    target="_blank"
                  >
                    {image.credit.licence}
                  </a>
                ) : (
                  image.credit.licence
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
