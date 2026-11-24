import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { legacyResponseFor } from "@/lib/seo/legacy-urls";

/**
 * Runs before every /admin request.
 *
 * - Supabase Auth configured: refreshes the staff session cookie (as
 *   Supabase's server-side guide requires) and sends anyone with no
 *   session to sign-in. Pages that are open without a session: sign-in,
 *   forgotten password, and the email-link handler.
 * - Development mock: a request with no mock cookie goes to sign-in.
 *
 * This is NOT the security check. Every admin page and action verifies
 * the signed session, the two-step verification level and the role on
 * the server via `requireRole()` (lib/auth/session.ts).
 */
const OPEN_PATHS = ["/admin/sign-in", "/admin/forgot-password", "/admin/auth/confirm", "/admin/auth/callback"];

/**
 * Old WordPress addresses with nothing worth keeping answer 410 ("gone"),
 * so search engines drop them (SEO_REDIRECT_PLAN.md §2). A plain page
 * with a link home, for any person who arrives from an old bookmark.
 */
function gone(): NextResponse {
  return new NextResponse(
    '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page removed | Times Estate Ltd</title></head><body><main><h1>This page has been removed</h1><p>It was part of our old website. <a href="/">Go to the Times Estate Ltd homepage</a> or call 0208 672 8080.</p></main></body></html>',
    { status: 410, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=86400" } },
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) {
    const legacy = legacyResponseFor(pathname, request.nextUrl.search);
    if (!legacy) return NextResponse.next();
    if (legacy.kind === "gone") return gone();
    return NextResponse.redirect(new URL(legacy.location, request.url), legacy.status);
  }
  const isOpen = OPEN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (url && key) {
    let response = NextResponse.next({ request });
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet, headers) => {
          for (const { name, value } of toSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of toSet) response.cookies.set(name, value, options);
          for (const [k, v] of Object.entries(headers ?? {})) response.headers.set(k, v);
        },
      },
    });
    const { data } = await supabase.auth.getClaims();
    if (!data?.claims?.sub && !isOpen) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }
    return response;
  }

  if (isOpen) return NextResponse.next();
  if (!request.cookies.has("te_admin_session")) {
    return NextResponse.redirect(new URL("/admin/sign-in", request.url));
  }
  return NextResponse.next();
}

// Must be literal (Next.js reads it at build time). Every address except
// Next.js's own files, uploaded photos and the health check, so old
// WordPress addresses and trailing slashes are answered here in one step.
export const config = {
  matcher: ["/((?!_next/static|_next/image|media/|api/).*)"],
};
