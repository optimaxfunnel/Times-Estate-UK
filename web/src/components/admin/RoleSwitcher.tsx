import { ROLE_LABELS, type Role } from "@/lib/auth/roles";
import { signOutAction } from "@/lib/property/admin-actions";

/**
 * Banner shown on every admin page while the development sign-in is in
 * use: who you are signed in as, a clear "not real authentication"
 * warning, and sign out. (File name kept for history; it no longer
 * switches roles — signing in again does.)
 */
export function RoleSwitcher({ currentRole }: { currentRole: Role }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-warning/60 bg-warning/10 px-4 py-3 text-sm">
      <p className="text-warning-text">
        <span className="font-semibold">Development sign-in</span> — not real
        authentication. Signed in as{" "}
        <span className="font-semibold">{ROLE_LABELS[currentRole]}</span>.
      </p>
      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-sm border border-warning px-3 py-1 text-sm font-medium text-warning-text hover:bg-warning hover:text-white"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
