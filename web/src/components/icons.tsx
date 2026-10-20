import type { SVGProps } from "react";

/**
 * The site's hand-authored icon set: 24×24, stroked in `currentColor`,
 * so each one takes its colour from the surrounding text and no icon
 * library is needed (the project deliberately has only four runtime
 * dependencies — see TECHNICAL_ARCHITECTURE.md). Every icon is
 * `aria-hidden`: the text beside it carries the meaning.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconSearch = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const IconPhone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1Z" />
  </Icon>
);

export const IconMobile = (p: IconProps) => (
  <Icon {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="2" />
    <path d="M11 18h2" />
  </Icon>
);

export const IconMail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Icon>
);

export const IconPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const IconArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </Icon>
);

export const IconChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const IconChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="m15 6-6 6 6 6" />
  </Icon>
);

export const IconChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);

export const IconHeart = ({
  filled = false,
  ...p
}: IconProps & { filled?: boolean }) => (
  <Icon {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.5s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10Z" />
  </Icon>
);

export const IconBed = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M5 9V6h6v3M13 9V6h6v3" />
  </Icon>
);

export const IconBath = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2ZM6 12V5.5A2.5 2.5 0 0 1 8.5 3h.5M7 19l-1 2M17 19l1 2" />
  </Icon>
);

export const IconSofa = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M3 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4H3v-4ZM5 17v2M19 17v2" />
  </Icon>
);

export const IconArea = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <path d="M4 10h6V4M14 20v-6h6" />
  </Icon>
);

export const IconGrid = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6" rx="1" />
  </Icon>
);

export const IconList = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
  </Icon>
);

export const IconCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12 4.5 4.5L19 7" />
  </Icon>
);

export const IconQuote = (p: IconProps) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M6 7h5v5H8.5A2.5 2.5 0 0 0 6 14.5V17H3v-2.5A7.5 7.5 0 0 1 6 7Zm10 0h5v5h-2.5a2.5 2.5 0 0 0-2.5 2.5V17h-3v-2.5A7.5 7.5 0 0 1 16 7Z" />
  </Icon>
);

/* Service-strip icons */
export const IconHome = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3 11 9-7 9 7M5 10v10h5v-6h4v6h5V10" />
  </Icon>
);

export const IconKey = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8" cy="12" r="4" />
    <path d="M12 12h9m-3 0v3m-3-3v2" />
  </Icon>
);

export const IconPeople = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <circle cx="17" cy="10" r="2.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M15 20a4.5 4.5 0 0 1 6.5-4" />
  </Icon>
);

export const IconBuilding = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M15 9h3a1 1 0 0 1 1 1v11M3 21h18M8 7h2M8 11h2M8 15h2M12 7h-1M12 11h-1M12 15h-1" />
  </Icon>
);

export const IconTools = (p: IconProps) => (
  <Icon {...p}>
    <path d="m14.5 6.5 3 3L8 19H5v-3l9.5-9.5ZM12.5 8.5l3 3M16 4l4 4" />
  </Icon>
);

export const IconExpand = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
  </Icon>
);

export const IconSliders = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8M4 12h16" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </Icon>
);
