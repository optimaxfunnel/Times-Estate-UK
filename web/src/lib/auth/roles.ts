/**
 * Role and permission model for the administration area.
 *
 * See CLAUDE.md and /DATA_MODEL.md — this governs who may create, edit,
 * approve or publish a property, edit general content, view enquiries, or
 * manage other users. Least-privilege: every permission defaults to
 * denied unless explicitly listed for a role.
 */

export const ROLES = [
  "administrator",
  "manager",
  "property_editor",
  "content_editor",
  "enquiry_viewer",
] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  administrator: "Administrator",
  manager: "Manager",
  property_editor: "Property Editor",
  content_editor: "Content Editor",
  enquiry_viewer: "Enquiry Viewer",
};

export const PERMISSIONS = [
  "view_admin",
  "create_property",
  "edit_property",
  "submit_property_for_approval",
  "approve_property",
  "archive_property",
  "edit_content_pages",
  "view_enquiries",
  "manage_leads",
  "manage_users",
  "view_audit_log",
] as const;
export type Permission = (typeof PERMISSIONS)[number];

const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  administrator: [...PERMISSIONS],
  manager: [
    "view_admin",
    "create_property",
    "edit_property",
    "submit_property_for_approval",
    "approve_property",
    "archive_property",
    "view_enquiries",
    "manage_leads",
    "view_audit_log",
  ],
  property_editor: [
    "view_admin",
    "create_property",
    "edit_property",
    "submit_property_for_approval",
  ],
  content_editor: ["view_admin", "edit_content_pages"],
  enquiry_viewer: ["view_admin", "view_enquiries"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function permissionsFor(role: Role): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}
