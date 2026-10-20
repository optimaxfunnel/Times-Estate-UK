import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import {
  IconBuilding,
  IconHome,
  IconKey,
  IconPeople,
  IconTools,
} from "@/components/icons";

/**
 * The five-column service strip under the hero. The first four are the
 * confirmed service areas (BUSINESS_REQUIREMENTS.md). The fifth,
 * Construction, is the standing "mention only" treatment (SITEMAP.md
 * §14): it links to the construction phone line the owner's business
 * card carries rather than to a page of its own, and claims nothing
 * beyond "construction & renovation" — the only wording supplied.
 */
const SERVICES = [
  {
    title: "Sales",
    tags: ["Buy", "Sell", "Move"],
    href: "/sell",
    Icon: IconHome,
  },
  {
    title: "Lettings",
    tags: ["Tenants", "Landlords", "Trust"],
    href: "/let",
    Icon: IconKey,
  },
  {
    title: "Management",
    tags: ["Hassle free", "Expert support"],
    href: "/property-management",
    Icon: IconPeople,
  },
  {
    title: "Commercial",
    tags: ["Offices", "Retail", "Investment"],
    href: "/commercial",
    Icon: IconBuilding,
  },
  {
    title: "Construction",
    tags: [
      "Construction",
      "Renovation",
      `Call ${siteConfig.constructionPhone.value}`,
    ],
    href: "tel:+442086738555",
    Icon: IconTools,
  },
] as const;

export function ServiceStrip() {
  return (
    <section
      aria-label="Our services"
      className="border-b border-border bg-surface"
    >
      <Container size="wide" className="px-0 sm:px-0 lg:px-0">
        <ul className="grid grid-cols-2 divide-y divide-border sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
          {SERVICES.map(({ title, tags, href, Icon }) => {
            const inner = (
              <>
                <Icon className="h-7 w-7 text-accent" />
                <span className="mt-2 font-heading text-base font-bold text-ink">
                  {title}
                </span>
                <span className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-secondary">
                  {tags.map((tag, i) => (
                    <span key={tag} className="inline-flex items-center gap-2">
                      {i > 0 && (
                        <span
                          aria-hidden
                          className="inline-block h-1 w-1 rounded-full bg-accent"
                        />
                      )}
                      {tag}
                    </span>
                  ))}
                </span>
              </>
            );
            const className =
              "flex h-full flex-col items-center px-4 py-6 text-center transition-colors hover:bg-accent-tint/50";
            return (
              <li key={title} className="last:col-span-2 sm:last:col-span-1">
                {href.startsWith("tel:") ? (
                  <a href={href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className={className}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
