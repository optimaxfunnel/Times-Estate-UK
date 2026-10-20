import type { FacetOption } from "@/lib/property/facets";
import { IconArrowRight, IconPin } from "@/components/icons";

/**
 * The reference's "Search by Map" panel, built honestly: no map provider
 * has been approved or connected (Rule 4 — a third-party integration
 * needs the owner's sign-off, and most carry a cost; see
 * INTEGRATIONS.md), so instead of a fake map this panel offers the real
 * thing the map would do — browsing by area — as links built from the
 * areas actually present in the listings. The graphic behind the
 * heading is an abstract pattern, not a map of anywhere.
 */
export function AreaPanel({
  basePath,
  areas,
}: {
  basePath: string;
  areas: FacetOption[];
}) {
  return (
    <aside
      aria-labelledby="area-panel-heading"
      className="overflow-hidden rounded-sm border border-border bg-surface"
    >
      <div className="relative h-40 overflow-hidden bg-accent-tint">
        <svg
          aria-hidden
          viewBox="0 0 320 160"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-accent/30"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          {[30, 60, 90, 120, 150].map((r) => (
            <circle key={r} cx="160" cy="80" r={r} />
          ))}
          <path d="M0 80h320M160 0v160M40 0l240 160M280 0 40 160" />
        </svg>
        <IconPin className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-accent" />
      </div>
      <div className="p-4">
        <h2
          id="area-panel-heading"
          className="flex items-center gap-2 font-sans text-base font-bold text-ink"
        >
          <IconPin className="h-5 w-5 text-accent" />
          Search by Area
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink/60">
          An interactive map view will be switched on once a map provider is
          approved. Until then, browse by the areas in the current listings:
        </p>
        {areas.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {areas.map((area) => (
              <li key={area.value}>
                <a
                  href={`${basePath}?postcode=${encodeURIComponent(area.value)}`}
                  className="inline-flex items-center gap-1 rounded-sm border border-border px-2.5 py-1 text-xs font-medium text-ink hover:border-accent hover:text-accent"
                >
                  {area.label}
                  <span className="text-secondary">({area.count})</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs text-secondary">
            No areas in the current listings.
          </p>
        )}
        <a
          href={basePath}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-accent px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
        >
          View all properties
          <IconArrowRight className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
