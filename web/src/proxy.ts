import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic check for the admin area: a request with no session cookie
 * at all is redirected to sign-in before any page renders (a clean 307
 * instead of a streamed redirect). This is NOT the security check — the
 * signature, expiry and role are verified on the server by
 * `requireRole()` in every admin page and action (lib/auth/session.ts),
 * as the Next.js documentation recommends.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/sign-in") return NextResponse.next();
  if (!request.cookies.has("te_admin_session")) {
    return NextResponse.redirect(new URL("/admin/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
