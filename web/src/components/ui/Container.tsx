import { cn } from "@/lib/cn";

const SIZES = {
  /** Reading-width layouts: text pages, forms, hubs. */
  default: "max-w-6xl",
  /** The listing explorer, header and footer — sidebar + grid + area panel need the room. */
  wide: "max-w-[88rem]",
} as const;

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        SIZES[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
