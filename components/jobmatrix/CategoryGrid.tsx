import Link from "next/link";

import { JobListingGrid } from "@/components/jobs/JobListingGrid";
import { getCategoryById, JOB_CATEGORIES } from "@/lib/jobs/categories";
import {
  buildJobsSearchUrl,
  countJobsByCategory,
  describeActiveFilters,
  hasActiveFilters,
  type JobSearchFilters,
} from "@/lib/jobs/filters";
import { getPublishedJobs, searchPublishedJobs } from "@/lib/jobs/queries";
import { getCategoryIcon } from "./category-icons";

type Props = {
  filters?: JobSearchFilters;
};

export async function CategoryGrid({ filters = {} }: Props) {
  const activeCategory = filters.category;
  const filtering = hasActiveFilters(filters);
  const allJobs = await getPublishedJobs(200);
  const counts = countJobsByCategory(allJobs);
  const jobs = filtering ? await searchPublishedJobs(filters, 48) : [];
  const summary = describeActiveFilters(filters);
  const categoryName = getCategoryById(activeCategory)?.name;

  return (
    <section id="categories" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem] sm:leading-tight">
            Popular Job Categories
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
            Jobs in 24+ sectors across Nepal — hotel & restaurant, teaching,
            driving, IT, health, and more.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
          {JOB_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const isActive = activeCategory === cat.id;
            const open = counts[cat.id] ?? 0;

            return (
              <Link
                key={cat.id}
                href={buildJobsSearchUrl({
                  ...filters,
                  category: isActive ? undefined : cat.id,
                })}
                className={`flex min-h-[92px] items-center gap-4 rounded-xl px-4 py-4 transition-shadow sm:min-h-[96px] sm:gap-5 sm:rounded-2xl sm:px-5 sm:py-4 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-500/20"
                    : "bg-[#F0F6FC] text-slate-900 hover:shadow-md"
                }`}
              >
                <span
                  className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full sm:h-14 sm:w-14 ${
                    isActive
                      ? "bg-white text-blue-500"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  <Icon className="h-[26px] w-[26px] sm:h-7 sm:w-7" />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p
                    className={`text-base font-bold leading-snug sm:text-lg ${
                      isActive ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {cat.name}
                  </p>
                  <p
                    className={`mt-1 text-sm font-medium sm:text-[0.9375rem] ${
                      isActive ? "text-blue-50" : "text-slate-500"
                    }`}
                  >
                    {open} open {open === 1 ? "position" : "positions"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {filtering ? (
          <div id="job-results" className="mt-14 border-t border-slate-100 pt-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {categoryName
                    ? `Jobs in ${categoryName}`
                    : summary.length > 0
                      ? "Matching jobs"
                      : "Search results"}
                </h3>
                {summary.length > 0 ? (
                  <p className="mt-1 text-sm text-slate-600">
                    {jobs.length} {jobs.length === 1 ? "job" : "jobs"} ·{" "}
                    {summary.join(" · ")}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-slate-600">
                    {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
                  </p>
                )}
              </div>
              <Link
                href="/#categories"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </Link>
            </div>

            {jobs.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                <p className="font-semibold text-slate-800">No jobs in this category yet</p>
                <p className="mt-2 text-sm text-slate-600">
                  Try another category or post a job for this field.
                </p>
                <Link
                  href="/post-job"
                  className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Post a job
                </Link>
              </div>
            ) : (
              <JobListingGrid jobs={jobs} />
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
