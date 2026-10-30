import type { Metadata } from "next";
import { getCurrentRole } from "@/lib/auth/session";
import { contentGaps } from "@/lib/content-gaps";

export const metadata: Metadata = { title: "Admin — Content status" };

/**
 * Staff view of every unresolved content item. Public pages hide these
 * notes in a production build (see PlaceholderNotice), so this page is
 * where they stay visible. Any signed-in role may read it.
 */
export default async function AdminContentPage() {
  await getCurrentRole();
  const blockers = contentGaps.filter((g) => g.blocksLaunch).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Content status</h1>
      <p className="mt-1 text-sm text-ink/70">
        {contentGaps.length} open items, {blockers} of which must be resolved
        before launch. Full detail in CONTENT_VERIFICATION_REGISTER.md.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-ink/70">
              <th scope="col" className="py-2 pr-4 font-medium">
                Item
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                Where
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                Status
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contentGaps.map((gap) => (
              <tr key={gap.item} className="border-b border-border align-top">
                <td className="py-2 pr-4 text-ink">
                  {gap.item}
                  {gap.blocksLaunch && (
                    <span className="ml-2 rounded-sm bg-danger/10 px-1.5 py-0.5 text-xs font-semibold text-danger">
                      Blocks launch
                    </span>
                  )}
                </td>
                <td className="py-2 pr-4 text-ink/80">{gap.location}</td>
                <td className="py-2 pr-4 text-ink/80">{gap.status}</td>
                <td className="py-2 pr-4 text-ink/80">{gap.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
