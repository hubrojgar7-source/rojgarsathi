import { InviteStaffForm } from "@/components/admin/InviteStaffForm";
import { TeamMemberActions } from "@/components/admin/TeamMemberActions";
import { requireStaff } from "@/lib/admin/auth";
import { canManageTeam } from "@/lib/admin/roles";
import { roleLabel } from "@/lib/admin/roles";
import { getStaffList } from "@/lib/admin/staff-queries";
import { redirect } from "next/navigation";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminTeamPage() {
  const session = await requireStaff();
  if (!canManageTeam(session.role)) {
    redirect("/admin?error=team-access-denied");
  }

  const staff = await getStaffList();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Team & roles</h1>
        <p className="mt-1 text-slate-600">
          Add people as <strong>Admin</strong> (full control) or{" "}
          <strong>Manager</strong> (jobs, reviews, ban users — no team management).
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Invite by email</h2>
        <p className="mt-1 text-sm text-slate-500">
          They can sign in with this email to open the admin dashboard.
        </p>
        <div className="mt-4">
          <InviteStaffForm />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">Current team</h2>
          <p className="text-sm text-slate-500">{staff.length} members</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 sm:px-6">Person</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 sm:px-6">
                    <p className="font-medium text-slate-900">
                      {member.display_name ?? member.email}
                    </p>
                    <p className="text-xs text-slate-500">{member.email}</p>
                    {!member.clerk_user_id ? (
                      <p className="mt-0.5 text-xs text-amber-600">Not signed in yet</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                      {roleLabel(member.role)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {formatDate(member.created_at)}
                  </td>
                  <td className="px-4 py-3 sm:px-6">
                    <TeamMemberActions
                      member={member}
                      currentStaffId={session.staffId}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
