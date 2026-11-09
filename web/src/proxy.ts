import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

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
const OPEN_PATHS = ["/admin/sign-in", "/admin/forgot-password", "/admin/auth/confirm"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
