import { createAdminClient } from "@/lib/supabase/admin";
import type { ReviewRow } from "@/lib/reviews/types";

export type AdminJobRow = {
  id: string;
  clerk_user_id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  status: string;
  poster_display_name: string | null;
  created_at: string;
};

export type AdminStats = {
  jobsTotal: number;
  jobsPublished: number;
  reviewsTotal: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = createAdminClient();

  const [jobsRes, publishedRes, reviewsRes] = await Promise.all([
    supabase.from("jobs").select("id", { count: "exact", head: true }),
    supabase
      .from("jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
  ]);

  return {
    jobsTotal: jobsRes.count ?? 0,
    jobsPublished: publishedRes.count ?? 0,
    reviewsTotal: reviewsRes.count ?? 0,
  };
}

export async function getAdminJobs(limit = 200): Promise<AdminJobRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "id,clerk_user_id,title,company_name,location,job_type,status,poster_display_name,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getAdminJobs]", error.message);
    return [];
  }
  return (data ?? []) as AdminJobRow[];
}

export async function getAdminReviews(limit = 200): Promise<ReviewRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id,clerk_user_id,author_name,author_role,rating,body,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getAdminReviews]", error.message);
    return [];
  }
  return (data ?? []) as ReviewRow[];
}
