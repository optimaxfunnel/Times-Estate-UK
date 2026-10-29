"use client";

/**
 * Last-resort error boundary: catches errors thrown by the root layout
 * itself (header, footer, fonts), which `error.tsx` cannot, because it
 * renders inside that layout. It must supply its own <html> and <body>
 * and cannot rely on the site's components or stylesheet, so it is
 * deliberately plain, with inline styles that keep AA contrast.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          color: "#141414",
          background: "#ffffff",
        }}
      >
        <main style={{ maxWidth: 560, margin: "0 auto", padding: "64px 16px" }}>
          <h1 style={{ fontSize: 24 }}>Something went wrong</h1>
          <p style={{ lineHeight: 1.5 }}>
            The site could not load. Please try again, or call Times Estate Ltd
            on <a href="tel:+442086728080">0208 672 8080</a>.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 16,
              padding: "12px 20px",
              background: "#a8551a",
              color: "#ffffff",
              border: 0,
              borderRadius: 8,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
