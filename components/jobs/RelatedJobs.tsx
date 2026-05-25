import Link from "next/link";

import { getPublishedJobs } from "@/lib/jobs/queries";
import { parseSkills } from "@/lib/jobs/skills";

type Props = { currentJobId: string };

export async function RelatedJobs({ currentJobId }: Props) {
  const jobs = await getPublishedJobs(8);
  const related = jobs.filter((j) => j.id !== currentJobId).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">Related jobs</h3>
      <ul className="mt-4 space-y-3">
        {related.map((job) => {
          const skill = parseSkills(job.skills)[0];
          return (
            <li key={job.id}>
              <Link
                href={`/jobs/${job.id}`}
                className="block rounded-lg border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <p className="font-semibold text-slate-900 line-clamp-1">
                  {job.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                  {job.company_name || "Company"} · {job.location || "Location TBD"}
                </p>
                {skill ? (
                  <span className="mt-2 inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {skill}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/#jobs"
        className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        View all jobs →
      </Link>
    </section>
  );
}
