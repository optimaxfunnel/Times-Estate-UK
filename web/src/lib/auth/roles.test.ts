import { describe, expect, it } from "vitest";
import { hasPermission } from "@/lib/auth/roles";

describe("role permission boundaries", () => {
  it("lets a Property Editor create and edit properties, but not approve them", () => {
    expect(hasPermission("property_editor", "create_property")).toBe(true);
    expect(hasPermission("property_editor", "edit_property")).toBe(true);
    expect(hasPermission("property_editor", "approve_property")).toBe(false);
  });

  it("lets a Manager approve properties and view the audit log", () => {
    expect(hasPermission("manager", "approve_property")).toBe(true);
    expect(hasPermission("manager", "view_audit_log")).toBe(true);
  });

  it("only lets an Administrator manage users", () => {
    expect(hasPermission("administrator", "manage_users")).toBe(true);
    expect(hasPermission("manager", "manage_users")).toBe(false);
    expect(hasPermission("property_editor", "manage_users")).toBe(false);
    expect(hasPermission("content_editor", "manage_users")).toBe(false);
    expect(hasPermission("enquiry_viewer", "manage_users")).toBe(false);
  });

  it("restricts an Enquiry Viewer to viewing enquiries only, not editing properties", () => {
    expect(hasPermission("enquiry_viewer", "view_enquiries")).toBe(true);
    expect(hasPermission("enquiry_viewer", "edit_property")).toBe(false);
    expect(hasPermission("enquiry_viewer", "edit_content_pages")).toBe(false);
  });

  it("restricts a Content Editor to content pages, not properties", () => {
    expect(hasPermission("content_editor", "edit_content_pages")).toBe(true);
    expect(hasPermission("content_editor", "edit_property")).toBe(false);
  });
});
