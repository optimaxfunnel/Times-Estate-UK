import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { propertyProvider } from "@/lib/property/provider";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { Alert } from "@/components/ui/Alert";
import { PropertyEditForm } from "@/components/admin/PropertyEditForm";
import {
  FloorPlansManager,
  PropertyPhotosManager,
} from "@/components/admin/PropertyPhotosManager";
import { canEditContent } from "@/lib/property/workflow";

export const metadata: Metadata = { title: "Admin — Edit Property" };

export default async function AdminEditPropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { id } = await params;
  const { created } = await searchParams;
  const role = await getCurrentRole();

  if (!hasPermission(role, "view_admin")) {
    return (
      <Alert tone="danger">Your current role cannot view the admin area.</Alert>
    );
  }

  const property = await propertyProvider.getById(id);
  if (!property) notFound();

  if (!hasPermission(role, "edit_property")) {
    return (
      <Alert tone="danger">
        Your current role ({role.replace("_", " ")}) does not have permission to
        edit properties. Switch to a Property Editor, Manager or Administrator
        role above to try this.
      </Alert>
    );
  }

  const photoDecision = canEditContent(role, property.status);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-ink">
        {property.displayAddress}
      </h1>
      <p className="mt-1 text-sm text-ink/70">
        Internal reference: {property.id} &middot; Private address (never
        public): {property.privateAddress}
      </p>
      {created === "1" && (
        <Alert tone="success" className="mt-4">
          Draft saved. It is not on the website yet. When it&rsquo;s ready,
          change the status to &ldquo;Awaiting approval&rdquo; below.
        </Alert>
      )}
      <div className="mt-6">
        <PropertyEditForm
          property={property}
          canApprove={hasPermission(role, "approve_property")}
        />
      </div>
      <div className="mt-10">
        <PropertyPhotosManager
          propertyId={property.id}
          images={property.media.images}
          canEdit={photoDecision.allowed}
          reason={photoDecision.allowed ? undefined : photoDecision.reason}
        />
      </div>
      <div className="mt-10">
        <FloorPlansManager
          propertyId={property.id}
          floorPlans={property.media.floorPlans}
          canEdit={photoDecision.allowed}
        />
      </div>
    </div>
  );
}
