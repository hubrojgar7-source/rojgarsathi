import { createAdminClient } from "@/lib/supabase/admin";
import type { BannedUserRow, SiteUserRow } from "./types";

export async function getBannedUsers(): Promise<BannedUserRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("banned_users")
    .select("id,clerk_user_id,email,reason,banned_by,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getBannedUsers]", error.message);
    return [];
  }
  return (data ?? []) as BannedUserRow[];
}

export async function isUserBanned(clerkUserId: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("banned_users")
    .select("id")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();
  return Boolean(data);
}

export async function getSiteUsers(): Promise<SiteUserRow[]> {
  const supabase = createAdminClient();

  const [profilesRes, jobsRes, reviewsRes, staffRes, bannedRes] =
    await Promise.all([
      supabase.from("profiles").select("clerk_user_id,display_name"),
      supabase.from("jobs").select("clerk_user_id"),
      supabase.from("reviews").select("clerk_user_id"),
      supabase.from("site_staff").select("clerk_user_id,email,role"),
      supabase.from("banned_users").select("clerk_user_id,email"),
    ]);

  const userMap = new Map<
    string,
    {
      display_name: string | null;
      jobs_count: number;
      reviews_count: number;
      email: string | null;
    }
  >();

  for (const p of profilesRes.data ?? []) {
    userMap.set(p.clerk_user_id, {
      display_name: p.display_name,
      jobs_count: 0,
      reviews_count: 0,
      email: null,
    });
  }

  for (const j of jobsRes.data ?? []) {
    const cur = userMap.get(j.clerk_user_id) ?? {
      display_name: null,
      jobs_count: 0,
      reviews_count: 0,
      email: null,
    };
    cur.jobs_count += 1;
    userMap.set(j.clerk_user_id, cur);
  }

  for (const r of reviewsRes.data ?? []) {
    if (!r.clerk_user_id) continue;
    const cur = userMap.get(r.clerk_user_id) ?? {
      display_name: null,
      jobs_count: 0,
      reviews_count: 0,
      email: null,
    };
    cur.reviews_count += 1;
    userMap.set(r.clerk_user_id, cur);
  }

  const staffByClerk = new Map(
    (staffRes.data ?? [])
      .filter((s) => s.clerk_user_id)
      .map((s) => [s.clerk_user_id!, s]),
  );
  const staffByEmail = new Map(
    (staffRes.data ?? []).map((s) => [s.email.toLowerCase(), s]),
  );
  const bannedIds = new Set(
    (bannedRes.data ?? []).map((b) => b.clerk_user_id),
  );

  const rows: SiteUserRow[] = [];

  for (const [clerkUserId, info] of userMap) {
    const staff =
      staffByClerk.get(clerkUserId) ??
      (info.email ? staffByEmail.get(info.email.toLowerCase()) : undefined);

    rows.push({
      clerk_user_id: clerkUserId,
      email: info.email,
      display_name: info.display_name,
      jobs_count: info.jobs_count,
      reviews_count: info.reviews_count,
      is_banned: bannedIds.has(clerkUserId),
      is_staff: Boolean(staff),
      staff_role: staff?.role ?? null,
    });
  }

  rows.sort((a, b) => b.jobs_count - a.jobs_count);
  return rows;
}

