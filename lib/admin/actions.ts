"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { getStaffSession } from "./auth";
import {
  banClerkUser,
  deleteClerkUser,
  findClerkUserByEmail,
  unbanClerkUser,
} from "./clerk-admin";
import { canBanUsers, canManageTeam, canRemoveUserFromSite } from "./roles";
import { countAdmins } from "./staff-queries";
import type { StaffRole } from "./types";

export type AdminActionState = {
  error?: string;
  success?: boolean;
  message?: string;
};

async function getSessionOrError(): Promise<
  { session: NonNullable<Awaited<ReturnType<typeof getStaffSession>>> } | { error: string }
> {
  const session = await getStaffSession();
  if (!session) return { error: "You do not have dashboard access." };
  return { session };
}

// ——— Jobs & reviews ———

export async function adminDeleteJob(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };

  const jobId = String(formData.get("job_id") ?? "").trim();
  if (!jobId) return { error: "Invalid job." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("jobs").delete().eq("id", jobId);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/admin/jobs");
  revalidatePath("/");
  return { success: true };
}

export async function adminDeleteReview(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };

  const reviewId = String(formData.get("review_id") ?? "").trim();
  if (!reviewId) return { error: "Invalid review." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true };
}

// ——— Team ———

export async function inviteStaffMember(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };
  if (!canManageTeam(gate.session.role)) {
    return { error: "Only admins can manage team members." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "").trim() as StaffRole;

  if (!email || !email.includes("@")) {
    return { error: "Enter a valid email address." };
  }
  if (role !== "admin" && role !== "manager") {
    return { error: "Choose a role: Admin or Manager." };
  }

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("site_staff")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (existing) return { error: "This email is already on the team." };

  const clerkUser = await findClerkUserByEmail(email);
  const displayName = clerkUser
    ? [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      clerkUser.username ||
      email
    : null;

  const { error } = await supabase.from("site_staff").insert({
    email,
    role,
    clerk_user_id: clerkUser?.id ?? null,
    display_name: displayName,
    invited_by: gate.session.clerkUserId,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/team");
  return { success: true, message: `${email} added as ${role}.` };
}

export async function updateStaffMemberRole(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };
  if (!canManageTeam(gate.session.role)) {
    return { error: "Only admins can change roles." };
  }

  const staffId = String(formData.get("staff_id") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim() as StaffRole;

  if (!staffId) return { error: "Invalid team member." };
  if (role !== "admin" && role !== "manager") {
    return { error: "Invalid role." };
  }

  const supabase = createAdminClient();
  const { data: target } = await supabase
    .from("site_staff")
    .select("id,role,clerk_user_id")
    .eq("id", staffId)
    .maybeSingle();

  if (!target) return { error: "Team member not found." };

  if (target.role === "admin" && role === "manager") {
    const admins = await countAdmins();
    if (admins <= 1) {
      return { error: "Cannot demote the last admin." };
    }
  }

  const { error } = await supabase
    .from("site_staff")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", staffId);

  if (error) return { error: error.message };

  revalidatePath("/admin/team");
  return { success: true };
}

export async function removeStaffMember(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };
  if (!canManageTeam(gate.session.role)) {
    return { error: "Only admins can remove team members." };
  }

  const staffId = String(formData.get("staff_id") ?? "").trim();
  if (!staffId) return { error: "Invalid team member." };

  const supabase = createAdminClient();
  const { data: target } = await supabase
    .from("site_staff")
    .select("id,role,clerk_user_id")
    .eq("id", staffId)
    .maybeSingle();

  if (!target) return { error: "Team member not found." };
  if (target.clerk_user_id === gate.session.clerkUserId) {
    return { error: "You cannot remove yourself." };
  }
  if (target.role === "admin") {
    const admins = await countAdmins();
    if (admins <= 1) return { error: "Cannot remove the last admin." };
  }

  const { error } = await supabase.from("site_staff").delete().eq("id", staffId);
  if (error) return { error: error.message };

  revalidatePath("/admin/team");
  return { success: true };
}

// ——— Site users ———

async function purgeUserContent(clerkUserId: string) {
  const supabase = createAdminClient();
  await supabase.from("jobs").delete().eq("clerk_user_id", clerkUserId);
  await supabase.from("reviews").delete().eq("clerk_user_id", clerkUserId);
  await supabase.from("profiles").delete().eq("clerk_user_id", clerkUserId);
}

export async function banSiteUser(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };
  if (!canBanUsers(gate.session.role)) {
    return { error: "You cannot ban users." };
  }

  const clerkUserId = String(formData.get("clerk_user_id") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim() || null;
  if (!clerkUserId) return { error: "Invalid user." };

  if (clerkUserId === gate.session.clerkUserId) {
    return { error: "You cannot ban yourself." };
  }

  const supabase = createAdminClient();
  const { data: staff } = await supabase
    .from("site_staff")
    .select("id")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();

  if (staff) return { error: "Remove this person from the team first." };

  let email: string | null = null;
  try {
    const { getClerkAdmin } = await import("./clerk-admin");
    const user = await getClerkAdmin().users.getUser(clerkUserId);
    email = user.primaryEmailAddress?.emailAddress ?? null;
    await banClerkUser(clerkUserId);
  } catch {
    /* Clerk ban optional if API fails */
  }

  const { error } = await supabase.from("banned_users").upsert(
    {
      clerk_user_id: clerkUserId,
      email,
      reason,
      banned_by: gate.session.clerkUserId,
    },
    { onConflict: "clerk_user_id" },
  );

  if (error) return { error: error.message };

  await purgeUserContent(clerkUserId);

  revalidatePath("/admin/users");
  revalidatePath("/");
  return { success: true, message: "User banned and content removed." };
}

export async function unbanSiteUser(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };
  if (!canBanUsers(gate.session.role)) {
    return { error: "You cannot unban users." };
  }

  const clerkUserId = String(formData.get("clerk_user_id") ?? "").trim();
  if (!clerkUserId) return { error: "Invalid user." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("banned_users")
    .delete()
    .eq("clerk_user_id", clerkUserId);

  if (error) return { error: error.message };

  try {
    await unbanClerkUser(clerkUserId);
  } catch {
    /* ignore */
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function removeUserFromSite(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const gate = await getSessionOrError();
  if ("error" in gate) return { error: gate.error };
  if (!canRemoveUserFromSite(gate.session.role)) {
    return { error: "Only admins can permanently remove users." };
  }

  const clerkUserId = String(formData.get("clerk_user_id") ?? "").trim();
  if (!clerkUserId) return { error: "Invalid user." };

  if (clerkUserId === gate.session.clerkUserId) {
    return { error: "You cannot remove yourself." };
  }

  const supabase = createAdminClient();
  await supabase.from("site_staff").delete().eq("clerk_user_id", clerkUserId);
  await supabase.from("banned_users").upsert({
    clerk_user_id: clerkUserId,
    banned_by: gate.session.clerkUserId,
    reason: "Removed from site by admin",
  });

  await purgeUserContent(clerkUserId);

  try {
    await deleteClerkUser(clerkUserId);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not delete Clerk account.";
    return {
      error: `Content removed but Clerk delete failed: ${msg}`,
    };
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true, message: "User removed from the website." };
}

export async function banUserByEmail(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "Enter an email." };

  const clerkUser = await findClerkUserByEmail(email);
  if (!clerkUser) {
    return {
      error:
        "No account found with this email. They must sign up first, or ban by user ID from the list below.",
    };
  }

  const fd = new FormData();
  fd.set("clerk_user_id", clerkUser.id);
  fd.set("reason", String(formData.get("reason") ?? ""));
  return banSiteUser(_prev, fd);
}
