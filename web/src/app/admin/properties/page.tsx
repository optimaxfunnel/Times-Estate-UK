import Link from "next/link";
import type { Metadata } from "next";
import { propertyProvider } from "@/lib/property/provider";
import { formatStatusLabel } from "@/lib/property/format";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { Alert } from "@/components/ui/Alert";

export const metadata: Metadata = { title: "Admin — Properties" };

export default async function AdminPropertiesPage() {
  const role = await getCurrentRole();
  if (!hasPermission(role, "view_admin")) {
    return <Alert tone="danger">Your current role cannot view the admin area.</Alert>;
  }

  const result = await propertyProvider.list({
    includeNonPublicStatuses: true,
    pageSize: 100,
    sort: "newest",
  });
  const canEdit = hasPermission(role, "edit_property");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Properties ({result.total})</h1>
      <p className="mt-1 text-sm text-ink/70">
        Every property, including Draft and Awaiting approval records that
        never appear on the public site.
      </p>
      <div className="mt-6 overflow-x-auto rounded-sm border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-secondary/5">
            <tr>
              <th scope="col" className="px-4 py-2">Address</th>
              <th scope="col" className="px-4 py-2">Category</th>
              <th scope="col" className="px-4 py-2">Status</th>
              <th scope="col" className="px-4 py-2">Updated</th>
              <th scope="col" className="px-4 py-2">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {result.items.map((property) => (
              <tr key={property.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2">{property.displayAddress}</td>
                <td className="px-4 py-2 capitalize">
                  {property.category} · {property.listingType}
                </td>
                <td className="px-4 py-2">{formatStatusLabel(property.status)}</td>
                <td className="px-4 py-2">{new Date(property.updatedAt).toLocaleDateString("en-GB")}</td>
                <td className="px-4 py-2">
                  {canEdit ? (
                    <Link href={`/admin/properties/${property.id}`} className="text-accent underline">
                      Edit
                    </Link>
                  ) : (
                    <span className="text-ink/40">No access</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
