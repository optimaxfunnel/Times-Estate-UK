import { cn } from "@/lib/cn";

const inputClasses =
  "w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-ink " +
  "placeholder:text-ink/40 focus-visible:border-accent";

export function TextField({
  label,
  name,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClasses, error && "border-danger", className)}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClasses, error && "border-danger", className)}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  name: string;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <input
          id={name}
          name={name}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-4 w-4 rounded-sm border-border text-accent focus-visible:outline-2"
          {...props}
        />
        <label htmlFor={name} className="text-sm text-ink">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
