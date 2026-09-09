import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";

/**
 * Mocks matchMedia so we can control `prefers-reduced-motion` per test,
 * exactly as a real browser would report it — the only reliable way to
 * test this behaviour without an actual OS-level preference, which no
 * browser automation tool used on this project can set (see QA_REPORT.md,
 * Phase 6, "reduced motion" section, for why this test exists).
 */
function mockMatchMedia(reduced: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? reduced : false,
    media: query,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) =>
      listeners.push(cb),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
  return {
    triggerChange: (matches: boolean) =>
      listeners.forEach((cb) => cb({ matches } as MediaQueryListEvent)),
  };
}

describe("HeroSlideshow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("does not auto-advance when the visitor prefers reduced motion", () => {
    mockMatchMedia(true);
    render(<HeroSlideshow />);

    expect(screen.getByLabelText("1 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    act(() => {
      vi.advanceTimersByTime(20000);
    });

    // Still on the first slide — autoplay never started.
    expect(screen.getByLabelText("1 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(
      screen.getByRole("button", { name: "Play slideshow" }),
    ).toBeInTheDocument();
  });

  it("auto-advances every 6 seconds when motion is not reduced", () => {
    mockMatchMedia(false);
    render(<HeroSlideshow />);

    expect(screen.getByLabelText("1 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.getByLabelText("2 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  it("stops autoplay when the visitor's OS preference changes mid-session", () => {
    const { triggerChange } = mockMatchMedia(false);
    render(<HeroSlideshow />);

    act(() => {
      triggerChange(true);
    });

    expect(
      screen.getByRole("button", { name: "Play slideshow" }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(20000);
    });
    expect(screen.getByLabelText("1 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  it("supports manual, keyboard-operable navigation via next/previous/dot controls", () => {
    // fireEvent (not userEvent) deliberately: userEvent's internal pointer-
    // event choreography relies on real timers even with delay:null, which
    // deadlocks against vi.useFakeTimers() above. fireEvent still exercises
    // the same onClick handlers the keyboard/mouse would trigger via a real
    // <button>, which is what's actually under test here.
    mockMatchMedia(true);
    render(<HeroSlideshow />);

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByLabelText("2 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(screen.getByLabelText("1 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    fireEvent.click(
      screen.getByRole("tab", { name: "Show slide 3: Commercial property" }),
    );
    expect(screen.getByLabelText("3 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  it("exposes a persistent pause/play control, per WCAG 2.2.2 for auto-updating content", () => {
    mockMatchMedia(false);
    render(<HeroSlideshow />);

    const pauseButton = screen.getByRole("button", {
      name: "Pause slideshow",
    });
    expect(pauseButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(pauseButton);
    expect(
      screen.getByRole("button", { name: "Play slideshow" }),
    ).toHaveAttribute("aria-pressed", "false");

    act(() => {
      vi.advanceTimersByTime(12000);
    });
    // Paused — still on slide 1 despite two autoplay intervals elapsing.
    expect(screen.getByLabelText("1 of 4")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });
});
