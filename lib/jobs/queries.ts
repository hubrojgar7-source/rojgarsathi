import { createClient } from "@/lib/supabase/server";
import { filterJobs, type JobSearchFilters } from "./filters";
import type { JobRow } from "./types";

const JOB_SELECT_WITH_CATEGORY =
  "id,clerk_user_id,title,description,company_name,company_description,location,category_id,skills,job_type,is_remote,salary_text,poster_display_name,contact_phone,contact_whatsapp,created_at";

const JOB_SELECT_LEGACY =
  "id,clerk_user_id,title,description,company_name,company_description,location,skills,job_type,is_remote,salary_text,poster_display_name,contact_phone,contact_whatsapp,created_at";

async function fetchPublishedJobs(
  limit: number,
): Promise<JobRow[]> {
  const supabase = await createClient();
  if (!supabase) {
    return [];
  }

  const baseQuery = () =>
    supabase
      .from("jobs")
      .select(JOB_SELECT_WITH_CATEGORY)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit);

  let { data, error } = await baseQuery();

  if (error?.message?.includes("category_id")) {
    const legacy = await supabase
      .from("jobs")
      .select(JOB_SELECT_LEGACY)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (legacy.error) {
      console.error("[getPublishedJobs]", legacy.error.message);
      return [];
    }

    return (legacy.data ?? []).map((row) => ({
      ...(row as Omit<JobRow, "category_id">),
      category_id: null,
    }));
  }

  if (error) {
    console.error("[getPublishedJobs]", error.message);
    return [];
  }

  return (data ?? []) as JobRow[];
}

export async function getPublishedJobs(limit = 48): Promise<JobRow[]> {
  return fetchPublishedJobs(limit);
}

export async function searchPublishedJobs(
  filters: JobSearchFilters,
  limit = 48,
): Promise<JobRow[]> {
  const all = await getPublishedJobs(200);
  return filterJobs(all, filters).slice(0, limit);
}

export async function getPublishedJobById(
  id: string,
): Promise<JobRow | null> {
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }

  let { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT_WITH_CATEGORY)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error?.message?.includes("category_id")) {
    const legacy = await supabase
      .from("jobs")
      .select(JOB_SELECT_LEGACY)
      .eq("id", id)
      .eq("status", "published")
      .maybeSingle();

    if (legacy.error) {
      console.error("[getPublishedJobById]", legacy.error.message);
      return null;
    }

    if (!legacy.data) return null;
    return {
      ...(legacy.data as Omit<JobRow, "category_id">),
      category_id: null,
    };
  }

  if (error) {
    console.error("[getPublishedJobById]", error.message);
    return null;
  }

  return data as JobRow | null;
}
