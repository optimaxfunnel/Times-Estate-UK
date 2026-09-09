import { cn } from "@/lib/cn";
import type { SocialProfile } from "@/lib/social-config";
import {
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/social/icons";

const ICONS: Record<
  SocialProfile["platform"],
  React.ComponentType<{ className?: string }>
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  x: XIcon,
  tiktok: TikTokIcon,
  whatsapp: WhatsAppIcon,
  googleBusinessProfile: GoogleIcon,
};

type Variant = "footer" | "drawer" | "contact";

/**
 * The one, reusable, data-driven social-links component — used by the
 * footer, the mobile navigation drawer, and the Contact page, so the
 * platform list, accessible names, and link behaviour are defined once.
 *
 * Renders nothing (returns null) if no profile is both enabled and has a
 * real URL — an empty "Follow us" heading with no icons is worse than no
 * section at all (see DECISIONS.md).
 *
 * No client-side JavaScript: every interactive state (hover, focus-visible,
 * active) is plain CSS, and `prefers-reduced-motion` is already handled by
 * the sitewide rule in globals.css that collapses all transition durations.
 */
export function SocialLinks({
  profiles,
  variant = "footer",
  className,
}: {
  profiles: SocialProfile[];
  variant?: Variant;
  className?: string;
}) {
  const live = profiles.filter((p) => p.enabled && !!p.url);
  if (live.length === 0) return null;

  if (variant === "contact") {
    return (
      <ul className={cn("grid gap-3 sm:grid-cols-2", className)}>
        {live.map((profile) => {
          const Icon = ICONS[profile.platform];
          return (
            <li key={profile.platform}>
              <a
                href={profile.url!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-3 rounded-lg border border-border bg-surface p-3",
                  "transition-colors duration-150 hover:border-transparent",
                )}
                style={{ "--brand": profile.brandColor } as React.CSSProperties}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 flex-none items-center justify-center rounded-full",
                    "bg-secondary/10 text-ink transition-colors duration-150",
                    "group-hover:bg-[var(--brand)] group-hover:text-white",
                    "group-active:opacity-80",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">
                    {profile.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <span className="block truncate text-xs text-ink/60">
                    {profile.description}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  const isDrawer = variant === "drawer";

  return (
    <nav aria-label="Times Estates on social media" className={className}>
      {!isDrawer && (
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
          Follow Times Estates
        </h2>
      )}
      <ul
        className={cn(
          "flex flex-wrap gap-3",
          isDrawer && "gap-2 border-t border-border pt-3",
        )}
      >
        {live.map((profile) => {
          const Icon = ICONS[profile.platform];
          return (
            <li key={profile.platform}>
              <a
                href={profile.url!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.accessibleLabel} (opens in a new tab)`}
                title={profile.accessibleLabel}
                style={{ "--brand": profile.brandColor } as React.CSSProperties}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full",
                  "transition-colors duration-150 active:scale-95",
                  isDrawer
                    ? "bg-secondary/10 text-ink hover:bg-[var(--brand)] hover:text-white"
                    : "bg-white/10 text-white hover:bg-[var(--brand)] hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
