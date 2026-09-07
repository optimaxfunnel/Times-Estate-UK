"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { getFavouriteIds } from "@/lib/favourites";
import { getFavouriteProperties } from "@/lib/property/actions";
import type { PublicProperty } from "@/lib/property/types";

export default function FavouritesPage() {
  const [properties, setProperties] = useState<PublicProperty[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const ids = getFavouriteIds();
      const result = await getFavouriteProperties(ids);
      if (!cancelled) setProperties(result);
    }
    load();
    window.addEventListener("favourites-changed", load);
    return () => {
      cancelled = true;
      window.removeEventListener("favourites-changed", load);
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Favourites"
        title="Your saved properties"
        intro="Saved to this browser only — not linked to an account, so they won't follow you to another device."
      />
      <Section>
        {properties === null ? (
          <p className="text-sm text-ink/70">Loading…</p>
        ) : properties.length === 0 ? (
          <p className="text-sm text-ink/70">
            You haven&rsquo;t saved any properties yet. Use the
            &ldquo;Save&rdquo; button on any property to add it here.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
