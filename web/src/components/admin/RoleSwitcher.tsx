import { ROLES, ROLE_LABELS, type Role } from "@/lib/auth/roles";
import { setMockRoleAction } from "@/lib/property/admin-actions";

/**
 * ⚠️ Development-only tool. In a real deployment this entire control
 * would not exist — a visitor would sign in with real credentials and
 * receive whatever role an administrator assigned them, not choose their
 * own. This exists purely so today's permission boundaries can be tested
 * against real pages. See /lib/auth/session.ts for the full explanation.
 */
export function RoleSwitcher({ currentRole }: { currentRole: Role }) {
  return (
    <div className="border-b border-dashed border-warning/60 bg-warning/10 px-4 py-3 text-sm">
      <p className="font-semibold text-warning-text">
        Development-only role switcher — not real authentication
      </p>
      <form action={setMockRoleAction} className="mt-2 flex flex-wrap items-center gap-2">
        <label htmlFor="role-select" className="sr-only">
          Switch demo role
        </label>
        <select
          id="role-select"
          name="role"
          defaultValue={currentRole}
          className="rounded-sm border border-border bg-surface px-2 py-1 text-sm"
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-sm border border-warning px-3 py-1 text-sm font-medium text-warning-text hover:bg-warning hover:text-white"
        >
          Switch role
        </button>
      </form>
    </div>
  );
}
