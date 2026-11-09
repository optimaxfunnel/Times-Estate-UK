"use client";

import { useEffect, useRef } from "react";
import { acceptEmailLinkAction } from "@/lib/auth/staff-actions";

/**
 * Reads the one-time tokens Supabase puts after "#" in an invitation or
 * reset link, removes them from the address bar at once, and posts them
 * to the server, which verifies them with Supabase and sets the session
 * cookie. Nothing is stored in the browser.
 */
export function CallbackHandoff() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    // Wipe the tokens from the address bar and browser history straight away.
    window.history.replaceState(null, "", window.location.pathname);
    const access = params.get("access_token");
    const refresh = params.get("refresh_token");
    const form = formRef.current;
    if (!access || !refresh || !form) {
      window.location.replace("/admin/sign-in?error=link");
      return;
    }
    (form.elements.namedItem("access_token") as HTMLInputElement).value = access;
    (form.elements.namedItem("refresh_token") as HTMLInputElement).value = refresh;
    (form.elements.namedItem("type") as HTMLInputElement).value = params.get("type") ?? "";
    form.requestSubmit();
  }, []);

  return (
    <form ref={formRef} action={acceptEmailLinkAction}>
      <input type="hidden" name="access_token" defaultValue="" />
      <input type="hidden" name="refresh_token" defaultValue="" />
      <input type="hidden" name="type" defaultValue="" />
      <noscript>JavaScript is needed to finish signing in from an email link.</noscript>
    </form>
  );
}
