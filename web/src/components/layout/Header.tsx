import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="relative border-b border-border bg-surface">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${siteConfig.displayName.value} — home`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/times-estate-ltd-logo.svg"
            alt={siteConfig.displayName.value}
            width={760}
            height={170}
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-ink hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+442086728080"
            className="text-sm font-medium text-ink hover:text-accent"
          >
            {siteConfig.phoneLandline.value}
          </a>
          <ButtonLink href="/sell">Book a Valuation</ButtonLink>
        </div>

        <a
          href="tel:+442086728080"
          aria-label={`Call ${siteConfig.displayName.value} on ${siteConfig.phoneLandline.value}`}
          className="-m-2 inline-flex items-center rounded-sm p-2 text-ink hover:text-accent lg:hidden"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
          >
            <path d="M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C10.6 21.1 2.9 13.4 2.9 3.6c0-.6.4-1 1-1H7.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z" />
          </svg>
        </a>

        <MobileMenu />
      </Container>
    </header>
  );
}
