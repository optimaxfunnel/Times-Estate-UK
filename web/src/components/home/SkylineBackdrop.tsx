import { cn } from "@/lib/cn";

/**
 * Decorative backdrop for the dark hero and valuation bands: a warm
 * glow and a generic London-style skyline silhouette, echoing the
 * emblem. No photography has been supplied for the site (Rule 2 — none
 * is invented or stock-sourced without approval), so this illustration
 * is what stands in the reference's photo slots. The geometry is
 * generic — no specific real building is depicted.
 */
export function SkylineBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_110%,_var(--color-accent-vivid)_0%,_transparent_55%)] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" />
      <svg
        viewBox="0 0 1600 240"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-40 w-full text-black/60 sm:h-56"
        fill="currentColor"
      >
        <path d="M0 240V170h40v-30h20v-20h18v20h22v30h30v-60h16l8-28 8 28h16v60h40v-90h30v90h26v-40h40v40h28v-110l20-30 20 30v110h34v-50h50v50h30v-70h20V80h24v20h20v70h36v-30h60v30h26V60l16-24 16 24v110h40v-40h44v40h30v-90h60v90h24v-60l22-18 22 18v60h40v-30h50v30h30V90h28V60h24v30h28v80h40v-50h46v50h30v-80l18-20 18 20v80h40v-40h48v40h30v-60h36v60h40v-30h60v30h30v-90h26v90H1600v70Z" />
        <path
          d="M0 240V200h1600v40Z"
          className="text-black/70"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
