import Link from "next/link";

import { adminDeleteJob } from "@/lib/admin/actions";
import type { AdminJobRow } from "@/lib/admin/queries";

import { AdminDeleteButton } from "./AdminDeleteButton";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function statusBadge(status: string) {
  const styles =
    status === "published"
      ? "bg-emerald-100 text-emerald-800"
      : status === "closed"
        ? "bg-slate-200 text-slate-700"
        : "bg-amber-100 text-amber-800";
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${styles}`}
    >
      {status}
    </span>
  );
}

export function AdminJobsTable({ jobs }: { jobs: AdminJobRow[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">Job listings</h2>
        <p className="text-sm text-slate-500">{jobs.length} shown (newest first)</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 sm:px-6">Title</th>
              <th className="px-4 py-3">Poster</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Posted</th>
              <th className="px-4 py-3 sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                  No jobs yet.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/80">
                  <td className="max-w-[200px] px-4 py-3 font-medium text-slate-900 sm:px-6">
                    <span className="line-clamp-2">{job.title}</span>
                    <span className="mt-0.5 block text-xs font-normal text-slate-500">
                      {job.company_name || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {job.poster_display_name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{job.location}</td>
                  <td className="px-4 py-3">{statusBadge(job.status)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {formatDate(job.created_at)}
                  </td>
                  <td className="px-4 py-3 sm:px-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        target="_blank"
                      >
                        View
                      </Link>
                      <AdminDeleteButton
                        action={adminDeleteJob}
                        idField="job_id"
                        id={job.id}
                        label="Delete"
                        confirmMessage={`Delete job "${job.title}"?`}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
