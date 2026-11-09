"use client";

import { useEffect } from "react";

/**
 * WCAG 1.4.13: content shown on hover or focus must be dismissible
 * without moving the pointer or focus. The header dropdowns open with
 * CSS alone, so this adds only the missing piece — Escape hides the open
 * dropdown (focus stays where it is) until focus or the pointer leaves
 * that menu item.
 */
export function DropdownDismiss({ navLabel }: { navLabel: string }) {
  useEffect(() => {
    const nav = document.querySelector(`nav[aria-label="${navLabel}"]`);
    if (!nav) return;
    const itemOf = (el: EventTarget | null) =>
      el instanceof Element ? el.closest("li.group") : null;

    function onKeyDown(e: Event) {
      if ((e as KeyboardEvent).key !== "Escape") return;
      const item = itemOf(e.target);
      if (!item) return;
      item.setAttribute("data-dismissed", "");
      // Return focus to the top-level link if it was inside the menu.
      item.querySelector<HTMLElement>(":scope > a")?.focus();
    }
    function onLeave(e: Event) {
      const item = itemOf(e.target);
      const next = (e as FocusEvent).relatedTarget;
      if (item && !(next instanceof Node && item.contains(next))) {
        item.removeAttribute("data-dismissed");
      }
    }
    function onMouseLeave(e: Event) {
      if (e.target instanceof Element && e.target.matches("li.group")) {
        e.target.removeAttribute("data-dismissed");
      }
    }
    nav.addEventListener("keydown", onKeyDown);
    nav.addEventListener("focusout", onLeave);
    nav.addEventListener("mouseleave", onMouseLeave, true);
    return () => {
      nav.removeEventListener("keydown", onKeyDown);
      nav.removeEventListener("focusout", onLeave);
      nav.removeEventListener("mouseleave", onMouseLeave, true);
    };
  }, [navLabel]);

  return null;
}
