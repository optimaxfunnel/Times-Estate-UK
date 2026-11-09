import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BrandLockup } from "@/components/brand/BrandLockup";

/**
 * Light footer: the logo, the detailed link columns and the regulatory/legal line
 * a UK estate agency's site must carry (COMPLIANCE_REGISTER.md).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface text-ink">
      {/* 2026-11-09: the top strip (menu links, phones, email and the
          footer social-links slot) was removed at the owner's request;
          the owner then asked for the logo alone to be added back.
          Phones remain in the header; email and social links on /contact. */}
      <div className="bg-accent-tint/40">
        <Container size="wide" className="pt-8">
          {/* The lockup's visible text names this link (WCAG 2.5.3), as in the header. */}
          <Link href="/" className="inline-flex rounded-sm">
            <BrandLockup />
          </Link>
        </Container>
      </div>
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
        {/* 2026-11-09: stacked one statement per line, to the owner's layout.
            The company number is a Companies Act trading disclosure, so it is
            labelled as such (the owner's mock-up said "Call", but it is not a
            phone number). Left-aligned, so it stays clear of the fixed
            "Ask the assistant" button in the bottom-right corner. */}
        <Container size="wide" className="space-y-6 text-xs text-ink/60">
          <div className="space-y-1.5">
            <p>
              &copy; {year} {siteConfig.legalName.value}. All rights reserved.
              Registered in England &amp; Wales.
            </p>
            <p>Registered office: {siteConfig.registeredOffice.value}.</p>
            <p>Company number: {siteConfig.companiesHouseNumber.value}</p>
          </div>
          <div className="space-y-1.5">
            <p>Also offering Construction &amp; renovation services</p>
            <p>
              call{" "}
              <a
                href="tel:+442086738555"
                className="underline underline-offset-2 hover:text-accent"
              >
                {siteConfig.constructionPhone.value}
              </a>
              .
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
