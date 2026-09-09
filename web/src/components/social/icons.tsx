/**
 * Hand-authored, single-colour (currentColor) platform glyphs — simplified,
 * recognisable representations of each platform's mark, not a trace of any
 * official logo file. Kept local rather than adding an icon-package
 * dependency (the project has none today — see WEBSITE_AUDIT.md's
 * dependency count — and none of these eight icons justifies adding one).
 * Every glyph shares a 24x24 viewBox so they compose identically inside
 * SocialLinks regardless of platform.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M15.5 8.5h2V5.6c-.35-.05-1.55-.16-2.94-.16-2.9 0-4.9 1.83-4.9 5.2v2.6H6.75v3.4h2.9V22h3.5v-8.36h2.86l.46-3.4h-3.32v-2.2c0-.98.27-1.54 1.35-1.54Z" />
    </Base>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="16.9" cy="7.1" r="1.1" />
    </Base>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect x="6.6" y="10" width="1.9" height="7.4" />
      <circle cx="7.55" cy="7.1" r="1.15" />
      <path d="M10.6 17.4V10h1.9v1.02c.55-.75 1.35-1.22 2.4-1.22 1.85 0 3 1.2 3 3.5v4.1h-1.9v-3.8c0-1.15-.5-1.85-1.55-1.85-.95 0-1.95.65-1.95 2v3.65Z" />
    </Base>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect
        x="2.5"
        y="6"
        width="19"
        height="12"
        rx="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10.3 9.3v5.4l4.8-2.7Z" />
    </Base>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4.5h3.4l3.4 4.7 3.9-4.7h2l-5 6.05L19.2 19.5h-3.4l-3.7-5.1-4.2 5.1h-2l5.3-6.4L5 4.5Z" />
    </Base>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 3.5v10.8a2.9 2.9 0 1 1-2.9-2.9c.2 0 .4.02.6.05"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6.3a4.3 4.3 0 0 0 4.3 4.3"
      />
    </Base>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.25A8.4 8.4 0 1 0 12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 9.3c.15-.5.3-.5.6-.5h.4c.15 0 .35 0 .5.4.2.5.65 1.6.7 1.7.05.1.08.23 0 .37-.07.15-.1.25-.22.38-.12.13-.25.3-.36.4-.12.12-.24.25-.1.5.13.25.6 1 1.3 1.6.9.8 1.6 1.05 1.85 1.17.25.12.4.1.55-.06.15-.17.6-.7.77-.94.16-.24.32-.2.53-.12.22.08 1.4.66 1.63.78.24.12.4.18.45.28.06.1.06.58-.14 1.14-.2.56-1.15 1.1-1.6 1.15-.4.05-.9.07-1.46-.1a11.5 11.5 0 0 1-3.2-1.35c-1.65-1-2.75-2.6-2.9-2.8-.15-.2-1.2-1.6-1.2-3.05 0-1.45.75-2.15 1.02-2.45Z" />
    </Base>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path
        d="M20.5 12.2c0-.65-.06-1.28-.17-1.9H12v3.6h4.75a4.1 4.1 0 0 1-1.77 2.68v2.2h2.86c1.68-1.55 2.66-3.83 2.66-6.58Z"
        opacity="0.9"
      />
      <path
        d="M12 21c2.4 0 4.4-.8 5.85-2.16l-2.86-2.2c-.8.53-1.8.85-3 .85-2.3 0-4.25-1.55-4.95-3.63H4.1v2.28A9 9 0 0 0 12 21Z"
        opacity="0.75"
      />
      <path
        d="M7.05 13.86A5.4 5.4 0 0 1 6.77 12c0-.65.11-1.28.28-1.86V7.86H4.1A9 9 0 0 0 3.14 12c0 1.45.35 2.83.96 4.14l2.95-2.28Z"
        opacity="0.6"
      />
      <path
        d="M12 6.5c1.3 0 2.47.45 3.4 1.33l2.55-2.55C16.4 3.7 14.4 3 12 3a9 9 0 0 0-7.9 4.86l2.95 2.28C7.75 8.05 9.7 6.5 12 6.5Z"
        opacity="1"
      />
    </Base>
  );
}
