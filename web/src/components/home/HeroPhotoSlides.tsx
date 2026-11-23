"use client";

import { useEffect, useReducer, useState } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

/**
 * Sliding background photos for the homepage hero (owner request
 * 2026-11-23). The headline and search card stay still; only the photos
 * behind them change, every 3 seconds, moving forward automatically
 * (owner instruction 2026-11-23: "bright and clear", "changes after
 * every 3 sec").
 *
 * PHOTOS: openly licensed London scenes from Wikimedia Commons, NOT Times
 * Estate Ltd properties, and never captioned as listings (Rule 1). Each
 * licence requires a credit, shown for the current photo with links to
 * its source and licence. Full record: brand/hero-photos/LICENCES.md.
 *
 * ACCESSIBILITY (WCAG 2.2): a pause control for moving content (2.2.2);
 * dots are real buttons with labels; the photos are decorative (alt=""),
 * so screen readers skip them. Visitors who ask their device for reduced
 * motion still see the photos change (owner's instruction), but as an
 * instant swap with no fade, and can stop them with the pause button.
 */
export const HERO_PHOTOS = [
  {
    slug: "city-skyline-dusk",
    position: "60% 50%",
    author: "Quist",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/w/index.php?curid=81369872",
  },
  {
    slug: "richmond-green-victorian-houses",
    position: "50% 50%",
    author: "Maxwell Hamilton",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
    source: "https://commons.wikimedia.org/w/index.php?curid=41205695",
  },
  {
    slug: "city-skyline-thames",
    position: "50% 50%",
    author: "Colin and Kim Hansen",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/w/index.php?curid=48935921",
  },
  {
    slug: "redcliffe-square",
    position: "50% 50%",
    author: "Chemical Engineer",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/w/index.php?curid=21570838",
  },
  {
    slug: "queen-annes-gate",
    position: "50% 50%",
    author: "Alan Stanton",
    licence: "CC BY-SA 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    source: "https://commons.wikimedia.org/w/index.php?curid=22412237",
  },
] as const;

const INTERVAL_MS = 3000;

/**
 * Which photo is showing, and which photos the browser may download.
 * Only the current photo and the next one are fetched; others load when
 * their turn approaches, so a first visit (especially on a phone) does
 * not download all five.
 */
type SlideState = { index: number; loaded: ReadonlySet<number> };
const COUNT = HERO_PHOTOS.length;
function show(state: SlideState, to: number): SlideState {
  const loaded = new Set(state.loaded);
  loaded.add(to);
  loaded.add((to + 1) % COUNT);
  return { index: to, loaded };
}
function slideReducer(state: SlideState, action: { type: "next" } | { type: "go"; to: number }): SlideState {
  return show(state, action.type === "next" ? (state.index + 1) % COUNT : action.to);
}

export function HeroPhotoSlides() {
  const [{ index, loaded }, dispatch] = useReducer(slideReducer, { index: 0, loaded: new Set([0, 1]) });
  const setIndex = (to: number) => dispatch({ type: "go", to });
  // Plays automatically for everyone until the visitor presses Pause.
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => dispatch({ type: "next" }), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  const current = HERO_PHOTOS[index];

  return (
    <>
      {/* Photo layers: cross-fade (no fade when reduced motion is requested). */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {HERO_PHOTOS.map((photo, i) => loaded.has(i) && (
          // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP with srcSet; no optimiser needed
          <img
            key={photo.slug}
            src={`/hero/${photo.slug}-1920.webp`}
            srcSet={`/hero/${photo.slug}-960.webp 960w, /hero/${photo.slug}-1920.webp 1920w, /hero/${photo.slug}-2560.webp 2560w`}
            sizes="100vw"
            alt=""
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            style={{ objectPosition: photo.position }}
            className={cn(
              "absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-700",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {/* Shading only where text sits, so the photos stay bright and
            clear: a left-hand fade behind the headline on wide screens, a
            top-down fade on phones (where the text sits at the top), a
            bottom fade behind the controls, and a small backing behind
            the credit. Measured to keep
            white text at 4.5:1 or better — see TEST_REPORT.md. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(20_20_20/0.66)_0%,rgb(20_20_20/0.6)_42%,rgb(20_20_20/0.1)_72%)] lg:bg-[linear-gradient(to_right,rgb(20_20_20/0.78)_0%,rgb(20_20_20/0.62)_42%,transparent_68%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>

      {/* Controls and the licence credit for the photo on screen. */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <Container size="wide" className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause background photos" : "Play background photos"}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white/15"
            >
              {playing ? (
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
              ) : (
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current"><path d="M4 2.5v11l9.5-5.5z" /></svg>
              )}
            </button>
            {HERO_PHOTOS.map((photo, i) => (
              <button
                key={photo.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show background photo ${i + 1} of ${HERO_PHOTOS.length}`}
                aria-current={i === index ? "true" : undefined}
                className="inline-flex h-6 w-6 items-center justify-center"
              >
                <span
                  aria-hidden
                  className={cn(
                    "block h-2 rounded-full bg-white motion-safe:transition-all",
                    i === index ? "w-5 opacity-100" : "w-2 opacity-60",
                  )}
                />
              </button>
            ))}
          </div>
          <p className="rounded-sm bg-ink/60 px-1.5 py-0.5 text-[0.7rem] text-white">
            Photo:{" "}
            <a href={current.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              {current.author}
            </a>
            ,{" "}
            <a href={current.licenceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              {current.licence}
            </a>{" "}
            · London scene, not a property for sale
          </p>
        </Container>
      </div>
    </>
  );
}
