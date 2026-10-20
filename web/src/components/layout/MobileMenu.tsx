"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { headerNav, siteConfig } from "@/lib/site-config";
import { socialProfiles } from "@/lib/social-config";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SocialLinks } from "@/components/social/SocialLinks";
import { IconPhone } from "@/components/icons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Keyboard support a visible-only menu doesn't get for free: Escape
  // closes it and returns focus to the button that opened it, and
  // opening it moves focus inside so a keyboard user isn't left behind
  // on a control that's no longer where their focus visually is.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-0 top-18 bottom-0 z-20 overflow-y-auto border-t border-border bg-surface p-4 shadow-lg lg:top-20"
        >
          <ul className="divide-y divide-border">
            {headerNav.map((item, index) => (
              <li key={item.label} className="py-2">
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className="block py-1.5 text-base font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-1 ml-3 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-1.5 text-sm text-ink/80 hover:text-accent"
                          onClick={() => setOpen(false)}
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
          <ButtonLink href="/sell" className="mt-4 w-full">
            Get a Valuation
          </ButtonLink>
          <a
            href="tel:+442086728080"
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink"
          >
            <IconPhone className="h-5 w-5 text-accent" />
            {siteConfig.phoneLandline.value}
          </a>
          <SocialLinks
            profiles={socialProfiles}
            variant="drawer"
            className="mt-4"
          />
        </nav>
      )}
    </div>
  );
}
