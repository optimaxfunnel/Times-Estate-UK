import { hasPermission, type Role } from "@/lib/auth/roles";
import {
  PUBLICLY_VISIBLE_STATUSES,
  type PropertyStatus,
} from "@/lib/property/types";

/**
 * Who may move a property between statuses, and who may edit a property
 * that the public can already see. Pure functions, so they are unit
 * tested independently of any page.
 *
 *  - Draft ↔ Awaiting approval: anyone with edit_property (submitting
 *    for approval is how an editor asks for publication).
 *  - Into any publicly visible status (Available, Under offer, Sold STC,
 *    Let agreed): approve_property only — Managers and Administrators.
 *  - Into Sold or Let (taking a listing off the public site after a
 *    transaction): approve_property.
 *  - Into Withdrawn or Archived: archive_property.
 *  - Editing the text of a property that is publicly visible: also
 *    approve_property, because that is itself a public change (Rule 2).
 */
export type Decision = { allowed: true } | { allowed: false; reason: string };

const ALLOW: Decision = { allowed: true };

export function isPublic(status: PropertyStatus): boolean {
  return PUBLICLY_VISIBLE_STATUSES.includes(status);
}

export function canChangeStatus(
  role: Role,
  from: PropertyStatus,
  to: PropertyStatus,
): Decision {
  if (!hasPermission(role, "edit_property")) {
    return { allowed: false, reason: "Your role cannot edit properties." };
  }
  if (from === to) return ALLOW;
  if (to === "draft" || to === "awaiting_approval") {
    if (isPublic(from) && !hasPermission(role, "approve_property")) {
      return {
        allowed: false,
        reason:
          "Only a Manager or Administrator can take a live listing off the public site.",
      };
    }
    return ALLOW;
  }
  if (to === "withdrawn" || to === "archived") {
    return hasPermission(role, "archive_property")
      ? ALLOW
      : {
          allowed: false,
          reason:
            "Only a Manager or Administrator can withdraw or archive a property.",
        };
  }
  return hasPermission(role, "approve_property")
    ? ALLOW
    : {
        allowed: false,
        reason:
          "Only a Manager or Administrator can approve this status. Submit the property for approval instead.",
      };
}

export function canEditContent(role: Role, current: PropertyStatus): Decision {
  if (!hasPermission(role, "edit_property")) {
    return { allowed: false, reason: "Your role cannot edit properties." };
  }
  if (isPublic(current) && !hasPermission(role, "approve_property")) {
    return {
      allowed: false,
      reason:
        "This property is live on the public site. Changes to it need a Manager or Administrator.",
    };
  }
  return ALLOW;
}
