import Link from "next/link";
import { headerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import {
  IconArrowRight,
  IconChevronDown,
  IconPhone,
  IconSearch,
} from "@/components/icons";

/**
 * Site header, laid out to the owner's 2026-10-20 reference: lockup ·
 * grouped navigation with dropdowns · search · "Get a Valuation" · phone.
 *
 * The dropdowns are CSS-only (`group-hover` / `group-focus-within`), so
 * they open for a mouse, for the keyboard (tabbing onto a group's link
 * reveals its menu, and the Tab key then walks through it) and need no
 * JavaScript. Each group's own label is a real link to its hub page,
 * so a touch tap — which has no hover — still goes somewhere sensible.
 */
export function Header() {
  return (
    <header className="relative z-30 border-b border-border bg-surface">
      <Container
        size="wide"
        className="flex h-18 items-center justify-between gap-4 lg:h-20"
      >
        {/* The lockup's own text ("Times Estate Ltd — London Property
            Experts") is this link's accessible name; an aria-label that
            didn't repeat it would fail WCAG 2.5.3 (Label in Name). */}
        <Link href="/" className="flex shrink-0 items-center rounded-sm">
          <BrandLockup />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center">
            {headerNav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-7 text-[0.8125rem] font-medium text-ink hover:text-accent"
                >
                  {item.label}
                  {item.children && (
                    <IconChevronDown className="h-3.5 w-3.5 text-ink/50 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full z-40 min-w-56 rounded-sm border border-border bg-surface py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-ink hover:bg-accent-tint hover:text-accent"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link
            href="/buy"
            aria-label="Search properties"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-accent-tint hover:text-accent"
          >
            <IconSearch className="h-5 w-5" />
          </Link>
          <Link
            href="/sell"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Get a Valuation
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:+442086728080"
            className="group/phone flex items-center gap-2 whitespace-nowrap rounded-sm text-ink"
          >
            <IconPhone className="h-6 w-6 text-accent" />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight group-hover/phone:text-accent">
                {siteConfig.phoneLandline.value}
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
                Call us today
              </span>
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <a
            href="tel:+442086728080"
            aria-label={`Call ${siteConfig.displayName.value} on ${siteConfig.phoneLandline.value}`}
            className="hidden h-11 w-11 items-center justify-center rounded-sm text-accent hover:bg-accent-tint min-[360px]:inline-flex"
          >
            <IconPhone className="h-6 w-6" />
          </a>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
