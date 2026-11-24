import type { Metadata } from "next";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { Alert } from "@/components/ui/Alert";
import { AddPropertyForm } from "@/components/admin/AddPropertyForm";

export const metadata: Metadata = { title: "Admin — Add a property" };

export default async function NewPropertyPage() {
  const role = await getCurrentRole();
  if (!hasPermission(role, "create_property")) {
    return <Alert tone="danger">Your current role cannot add properties.</Alert>;
  }
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Add a property</h1>
        <p className="mt-2 text-sm text-ink/80">
          The property is saved as a draft. A Manager or Administrator must
          approve it before it appears on the website. Only enter details you
          have checked with the owner or landlord.
        </p>
      </div>
      <Alert tone="info">
        You can add photos on the next screen, once the draft is saved.
      </Alert>
      <AddPropertyForm />
    </div>
  );
}
