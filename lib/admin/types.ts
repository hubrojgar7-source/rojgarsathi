export type StaffRole = "admin" | "manager";

export type StaffRow = {
  id: string;
  clerk_user_id: string | null;
  email: string;
  display_name: string | null;
  role: StaffRole;
  invited_by: string | null;
  created_at: string;
};

export type StaffSession = {
  clerkUserId: string;
  email: string;
  displayName: string;
  role: StaffRole;
  staffId: string;
};

export type SiteUserRow = {
  clerk_user_id: string;
  email: string | null;
  display_name: string | null;
  jobs_count: number;
  reviews_count: number;
  is_banned: boolean;
  is_staff: boolean;
  staff_role: StaffRole | null;
};

export type BannedUserRow = {
  id: string;
  clerk_user_id: string;
  email: string | null;
  reason: string | null;
  banned_by: string;
  created_at: string;
};
