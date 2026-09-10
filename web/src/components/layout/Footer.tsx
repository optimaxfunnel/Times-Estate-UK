import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site-config";
import { socialProfiles } from "@/lib/social-config";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SocialLinks } from "@/components/social/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/times-estate-ltd-logo-reversed.svg"
            alt={siteConfig.displayName.value}
            width={760}
            height={170}
            className="h-10 w-auto"
          />
          {/* Primary sitewide social location (desktop and mobile — this
              one placement reflows responsively rather than needing a
              separate mobile-only block). Renders nothing until at least
              one profile is enabled with a real URL. */}
          <SocialLinks profiles={socialProfiles} variant="footer" />
        </div>

        <div className="grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {Object.entries(footerNav).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                {group}
              </h2>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-accent-vivid"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
              Regulatory
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex flex-wrap items-center gap-2">
                {siteConfig.redressScheme.value}
                {/* Badge's tint colours assume a light surface behind them —
                    wrapped in a light chip so its contrast holds on this
                    dark footer background rather than washing out. */}
                <span className="inline-flex rounded-sm bg-white/95 px-0.5 py-0.5">
                  <Badge status={siteConfig.redressScheme.status} />
                </span>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                {siteConfig.clientMoneyProtection.value}
                <span className="inline-flex rounded-sm bg-white/95 px-0.5 py-0.5">
                  <Badge status={siteConfig.clientMoneyProtection.status} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/15 py-6">
        <Container className="flex flex-col gap-2 text-xs text-white/60 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl">
            &copy; {year} {siteConfig.legalName.value}. Registered in England
            &amp; Wales, company number {siteConfig.companiesHouseNumber.value}.
            Registered office: {siteConfig.registeredOffice.value}.
          </p>
          <p>
            Also offering Construction &amp; renovation services — call{" "}
            {siteConfig.constructionPhone.value}.
          </p>
        </Container>
      </div>
    </footer>
  );
}
