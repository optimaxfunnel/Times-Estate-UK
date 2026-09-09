import { siteConfig } from "@/lib/site-config";
import { env } from "@/lib/env";
import { getEnabledSocialProfiles } from "@/lib/social-config";
import type { PublicProperty } from "@/lib/property/types";

/**
 * Structured data built only from facts already Confirmed (or explicitly
 * flagged otherwise) in /CONTENT_VERIFICATION_REGISTER.md. Nothing here
 * invents a phone number, a review, a rating, or an office that isn't in
 * that register — see /SEO_PLAN.md, "Structured data" section, for the
 * policy this file implements.
 */

/**
 * Sitewide RealEstateAgent/Organization markup. Deliberately omits
 * `telephone`, `email`, `aggregateRating` and `review` — none of these
 * are Confirmed facts today (see BUSINESS_REQUIREMENTS.md), and emitting
 * them with placeholder or invented values would itself be exactly the
 * kind of misleading structured data CLAUDE.md Rule 1 and today's brief
 * both prohibit. Add each field here only once its register row reaches
 * Confirmed/Verified.
 */
export function organizationJsonLd() {
  const socialUrls = getEnabledSocialProfiles()
    .map((p) => p.url)
    .filter((url): url is string => !!url);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.displayName.value,
    legalName: siteConfig.legalName.value,
    url: env.NEXT_PUBLIC_SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "145 Upper Tooting Road",
      addressLocality: "London",
      postalCode: "SW17 7TJ",
      addressCountry: "GB",
    },
    // Only ever verified, enabled profiles reach here — see
    // lib/social-config.ts. Omitted entirely (not an empty array) while
    // none are confirmed, since an empty `sameAs` is meaningless noise.
    ...(socialUrls.length > 0 && { sameAs: socialUrls }),
  };
}

/** BreadcrumbList markup for a page's position in the site hierarchy. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${env.NEXT_PUBLIC_SITE_URL}${item.path}`,
    })),
  };
}

/**
 * A single property listing's structured data — but only for a genuine
 * listing. Every property in the system today is fabricated demonstration
 * data (`isDemo: true`, see /DATA_MODEL.md); emitting RealEstateListing
 * markup for a fake property would risk a search engine treating
 * make-believe data as a real, indexable offer, which is exactly the
 * "misleading structured data" today's brief prohibits. This function
 * therefore returns `null` for any demo property — today, that means it
 * returns `null` for all of them, by design, until real listings exist.
 */
export function propertyJsonLd(
  property: PublicProperty,
): Record<string, unknown> | null {
  if (property.isDemo) return null;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    url: `${env.NEXT_PUBLIC_SITE_URL}/property/${property.id}`,
    name: property.displayAddress,
    description: property.summary,
    ...(property.media.images[0] && { image: property.media.images[0].url }),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      businessFunction:
        property.listingType === "sale"
          ? "https://schema.org/Sell"
          : "https://schema.org/LeaseOut",
    },
  };
}
