import {
  getCategoryById,
  JOB_CATEGORIES,
  resolveCategoryId,
} from "./categories";
import type { JobRow } from "./types";
import { parseSkills } from "./skills";

export type JobSearchFilters = {
  q?: string;
  location?: string;
  category?: string;
  type?: string;
  remote?: boolean;
};

export function parseJobSearchParams(
  params: Record<string, string | string[] | undefined>,
): JobSearchFilters {
  const pick = (key: string) => {
    const v = params[key];
    if (Array.isArray(v)) return v[0]?.trim() || undefined;
    return v?.trim() || undefined;
  };

  const remoteRaw = pick("remote");
  const remote =
    remoteRaw === "1" || remoteRaw === "true" || remoteRaw === "yes";

  const categoryRaw = pick("category");
  const category = resolveCategoryId(categoryRaw) ?? categoryRaw;

  return {
    q: pick("q"),
    location: pick("location"),
    category,
    type: pick("type"),
    remote: remoteRaw ? remote : undefined,
  };
}

function jobSearchText(job: JobRow): string {
  const skills = parseSkills(job.skills).join(" ");
  return [
    job.title,
    job.description,
    job.company_name,
    job.company_description ?? "",
    job.location,
    skills,
    job.job_type,
  ]
    .join(" ")
    .toLowerCase();
}

export function filterJobs(jobs: JobRow[], filters: JobSearchFilters): JobRow[] {
  let result = jobs;

  if (filters.q) {
    const terms = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
    result = result.filter((job) => {
      const hay = jobSearchText(job);
      return terms.every((term) => hay.includes(term));
    });
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter((job) =>
      (job.location ?? "").toLowerCase().includes(loc),
    );
  }

  if (filters.category) {
    const catId = resolveCategoryId(filters.category);
    const cat = catId ? getCategoryById(catId) : undefined;
    if (cat) {
      result = result.filter((job) => {
        const jobCat = resolveCategoryId(job.category_id ?? undefined);
        if (jobCat) return jobCat === cat.id;
        const hay = jobSearchText(job);
        return cat.keywords.some((kw) => hay.includes(kw.toLowerCase()));
      });
    }
  }

  if (filters.type) {
    result = result.filter((job) => job.job_type === filters.type);
  }

  if (filters.remote === true) {
    result = result.filter((job) => job.is_remote);
  }

  return result;
}

export function countJobsByCategory(
  jobs: JobRow[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const job of jobs) {
    const explicit = resolveCategoryId(job.category_id ?? undefined);
    if (explicit) {
      counts[explicit] = (counts[explicit] ?? 0) + 1;
      continue;
    }
    const hay = jobSearchText(job);
    for (const cat of JOB_CATEGORIES) {
      if (cat.keywords.some((kw) => hay.includes(kw.toLowerCase()))) {
        counts[cat.id] = (counts[cat.id] ?? 0) + 1;
      }
    }
  }
  return counts;
}

/** Build `/?q=...&category=...#categories` from filter state. */
export function buildJobsSearchUrl(filters: JobSearchFilters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.location) params.set("location", filters.location);
  if (filters.category) params.set("category", filters.category);
  if (filters.type) params.set("type", filters.type);
  if (filters.remote) params.set("remote", "1");

  const qs = params.toString();
  return qs ? `/?${qs}#job-results` : "/#categories";
}

export function hasActiveFilters(filters: JobSearchFilters): boolean {
  return Boolean(
    filters.q ||
      filters.location ||
      filters.category ||
      filters.type ||
      filters.remote,
  );
}

export function describeActiveFilters(filters: JobSearchFilters): string[] {
  const parts: string[] = [];
  if (filters.q) parts.push(`“${filters.q}”`);
  if (filters.location) parts.push(`in ${filters.location}`);
  const cat = getCategoryById(filters.category);
  if (cat) parts.push(cat.name);
  if (filters.type) parts.push(filters.type.replace(/-/g, " "));
  if (filters.remote) parts.push("remote-friendly");
  return parts;
}
