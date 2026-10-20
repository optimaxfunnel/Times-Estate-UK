import { cn } from "@/lib/cn";
import type { PublicProperty } from "@/lib/property/types";

/**
 * Stands in for a property photograph until real images are supplied
 * (Rule 2: no real photography exists, and none is invented). A simple
 * line illustration in the palette's own tints — obviously an
 * illustration, labelled "Sample image" in the corner — rather than a
 * grey box, so the listing grid still reads as a listing grid.
 */
export function PropertyImagePlaceholder({
  property,
  caption = true,
  className,
}: {
  property: PublicProperty;
  /** The listing card already carries a "Sample property" ribbon, so it turns this off to avoid two labels colliding. */
  caption?: boolean;
  className?: string;
}) {
  const kind = property.commercial
    ? "commercial"
    : property.residential?.propertyType === "flat" ||
        property.residential?.propertyType === "studio" ||
        property.residential?.propertyType === "maisonette"
      ? "flat"
      : "house";

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-gradient-to-br from-accent-tint via-accent-tint/60 to-secondary/20",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full text-ink/35"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {kind === "house" && (
          <>
            <path d="M80 300V150l120-90 120 90v150" />
            <path d="M140 300v-90h60v90M230 180h50v50h-50zM250 95V60h25v60" />
            <path d="M20 300h360" />
          </>
        )}
        {kind === "flat" && (
          <>
            <path d="M90 300V70h220v230" />
            <path d="M120 100h40v40h-40zM180 100h40v40h-40zM240 100h40v40h-40zM120 170h40v40h-40zM180 170h40v40h-40zM240 170h40v40h-40zM120 240h40v60M240 240h40v60" />
            <path d="M20 300h360" />
          </>
        )}
        {kind === "commercial" && (
          <>
            <path d="M40 300V130h160v170M200 300V60h130v240" />
            <path d="M70 160h30v30H70zM120 160h30v30h-30zM70 220h30v30H70zM120 220h30v30h-30zM225 90h30v30h-30zM275 90h30v30h-30zM225 150h30v30h-30zM275 150h30v30h-30zM225 210h30v30h-30zM275 210h30v30h-30z" />
            <path d="M10 300h380" />
          </>
        )}
      </svg>
      {caption && (
        <span className="absolute bottom-2 right-2 rounded-sm bg-ink/70 px-1.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-white">
          Sample image
        </span>
      )}
    </div>
  );
}
