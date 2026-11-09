import { cn } from "@/lib/cn";

/**
 * The horizontal logo lockup: the owner-supplied clock-and-skyline
 * emblem beside the "TIMES ESTATE LTD / LONDON PROPERTY EXPERTS"
 * wordmark.
 *
 * The wordmark is live text, not part of the image, for two reasons:
 * the supplied file's wordmark is unusable (a share button is baked
 * into it — see brand/build-supplied-logo.mjs), and text set in the
 * site's own heading face and colour tokens stays crisp at every size
 * and never drifts from the palette. The emblem is decorative here
 * (`alt=""`) because the text beside it already spells the name; the
 * link that wraps the lockup carries the accessible name.
 */
const SIZES = {
  sm: {
    emblem: "h-9",
    name: "text-[1.05rem]",
    tagline: "text-[0.45rem] tracking-[0.28em]",
  },
  /** Header: steps up with the viewport so the lockup, phone and menu button all fit at 360px wide. */
  md: {
    emblem: "h-9 sm:h-11 lg:h-13",
    name: "text-[0.95rem] sm:text-[1.2rem] lg:text-[1.45rem]",
    tagline:
      "text-[0.42rem] tracking-[0.26em] sm:text-[0.5rem] sm:tracking-[0.3em] lg:text-[0.58rem]",
  },
} as const;

export function BrandLockup({
  size = "md",
  className,
}: {
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <picture className="contents">
        <source
          type="image/webp"
          // Right-sized copies of the owner-supplied emblem (shown at most
          // ~100px wide); the 400/800px originals stay untouched in /brand.
          srcSet="/brand/times-estate-ltd-emblem-120.webp 1x, /brand/times-estate-ltd-emblem-240.webp 2x, /brand/times-estate-ltd-emblem-360.webp 3x"
        />
        <img
          src="/brand/times-estate-ltd-emblem.png"
          alt=""
          width={400}
          height={208}
          className={cn("w-auto", s.emblem)}
        />
      </picture>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading font-black uppercase tracking-tight whitespace-nowrap",
            s.name,
          )}
        >
          <span className="text-ink">Times </span>
          <span className="text-accent">Estate Ltd</span>
        </span>
        <span
          className={cn(
            "mt-1 font-semibold uppercase whitespace-nowrap text-ink/70",
            s.tagline,
          )}
        >
          London Property Experts
        </span>
      </span>
    </span>
  );
}
