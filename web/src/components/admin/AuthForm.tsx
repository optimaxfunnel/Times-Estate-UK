import { Alert } from "@/components/ui/Alert";

/** Shared layout and inputs for the staff sign-in pages (server-rendered). */

export const inputClass =
  "mt-1 block w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2";

export const buttonClass =
  "rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark";

const MESSAGES: Record<string, string> = {
  invalid: "That email and password didn't match an account. Please try again.",
  too_many: "Too many attempts. Please wait a minute and try again.",
  code: "That code wasn't accepted. Codes change every 30 seconds — enter the newest one.",
  no_access:
    "Your account isn't set up for the admin area yet. Ask the business owner to give you a role.",
  link: "That link has expired or was already used. Ask for a new one.",
  short: "Your password must be at least 12 characters.",
  mismatch: "The two passwords didn't match.",
  rejected: "That password wasn't accepted. Please choose a different one.",
};

export function AuthPage({
  title,
  intro,
  error,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  const message = error ? MESSAGES[error] : undefined;
  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      {intro && <div className="mt-2 text-sm text-ink/80">{intro}</div>}
      {message && (
        <Alert tone="danger" className="mt-4">
          {message}
        </Alert>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function TextInput({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  pattern,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "email" | "text";
  pattern?: string;
  maxLength?: number;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        className={inputClass}
      />
    </label>
  );
}
