import type { NextConfig } from "next";

/**
 * Security headers applied to every response. See /SECURITY.md for the
 * reasoning behind each one. `Strict-Transport-Security` is only
 * meaningful once the site is actually served over HTTPS — it's included
 * now so it's already correct on the day a real deployment happens,
 * matching CLAUDE.md Rule 6 (nothing is deployed today; this simply
 * avoids re-deriving the header list later).
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Deliberately without a real AI/analytics/email provider connected
    // yet (see /INTEGRATIONS.md), so there is nothing external for the
    // page to need to call — 'self' covers every script, style and
    // connection this site currently makes. This must be revisited the
    // day any third-party script or API is approved and connected.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
