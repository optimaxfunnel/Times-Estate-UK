"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border"
      >
        <span className="sr-only">
          {open ? "Close menu" : "Open menu"}
        </span>
        {open ? (
          <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-0 top-20 bottom-0 z-20 overflow-y-auto border-t border-border bg-surface p-4 shadow-lg"
        >
          <ul className="space-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-1 text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/sell" className="mt-4 w-full">
            Book a Valuation
          </ButtonLink>
        </nav>
      )}
    </div>
  );
}
