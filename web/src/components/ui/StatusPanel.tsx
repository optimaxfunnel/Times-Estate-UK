import { cn } from "@/lib/cn";

/**
 * Empty and error states share one calm layout: what happened, why it
 * matters, and what to do next. An error never shows raw technical
 * detail and always offers a phone number fallback.
 */
export function EmptyState({
  title,
  children,
  actions,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border border-dashed border-border-strong bg-accent-tint/30 p-8 text-center",
        className,
      )}
    >
      <p className="font-heading text-lg font-bold text-ink">{title}</p>
      {children && (
        <div className="mx-auto mt-2 max-w-md text-sm text-ink/80">
          {children}
        </div>
      )}
      {actions && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  children,
  actions,
  className,
}: {
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-sm border border-danger/40 bg-danger/5 p-6 text-center",
        className,
      )}
    >
      <p className="font-heading text-lg font-bold text-danger">{title}</p>
      <div className="mx-auto mt-2 max-w-md text-sm text-ink/80">
        {children ?? (
          <>
            Please try again. If it keeps happening, call us on{" "}
            <a
              href="tel:+442086728080"
              className="font-medium text-accent underline underline-offset-4"
            >
              0208 672 8080
            </a>
            .
          </>
        )}
      </div>
      {actions && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
