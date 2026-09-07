import { cn } from "@/lib/cn";

type Tone = "info" | "success" | "warning" | "danger";

const toneStyles: Record<Tone, string> = {
  info: "border-secondary/40 bg-secondary/5 text-ink",
  success: "border-success/40 bg-success/5 text-success",
  warning: "border-warning/40 bg-warning/5 text-warning-text",
  danger: "border-danger/40 bg-danger/5 text-danger",
};

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "rounded-sm border p-4 text-sm",
        toneStyles[tone],
        className,
      )}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div>{children}</div>
    </div>
  );
}
