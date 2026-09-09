/**
 * Single source of truth for Times Estates' social profiles.
 *
 * Rule 1 (CLAUDE.md) applies here exactly as it does to every other
 * business fact: no username, profile URL, follower count, review score
 * or verification status is invented. Every entry below has `url: null`
 * and `enabled: false` until the business owner supplies the genuine,
 * verified URL — see DECISIONS.md for the full account of what was
 * checked and what's still missing.
 *
 * `SocialLinks` (components/social/SocialLinks.tsx) renders only entries
 * that are both `enabled` and have a real `url` — an entry can never
 * reach a public page by having one without the other.
 */

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "x"
  | "tiktok"
  | "whatsapp"
  | "googleBusinessProfile";

export interface SocialProfile {
  platform: SocialPlatform;
  /** Display name, e.g. "Facebook", "WhatsApp". */
  label: string;
  /** The genuine, verified profile URL — null until supplied and checked. */
  url: string | null;
  /** True only once `url` is a confirmed, verified Times Estates profile. */
  enabled: boolean;
  /** Full accessible name for the icon-only link, e.g. "Visit Times Estates on Facebook". */
  accessibleLabel: string;
  /** A short, neutral one-line description for the Contact page's fuller treatment. */
  description: string;
  /** The platform's own brand colour, used only for the hover/approved-treatment state — never the default presentation. */
  brandColor: string;
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: "facebook",
    label: "Facebook",
    url: null,
    enabled: false,
    accessibleLabel: "Visit Times Estates on Facebook",
    description: "Property updates and local news.",
    brandColor: "#1877F2",
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: null,
    enabled: false,
    accessibleLabel: "Visit Times Estates on Instagram",
    description: "Featured properties and behind the scenes.",
    brandColor: "#C13584",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: null,
    enabled: false,
    accessibleLabel: "Visit Times Estates on LinkedIn",
    description: "Company updates and industry news.",
    brandColor: "#0A66C2",
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: null,
    enabled: false,
    accessibleLabel: "Visit Times Estates on YouTube",
    description: "Property walkthroughs and area guides.",
    brandColor: "#FF0000",
  },
  {
    platform: "x",
    label: "X",
    url: null,
    enabled: false,
    accessibleLabel: "Visit Times Estates on X",
    description: "Quick updates and announcements.",
    brandColor: "#000000",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    url: null,
    enabled: false,
    accessibleLabel: "Visit Times Estates on TikTok",
    description: "Short video property tours.",
    brandColor: "#000000",
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    // The mobile number itself is confirmed (siteConfig.phoneMobile), but a
    // WhatsApp Business *presence* on that number has never been confirmed
    // or approved — CLAUDE.md Rule 4 (third-party channel/service approval)
    // and the Phase 5/7 briefs both gate this specifically. Do not set this
    // to `https://wa.me/447779991313` until that approval is recorded.
    url: null,
    enabled: false,
    accessibleLabel: "Message Times Estates on WhatsApp",
    description: "Message us directly for a quick reply.",
    brandColor: "#25D366",
  },
  {
    platform: "googleBusinessProfile",
    label: "Google Business Profile",
    url: null,
    enabled: false,
    accessibleLabel: "View Times Estates on Google Business Profile",
    description: "Find us on Google, with reviews and directions.",
    brandColor: "#4285F4",
  },
];

/** Only what's safe to ever render or emit in structured data. */
export function getEnabledSocialProfiles(): SocialProfile[] {
  return socialProfiles.filter((p) => p.enabled && !!p.url);
}
