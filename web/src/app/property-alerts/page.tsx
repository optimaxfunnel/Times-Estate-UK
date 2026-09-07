import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { AlertForm } from "@/components/forms/AlertForm";

export const metadata: Metadata = { title: "Property Alerts" };

export default async function PropertyAlertsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return (
    <>
      <PageHero
        eyebrow="Property Alerts"
        title="Be the first to hear about a suitable property"
        intro="Tell us what you're looking for and we'll email you when something matching becomes available."
      />
      <Section className="max-w-xl">
        <AlertForm
          defaults={{
            location: get("location"),
            minPrice: get("minPrice"),
            maxPrice: get("maxPrice"),
            listingType: get("listingType"),
            category: get("category"),
          }}
        />
      </Section>
    </>
  );
}
