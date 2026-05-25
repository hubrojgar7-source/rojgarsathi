import { createClient } from "@/lib/supabase/server";
import type { ReviewRow } from "./types";

export async function getPublishedReviews(limit = 24): Promise<ReviewRow[]> {
  const supabase = await createClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("id,clerk_user_id,author_name,author_role,rating,body,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getPublishedReviews]", error.message);
    return [];
  }
  return (data ?? []) as ReviewRow[];
}
