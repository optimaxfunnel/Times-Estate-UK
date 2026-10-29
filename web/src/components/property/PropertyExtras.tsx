import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { PropertyMedia, PublicProperty } from "@/lib/property/types";
import { siteConfig } from "@/lib/site-config";

/** Floor plans, brochure and virtual tour — each shown, or honestly marked as not supplied. */
export function PropertyDocuments({ media }: { media: PropertyMedia }) {
  return (
    <section aria-labelledby="documents-heading">
      <h2 id="documents-heading" className="text-xl font-semibold text-ink">
        Floor plans, brochure and tour
      </h2>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
        <li className="rounded-sm border border-border bg-surface p-3">
          <span className="font-medium text-ink">Floor plan</span>
          {media.floorPlans.length > 0 ? (
            <ul className="mt-1">
              {media.floorPlans.map((fp) => (
                <li key={fp.url}>
                  <a
                    href={fp.url}
                    className="text-accent underline underline-offset-4"
                  >
                    {fp.alt || "View floor plan"}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <span className="mt-1 block text-secondary">Not yet supplied</span>
          )}
        </li>
        <li className="rounded-sm border border-border bg-surface p-3">
          <span className="font-medium text-ink">Brochure</span>
          {media.brochureUrl ? (
            <a
              href={media.brochureUrl}
              className="mt-1 block text-accent underline underline-offset-4"
            >
              Download brochure
            </a>
          ) : (
            <span className="mt-1 block text-secondary">Not yet supplied</span>
          )}
        </li>
        <li className="rounded-sm border border-border bg-surface p-3">
          <span className="font-medium text-ink">Video or virtual tour</span>
          {media.virtualTourUrl ? (
            <a
              href={media.virtualTourUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-accent underline underline-offset-4"
            >
              Open tour<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="mt-1 block text-secondary">Not yet supplied</span>
          )}
        </li>
      </ul>
    </section>
  );
}

/**
 * Energy Performance Certificate block. An EPC rating must appear in
 * property adverts (EPB Regulations 2012); when none is recorded the
 * page says so plainly rather than leaving the reader to wonder.
 */
export function EpcPanel({ property }: { property: PublicProperty }) {
  const rating =
    property.residential?.epcRating ?? property.commercial?.energyRating;
  return (
    <section
      aria-labelledby="epc-heading"
      className="rounded-sm border border-border bg-surface p-4"
    >
      <h2 id="epc-heading" className="text-lg font-semibold text-ink">
        Energy performance (EPC)
      </h2>
      {rating ? (
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink">
          Rating <span className="text-xl font-bold">{rating}</span>
          <span className="text-secondary">
            — to be checked against the certificate before a real listing goes
            live
          </span>
        </p>
      ) : (
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink">
          EPC not yet recorded for this property <Badge status="missing" />
        </p>
      )}
    </section>
  );
}

/** Contact route beside the viewing form. */
export function PropertyContact() {
  return (
    <div className="rounded-sm border border-border bg-surface p-6">
      <h2 className="text-lg font-semibold text-ink">Prefer to talk?</h2>
      <p className="mt-2 text-sm text-ink/80">
        Call{" "}
        <a
          href="tel:+442086728080"
          className="font-semibold text-accent underline underline-offset-4"
        >
          {siteConfig.phoneLandline.value}
        </a>{" "}
        and quote the property address, or{" "}
        <Link
          href="/contact"
          className="text-accent underline underline-offset-4"
        >
          send us a message
        </Link>
        .
      </p>
    </div>
  );
}
