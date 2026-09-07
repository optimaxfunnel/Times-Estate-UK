import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium " +
  "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-white",
  ghost:
    "bg-transparent text-ink underline underline-offset-4 hover:text-accent",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
