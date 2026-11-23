// Homepage hero photo slideshow (owner request 2026-11-23).
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { HERO_PHOTOS, HeroPhotoSlides } from "@/components/home/HeroPhotoSlides";

describe("hero photo slideshow", () => {
  it("has all three image sizes on disk for every photo", () => {
    for (const p of HERO_PHOTOS) {
      for (const w of [960, 1920, 2560]) {
        expect(fs.existsSync(path.join(process.cwd(), "public", "hero", `${p.slug}-${w}.webp`))).toBe(true);
      }
    }
  });

  it("credits every photo with its author, licence and source, as the licences require", () => {
    for (const p of HERO_PHOTOS) {
      expect(p.author.length).toBeGreaterThan(1);
      expect(p.licence).toMatch(/^CC BY(-SA)? \d\.\d$/);
      expect(p.licenceUrl).toMatch(/^https:\/\/creativecommons\.org\/licenses\/by(-sa)?\/\d\.\d\/$/);
      expect(p.source).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
    }
  });

  it("shows the current photo's credit and says it is not a property for sale", () => {
    render(<HeroPhotoSlides />);
    expect(screen.getByText("Quist").closest("a")).toHaveAttribute("href", HERO_PHOTOS[0].source);
    expect(screen.getByText(/not a property for sale/)).toBeInTheDocument();
  });

  it("can be paused and played (WCAG 2.2.2)", () => {
    render(<HeroPhotoSlides />);
    const button = screen.getByRole("button", { name: "Pause background photos" });
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "Play background photos" })).toBeInTheDocument();
  });

  it("moves forward on its own every 3 seconds, and stops when paused", () => {
    vi.useFakeTimers();
    try {
      render(<HeroPhotoSlides />);
      const dots = () => screen.getAllByRole("button", { name: /Show background photo/ });
      expect(dots()[0]).toHaveAttribute("aria-current", "true");
      act(() => vi.advanceTimersByTime(3000));
      expect(dots()[1]).toHaveAttribute("aria-current", "true");
      act(() => vi.advanceTimersByTime(3000));
      expect(dots()[2]).toHaveAttribute("aria-current", "true");
      fireEvent.click(screen.getByRole("button", { name: "Pause background photos" }));
      act(() => vi.advanceTimersByTime(9000));
      expect(dots()[2]).toHaveAttribute("aria-current", "true");
    } finally {
      vi.useRealTimers();
    }
  });

  it("plays automatically even for reduced-motion visitors (owner instruction), and Pause works", () => {
    const original = window.matchMedia;
    window.matchMedia = ((q: string) => ({
      matches: q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {},
    })) as unknown as typeof window.matchMedia;
    try {
      render(<HeroPhotoSlides />);
      fireEvent.click(screen.getByRole("button", { name: "Pause background photos" }));
      expect(screen.getByRole("button", { name: "Play background photos" })).toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });

  it("lets visitors pick a photo, and moves the credit with it", () => {
    render(<HeroPhotoSlides />);
    const dots = screen.getAllByRole("button", { name: /Show background photo/ });
    expect(dots).toHaveLength(HERO_PHOTOS.length);
    fireEvent.click(dots[1]);
    expect(dots[1]).toHaveAttribute("aria-current", "true");
    expect(screen.getByText(HERO_PHOTOS[1].author)).toBeInTheDocument();
  });

  it("downloads only the current and next photo at first", () => {
    const { container } = render(<HeroPhotoSlides />);
    const srcs = [...container.querySelectorAll("img")].map((i) => i.getAttribute("src"));
    expect(srcs).toEqual([`/hero/${HERO_PHOTOS[0].slug}-1920.webp`, `/hero/${HERO_PHOTOS[1].slug}-1920.webp`]);
  });

  it("keeps the photos hidden from screen readers (they are decorative)", () => {
    const { container } = render(<HeroPhotoSlides />);
    for (const img of container.querySelectorAll("img")) expect(img).toHaveAttribute("alt", "");
  });
});
