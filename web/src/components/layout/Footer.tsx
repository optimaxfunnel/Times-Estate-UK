import Link from "next/link";
import { footerNav, headerNav, siteConfig } from "@/lib/site-config";
import { socialProfiles } from "@/lib/social-config";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SocialLinks } from "@/components/social/SocialLinks";
import { IconMail, IconMobile, IconPhone } from "@/components/icons";

/**
 * Light footer to the owner's 2026-10-20 reference: one row of lockup ·
 * top-level navigation · contact details · social links, then the
 * detailed link columns and the regulatory/legal line the reference
 * doesn't show but a UK estate agency's site must carry
 * (COMPLIANCE_REGISTER.md).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface text-ink">
      <Container
        size="wide"
        className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <Link href="/" className="inline-flex rounded-sm">
          <BrandLockup size="sm" />
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {headerNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <li>
            <a
              href="tel:+442086728080"
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <IconPhone className="h-4 w-4 text-accent" />
              {siteConfig.phoneLandline.value}
            </a>
          </li>
          <li>
            <a
              href="tel:+447779991313"
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <IconMobile className="h-4 w-4 text-accent" />
              {siteConfig.phoneMobile.value}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.email.value}`}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <IconMail className="h-4 w-4 text-accent" />
              {siteConfig.email.value}
            </a>
          </li>
        </ul>

        {/* Primary sitewide social location. Renders nothing until at
            least one profile is enabled with a real URL (social-config.ts). */}
        <SocialLinks profiles={socialProfiles} variant="footer" />
      </Container>

      <div className="border-t border-border bg-accent-tint/40">
        <Container
          size="wide"
          className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
        >
          {Object.entries(footerNav).map(([group, links]) => (
            <nav key={group} aria-label={group}>
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
            </nav>
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
      </div>

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
