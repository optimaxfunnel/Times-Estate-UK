import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {Object.entries(footerNav).map(([group, links]) => (
          <nav key={group} aria-label={group}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
              {group}
            </h2>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
            Regulatory
          </h2>
          <ul className="space-y-2 text-sm text-ink">
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

      <div className="border-t border-border py-6">
        <Container className="flex flex-col gap-2 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName.value}. Registered in England
            &amp; Wales, company number {siteConfig.companiesHouseNumber.value}.
            Registered office: {siteConfig.registeredOffice.value}.
          </p>
        </Container>
      </div>
    </footer>
  );
}
