import { cn } from "@/lib/cn";

/**
 * Every field says whether it is required, in words, not only with a
 * symbol or colour (WCAG 3.3.2). Optional fields say "optional".
 */
function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {/* Older labels already end in "(optional)"; strip it so the marker never repeats. */}
      {label.replace(/s*(optional)s*$/i, "")}{" "}
      <span className="text-xs font-normal text-secondary">
        {required ? "(required)" : "(optional)"}
      </span>
    </label>
  );
}

const inputClasses =
  "w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm text-ink " +
  "placeholder:text-secondary focus-visible:border-accent";

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
      <FieldLabel htmlFor={name} label={label} required={props.required} />
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
      <FieldLabel htmlFor={name} label={label} required={props.required} />
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

export function SelectField({
  label,
  name,
  options,
  error,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="space-y-1">
      <FieldLabel htmlFor={name} label={label} required={props.required} />
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        defaultValue=""
        className={cn(inputClasses, error && "border-danger", className)}
        {...props}
      >
        <option value="" disabled>
          Please select…
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
          className="mt-1 h-5 w-5 cursor-pointer rounded-sm border-border text-accent focus-visible:outline-2"
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
