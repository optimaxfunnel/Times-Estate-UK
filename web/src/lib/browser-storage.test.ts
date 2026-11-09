// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
// Favourites and saved searches live only in the visitor's own browser.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getFavouriteIds, isFavourite, toggleFavourite } from "@/lib/favourites";
import { isSearchSaved, readSavedSearches, removeSavedSearch, saveSearch } from "@/lib/saved-searches";

beforeEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("favourites", () => {
  it("toggles a property on and off", () => {
    expect(toggleFavourite("demo-res-sale-1")).toBe(true);
    expect(isFavourite("demo-res-sale-1")).toBe(true);
    expect(toggleFavourite("demo-res-sale-1")).toBe(false);
    expect(getFavouriteIds()).toEqual([]);
  });

  it("copes with corrupted storage", () => {
    window.localStorage.setItem("times-estate-favourites", "{not json");
    expect(getFavouriteIds()).toEqual([]);
  });

  it("does not crash when storage is blocked (private browsing)", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => toggleFavourite("x")).not.toThrow();
  });
});

describe("saved searches", () => {
  it("saves newest first without duplicates, and removes", () => {
    saveSearch("Flats in SW17", "/rent?location=SW17");
    saveSearch("Houses", "/buy?propertyType=terraced_house");
    saveSearch("Flats in SW17 again", "/rent?location=SW17");
    expect(readSavedSearches().map((s) => s.label)).toEqual(["Flats in SW17 again", "Houses"]);
    removeSavedSearch("/buy?propertyType=terraced_house");
    expect(isSearchSaved("/buy?propertyType=terraced_house")).toBe(false);
  });

  it("keeps at most 20", () => {
    for (let i = 0; i < 25; i++) saveSearch(`s${i}`, `/buy?page=${i}`);
    expect(readSavedSearches()).toHaveLength(20);
  });
});
