import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

/**
 * Light footer: the detailed link columns and the regulatory/legal line
 * a UK estate agency's site must carry (COMPLIANCE_REGISTER.md).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface text-ink">
      {/* 2026-11-09: the top strip (logo, menu links, phones, email and the
          footer social-links slot) was removed at the owner's request.
          Phones remain in the header; email and social links on /contact. */}
      <nav aria-label="Site directory" className="bg-accent-tint/40">
        {/* One landmark for the whole link directory: a nav per column
            gave screen-reader users seven near-identical landmarks. */}
        <Container
          size="wide"
          className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
        >
          {Object.entries(footerNav).map(([group, links]) => (
            <div key={group}>
              <h2 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-ink/60">
                {group}
              </h2>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/80 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-ink/60">
              Regulatory
            </h2>
            <ul className="space-y-2 text-sm text-ink/80">
              <li className="flex flex-wrap items-center gap-2">
                {siteConfig.redressScheme.value}
                <Badge status={siteConfig.redressScheme.status} />
              </li>
              <li className="flex flex-wrap items-center gap-2">
                {siteConfig.clientMoneyProtection.value}
                <Badge status={siteConfig.clientMoneyProtection.status} />
              </li>
            </ul>
          </div>
        </Container>
      </nav>

      <div className="border-t border-border py-5">
        <Container
          size="wide"
          className="flex flex-col gap-2 text-xs text-ink/60 lg:flex-row lg:items-start lg:justify-between"
        >
          <p className="max-w-3xl">
            &copy; {year} {siteConfig.legalName.value}. All rights reserved.
            Registered in England &amp; Wales, company number{" "}
            {siteConfig.companiesHouseNumber.value}. Registered office:{" "}
            {siteConfig.registeredOffice.value}.
          </p>
          {/* Right margin keeps this clear of the fixed "Ask the assistant"
              button that sits in the bottom-right corner of every page. */}
          <p className="lg:mr-44">
            Also offering Construction &amp; renovation services — call{" "}
            <a href="tel:+442086738555" className="hover:text-accent">
              {siteConfig.constructionPhone.value}
            </a>
            .
          </p>
        </Container>
      </div>
    </footer>
  );
}
