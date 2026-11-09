"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const SEEN_KEY = "te_intro_seen";
const VIDEO_SRC = "/intro/times-estate-intro.mp4";
const POSTER_SRC = "/intro/times-estate-intro-poster.jpg";

/**
 * Full-screen intro (the owner's 10-second animated logo, re-supplied
 * 2026-11-02) shown the first time a visitor opens the website, whichever
 * page they land on. Not shown in the staff admin area.
 *
 * Sound: the owner asked for the video to play WITH sound. Every major
 * browser blocks sound on autoplay until the visitor has interacted with
 * the site (Chrome/Edge "autoplay policy", Safari, Firefox). A website
 * cannot change that setting in the visitor's browser. So the intro:
 *   1. tries to play with sound (works where the browser allows it, e.g.
 *      a returning visitor Chrome has learned plays media, or a browser
 *      where the owner has allowed sound for the site);
 *   2. if the browser refuses, plays muted and shows a large
 *      "Play with sound" button; one tap restarts it from the start
 *      with sound.
 * "Skip intro", Escape, or the video ending closes it. It shows once per
 * browser session (sessionStorage); add `?intro=1` to the URL to force it.
 * Visitors who ask for reduced motion get it paused with a play button
 * rather than auto-playing.
 */
export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  // Whether to show it is read from the URL and sessionStorage, which only
  // exist in the browser: the server snapshot is "no", so the server HTML
  // never contains the overlay and hydration stays consistent.
  const shouldShow = useSyncExternalStore(
    subscribeNever,
    readShouldShow,
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);
  const [closing, setClosing] = useState(false);
  // `closing` keeps it mounted for the fade-out after sessionStorage is set.
  const open = (shouldShow || closing) && !dismissed;
  // "sound" = playing with sound, "muted" = browser blocked sound,
  // "paused" = nothing playing yet (blocked entirely or reduced motion).
  const [mode, setMode] = useState<"sound" | "muted" | "paused">("paused");

  const close = useCallback(() => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    videoRef.current?.pause();
    setClosing(true);
    window.setTimeout(() => setDismissed(true), 400);
  }, []);

  // Start playback once the overlay is in the DOM.
  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;
    if (!reduceMotion) {
      video.muted = false;
      video
        .play()
        .then(() => !cancelled && setMode("sound"))
        .catch(() => {
          if (cancelled) return;
          // Sound refused by the browser: play silently instead.
          video.muted = true;
          video
            .play()
            .then(() => !cancelled && setMode("muted"))
            .catch(() => !cancelled && setMode("paused"));
        });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // A tap is a user gesture, so the browser now allows sound.
  const playWithSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video
      .play()
      .then(() => setMode("sound"))
      .catch(() => setMode("paused"));
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Times Estate Ltd intro video"
      data-intro-video
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-white transition-opacity duration-400 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        playsInline
        preload="auto"
        onEnded={close}
        onClick={mode === "sound" ? undefined : playWithSound}
        className="h-full w-full object-contain"
      />

      {mode !== "sound" && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-6 left-1/2 inline-flex whitespace-nowrap -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-semibold text-white shadow-lg ring-2 ring-accent-vivid transition hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] sm:text-lg"
        >
          <SpeakerIcon />
          {mode === "paused" ? "Play intro with sound" : "Play with sound"}
        </button>
      )}

      <button
        ref={skipRef}
        type="button"
        onClick={close}
        className="absolute right-4 top-4 rounded-full border border-border-strong bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-accent-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:right-6 sm:top-6"
      >
        Skip intro
      </button>
    </div>
  );
}

// Nothing outside React changes these values while the page is open.
function subscribeNever() {
  return () => {};
}

function readShouldShow(): boolean {
  if (window.location.pathname.startsWith("/admin")) return false;
  try {
    if (new URLSearchParams(window.location.search).get("intro") === "1") {
      return true;
    }
  } catch {
    /* ignore */
  }
  try {
    return window.sessionStorage.getItem(SEEN_KEY) !== "1";
  } catch {
    return true; // storage blocked: show it
  }
}

function SpeakerIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </svg>
  );
}
