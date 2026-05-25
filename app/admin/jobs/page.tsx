import { AdminJobsTable } from "@/components/admin/AdminJobsTable";
import { getAdminJobs } from "@/lib/admin/queries";

export default async function AdminJobsPage() {
  const jobs = await getAdminJobs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Jobs</h1>
        <p className="mt-1 text-slate-600">View and delete job listings.</p>
      </div>
      <AdminJobsTable jobs={jobs} />
    </div>
  );
}
