import Link from "next/link";

import type { JobRow } from "@/lib/jobs/types";
import { parseSkills } from "@/lib/jobs/skills";

function companyInitial(name: string) {
  const t = name.trim();
  if (!t) return "?";
  return t[0]?.toUpperCase() ?? "?";
}

function daysLabel(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  return `Posted ${days} days ago`;
}

function formatJobType(job: JobRow) {
  const base = job.job_type.replace(/-/g, " ");
  if (job.is_remote) return `${base} · Remote-friendly`;
  return base;
}

function blurb(description: string) {
  const oneLine = description.replace(/\s+/g, " ").trim();
  if (oneLine.length <= 140) return oneLine;
  return `${oneLine.slice(0, 137)}…`;
}

const brandClasses = [
  "bg-sky-500",
  "bg-violet-500",
  "bg-indigo-500",
  "bg-emerald-600",
  "bg-slate-800",
];

function brandFor(initial: string) {
  return brandClasses[initial.charCodeAt(0) % brandClasses.length];
}

type Props = {
  jobs: JobRow[];
};

export function JobListingGrid({ jobs }: Props) {
  return (
    <div className="mt-10 flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 xl:grid-cols-4">
      {jobs.map((job) => {
        const company = job.company_name || "Company";
        const initial = companyInitial(company);
        const brand = brandFor(initial);
        const skills = parseSkills(job.skills).slice(0, 3);

        return (
          <article
            key={job.id}
            className="min-w-[280px] shrink-0 snap-start rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:min-w-0"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
              <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {formatJobType(job)}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">{blurb(job.description)}</p>
            {skills.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span>{daysLabel(job.created_at)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700">
                {job.salary_text?.trim() || "Compensation in listing"}
              </span>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white ${brand}`}
              >
                {initial}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{company}</p>
                <p className="text-xs text-slate-500">
                  {job.location?.trim() || "Location in listing"}
                </p>
              </div>
            </div>
            <Link
              href={`/jobs/${job.id}`}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
            >
              View job
            </Link>
          </article>
        );
      })}
    </div>
  );
}
