import Link from "next/link";

import {
  buildJobsSearchUrl,
  describeActiveFilters,
  hasActiveFilters,
  type JobSearchFilters,
} from "@/lib/jobs/filters";
import { getCategoryById } from "@/lib/jobs/categories";

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "temporary", label: "Temporary" },
] as const;

type Props = {
  filters: JobSearchFilters;
  totalCount: number;
};

export function JobsFilterBar({ filters, totalCount }: Props) {
  const active = hasActiveFilters(filters);
  const summary = describeActiveFilters(filters);

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{totalCount}</span>{" "}
          {totalCount === 1 ? "job" : "jobs"}
          {active && summary.length > 0 ? (
            <span> matching {summary.join(" · ")}</span>
          ) : null}
        </p>
        {active ? (
          <Link
            href="/#jobs"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear all filters
          </Link>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Type
        </span>
        {JOB_TYPES.map(({ value, label }) => {
          const selected = filters.type === value;
          return (
            <Link
              key={value}
              href={buildJobsSearchUrl({
                ...filters,
                type: selected ? undefined : value,
              })}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          More
        </span>
        <Link
          href={buildJobsSearchUrl({
            ...filters,
            remote: filters.remote ? undefined : true,
          })}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            filters.remote
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          Remote-friendly
        </Link>
        {filters.category ? (
          <Link
            href={buildJobsSearchUrl({ ...filters, category: undefined })}
            className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-800 hover:bg-violet-200"
          >
            Category: {getCategoryById(filters.category)?.name ?? filters.category} ×
          </Link>
        ) : null}
      </div>
    </div>
  );
}
