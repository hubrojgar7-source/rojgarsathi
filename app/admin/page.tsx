import Link from "next/link";

import { getStaffSession } from "@/lib/admin/auth";
import { canManageTeam } from "@/lib/admin/roles";
import { getAdminStats } from "@/lib/admin/queries";
import { getBannedUsers } from "@/lib/admin/users-queries";
import { getStaffList } from "@/lib/admin/staff-queries";

export default async function AdminOverviewPage() {
  const [stats, staff, banned, session] = await Promise.all([
    getAdminStats(),
    getStaffList(),
    getBannedUsers(),
    getStaffSession(),
  ]);

  const isAdmin = session ? canManageTeam(session.role) : false;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Overview</h1>
        <p className="mt-1 text-slate-600">
          Site stats and quick links. Use the sidebar for full controls.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total jobs" value={stats.jobsTotal} href="/admin/jobs" />
        <StatCard label="Published jobs" value={stats.jobsPublished} href="/admin/jobs" />
        <StatCard label="Reviews" value={stats.reviewsTotal} href="/admin/reviews" />
        <StatCard label="Team members" value={staff.length} href="/admin/team" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <QuickLink
          href="/admin/jobs"
          title="Manage jobs"
          description="View, open, or delete job listings."
        />
        <QuickLink
          href="/admin/reviews"
          title="Manage reviews"
          description="Moderate user reviews on the homepage."
        />
        {isAdmin ? (
          <QuickLink
            href="/admin/team"
            title="Team & roles"
            description="Add admins or managers, change roles, remove access."
          />
        ) : null}
        <QuickLink
          href="/admin/users"
          title="Users"
          description={`Ban or remove users. ${banned.length} currently banned.`}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
    </Link>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50/30"
    >
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </Link>
  );
}
