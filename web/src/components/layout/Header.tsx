import Link from "next/link";
import { primaryNav } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="relative border-b border-border bg-surface">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Times Estates — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/times-estates-logo.svg"
            alt="Times Estates"
            className="h-9 w-auto sm:h-10"
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

        <div className="hidden items-center gap-4 lg:flex">
          <ButtonLink href="/sell">Book a Valuation</ButtonLink>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
