import Link from "next/link";
import { headerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { DropdownDismiss } from "@/components/layout/DropdownDismiss";
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
        <Link
          href="/"
          className="flex min-w-0 shrink items-center rounded-sm xl:shrink-0"
        >
          <BrandLockup />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center">
            {headerNav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 whitespace-nowrap px-2 py-7 text-[0.8125rem] 2xl:px-2.5 font-medium text-ink hover:text-accent"
                >
                  {item.label}
                  {item.children && (
                    <IconChevronDown className="h-3.5 w-3.5 text-ink/50 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full z-40 min-w-56 rounded-sm border border-border bg-surface py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 group-data-[dismissed]:invisible group-data-[dismissed]:opacity-0">
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
        <DropdownDismiss navLabel="Primary" />

        {/* 1280–1535px is tight with both phone numbers: the search icon
            (also under Properties) and the arrow only show from 2xl. */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link
            href="/buy"
            aria-label="Search properties"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-accent-tint hover:text-accent 2xl:inline-flex"
          >
            <IconSearch className="h-5 w-5" />
          </Link>
          <Link
            href="/sell"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Get a Valuation
            <IconArrowRight className="hidden h-4 w-4 2xl:block" />
          </Link>
          <div className="flex items-center gap-2 whitespace-nowrap text-ink">
            <IconPhone className="h-6 w-6 text-accent" />
            {/* Landline first, then mobile — order set by the owner. */}
            <span className="flex flex-col leading-tight">
              <a
                href="tel:+442086728080"
                aria-label={`Call our landline on ${siteConfig.phoneLandline.value}`}
                className="inline-flex min-h-6 items-center text-sm font-bold tracking-tight hover:text-accent"
              >
                {siteConfig.phoneLandline.value}
              </a>
              <a
                href="tel:+447779991313"
                aria-label={`Call our mobile on ${siteConfig.phoneMobile.value}`}
                className="inline-flex min-h-6 items-center text-sm font-bold tracking-tight hover:text-accent"
              >
                {siteConfig.phoneMobile.value}
              </a>
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <a
            href="tel:+442086728080"
            aria-label={`Call ${siteConfig.displayName.value} on ${siteConfig.phoneLandline.value}`}
            className="hidden h-11 w-11 items-center justify-center rounded-sm text-accent hover:bg-accent-tint min-[360px]:inline-flex min-[480px]:hidden"
          >
            <IconPhone className="h-6 w-6" />
          </a>
          <span className="hidden flex-col text-right leading-tight min-[480px]:flex">
            <a
              href="tel:+442086728080"
              aria-label={`Call our landline on ${siteConfig.phoneLandline.value}`}
              className="inline-flex min-h-6 items-center justify-end text-sm font-bold text-ink hover:text-accent"
            >
              {siteConfig.phoneLandline.value}
            </a>
            <a
              href="tel:+447779991313"
              aria-label={`Call our mobile on ${siteConfig.phoneMobile.value}`}
              className="inline-flex min-h-6 items-center justify-end text-sm font-bold text-ink hover:text-accent"
            >
              {siteConfig.phoneMobile.value}
            </a>
          </span>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
