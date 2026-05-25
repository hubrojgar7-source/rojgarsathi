import { BanByEmailForm } from "@/components/admin/BanByEmailForm";
import { UserRowActions } from "@/components/admin/UserRowActions";
import { requireStaff } from "@/lib/admin/auth";
import { canBanUsers } from "@/lib/admin/roles";
import { getBannedUsers, getSiteUsers } from "@/lib/admin/users-queries";
import { redirect } from "next/navigation";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminUsersPage() {
  const session = await requireStaff();
  if (!canBanUsers(session.role)) {
    redirect("/admin?error=users-access-denied");
  }

  const [users, banned] = await Promise.all([getSiteUsers(), getBannedUsers()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Users</h1>
        <p className="mt-1 text-slate-600">
          Ban users to block sign-in and remove their jobs and reviews. Admins can
          permanently delete accounts from the site.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Ban by email</h2>
        <p className="mt-1 text-sm text-slate-500">
          User must have signed up at least once with this email.
        </p>
        <div className="mt-4">
          <BanByEmailForm />
        </div>
      </section>

      {banned.length > 0 ? (
        <section className="rounded-2xl border border-red-100 bg-red-50/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Banned users</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {banned.map((b) => (
              <li key={b.id}>
                {b.email ?? b.clerk_user_id}
                {b.reason ? (
                  <span className="text-slate-500"> — {b.reason}</span>
                ) : null}
                <span className="text-slate-400"> ({formatDate(b.created_at)})</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">Active site users</h2>
          <p className="text-sm text-slate-500">
            From profiles, jobs, and reviews ({users.length} accounts)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 sm:px-6">User</th>
                <th className="px-4 py-3">Jobs</th>
                <th className="px-4 py-3">Reviews</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No users with activity yet.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.clerk_user_id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 sm:px-6">
                      <p className="font-medium text-slate-900">
                        {user.display_name ?? "Unknown"}
                      </p>
                      <p className="font-mono text-xs text-slate-500">
                        {user.clerk_user_id.slice(0, 12)}…
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{user.jobs_count}</td>
                    <td className="px-4 py-3 text-slate-600">{user.reviews_count}</td>
                    <td className="px-4 py-3">
                      {user.is_banned ? (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
                          Banned
                        </span>
                      ) : user.is_staff ? (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                          Staff
                        </span>
                      ) : (
                        <span className="text-slate-400">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      <UserRowActions user={user} viewerRole={session.role} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
