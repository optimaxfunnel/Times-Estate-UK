"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Every slide is a labelled placeholder — no real photography has been
 * supplied yet (Rule 2). Text only, so nothing here depends on an image
 * file existing.
 */
const SLIDES = [
  {
    id: "residential-sales",
    eyebrow: "Residential sales",
    caption: "Sample image — not a real Times Estate Ltd property",
  },
  {
    id: "residential-lettings",
    eyebrow: "Residential lettings",
    caption: "Sample image — not a real Times Estate Ltd property",
  },
  {
    id: "commercial",
    eyebrow: "Commercial property",
    caption: "Sample image — not a real Times Estate Ltd property",
  },
  {
    id: "property-management",
    eyebrow: "Property management",
    caption: "Sample image — not a real Times Estate Ltd property",
  },
] as const;

const AUTOPLAY_MS = 6000;

/**
 * A full-width, auto-rotating banner (Foxtons.co.uk-style structure only —
 * not its branding, colours or code). Built to the WAI-ARIA carousel
 * pattern: a persistent pause control (WCAG 2.2.2, since this content
 * moves on its own), true keyboard support, and autoplay that stops
 * entirely — not just slows down — under prefers-reduced-motion, which a
 * CSS transition-duration override alone can't do for a JS interval.
 */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  // Lazy initial state (not an effect) so the very first render already
  // respects the visitor's preference instead of starting autoplaying and
  // stopping a tick later.
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [announcement, setAnnouncement] = useState("");
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setPlaying(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  const goTo = useCallback((next: number, announce = true) => {
    const wrapped = (next + SLIDES.length) % SLIDES.length;
    setIndex(wrapped);
    if (announce) {
      setAnnouncement(
        `Slide ${wrapped + 1} of ${SLIDES.length}: ${SLIDES[wrapped].eyebrow}`,
      );
    }
  }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Times Estate Ltd — property highlights"
      className="relative isolate overflow-hidden bg-ink"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!query.matches) setPlaying(true);
      }}
      onFocus={() => setPlaying(false)}
    >
      <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 flex items-end bg-gradient-to-br from-secondary/40 via-ink to-ink/80 transition-opacity duration-700",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 14px)",
            }}
          >
            <div className="p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-vivid">
                {slide.eyebrow}
              </p>
              <p className="mt-2 max-w-sm text-sm text-white/70">
                {slide.caption}
              </p>
            </div>
          </div>
        ))}

        {/* Manual controls */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink hover:bg-white"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 6l-6 6 6 6"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink hover:bg-white"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6l6 6-6 6"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <div className="flex" role="tablist" aria-label="Choose slide">
            {SLIDES.map((slide, i) => (
              // The visible dot stays small and unobtrusive; the button
              // itself is padded out to a 24x24px hit area (WCAG 2.2 SC
              // 2.5.8, Target Size Minimum) rather than shrinking the
              // clickable/tappable region to match the dot's own size.
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1}: ${slide.eyebrow}`}
                onClick={() => goTo(i)}
                className="group flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    i === index
                      ? "bg-accent-vivid"
                      : "bg-white/50 group-hover:bg-white/80",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={playing}
            onClick={() => setPlaying((p) => !p)}
            className="rounded-full bg-white/90 p-2 text-ink hover:bg-white"
          >
            {playing ? (
              <>
                <span className="sr-only">Pause slideshow</span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                </svg>
              </>
            ) : (
              <>
                <span className="sr-only">Play slideshow</span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      <div ref={regionRef} aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </section>
  );
}
