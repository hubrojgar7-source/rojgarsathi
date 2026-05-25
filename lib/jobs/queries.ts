import { createClient } from "@/lib/supabase/server";
import { filterJobs, type JobSearchFilters } from "./filters";
import type { JobRow } from "./types";

export async function getPublishedJobs(limit = 48): Promise<JobRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "id,clerk_user_id,title,description,company_name,company_description,location,category_id,skills,job_type,is_remote,salary_text,poster_display_name,contact_phone,contact_whatsapp,created_at",
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getPublishedJobs]", error.message);
    return [];
  }
  return (data ?? []) as JobRow[];
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
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "id,clerk_user_id,title,description,company_name,company_description,location,category_id,skills,job_type,is_remote,salary_text,poster_display_name,contact_phone,contact_whatsapp,created_at",
    )
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[getPublishedJobById]", error.message);
    return null;
  }
  return data as JobRow | null;
}
