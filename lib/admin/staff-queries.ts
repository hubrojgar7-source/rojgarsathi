import { createAdminClient } from "@/lib/supabase/admin";
import type { StaffRow } from "./types";

export async function getStaffList(): Promise<StaffRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_staff")
    .select("id,clerk_user_id,email,display_name,role,invited_by,created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getStaffList]", error.message);
    return [];
  }
  return (data ?? []) as StaffRow[];
}

export async function countAdmins(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("site_staff")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");

  if (error) return 0;
  return count ?? 0;
}
