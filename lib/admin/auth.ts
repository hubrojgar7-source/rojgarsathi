import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";
import type { StaffRole, StaffSession } from "./types";

function envBootstrapEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function envBootstrapIds(): string[] {
  return (process.env.ADMIN_CLERK_USER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

async function bootstrapStaffIfNeeded(
  clerkUserId: string,
  email: string,
  displayName: string,
): Promise<StaffRole | null> {
  const emails = envBootstrapEmails();
  const ids = envBootstrapIds();
  const normalized = email.toLowerCase();

  const isBootstrap =
    emails.includes(normalized) || ids.includes(clerkUserId);
  if (!isBootstrap) return null;

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("site_staff")
    .select("role")
    .eq("email", normalized)
    .maybeSingle();

  if (existing?.role) {
    await supabase
      .from("site_staff")
      .update({
        clerk_user_id: clerkUserId,
        display_name: displayName,
        updated_at: new Date().toISOString(),
      })
      .eq("email", normalized);
    return existing.role as StaffRole;
  }

  const { error } = await supabase.from("site_staff").insert({
    clerk_user_id: clerkUserId,
    email: normalized,
    display_name: displayName,
    role: "admin",
    invited_by: null,
  });

  if (error) {
    console.error("[bootstrapStaffIfNeeded]", error.message);
    return "admin";
  }
  return "admin";
}

async function getStaffByClerkId(clerkUserId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("site_staff")
    .select("id,clerk_user_id,email,display_name,role,invited_by,created_at")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();
  return data;
}

async function getStaffByEmail(email: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("site_staff")
    .select("id,clerk_user_id,email,display_name,role,invited_by,created_at")
    .ilike("email", email)
    .maybeSingle();
  return data;
}

export async function getStaffSession(): Promise<StaffSession | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  const email =
    user.primaryEmailAddress?.emailAddress?.toLowerCase() ??
    user.emailAddresses[0]?.emailAddress?.toLowerCase() ??
    "";
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "Staff";

  let staff = await getStaffByClerkId(userId);
  if (!staff && email) {
    staff = await getStaffByEmail(email);
    if (staff) {
      const supabase = createAdminClient();
      await supabase
        .from("site_staff")
        .update({
          clerk_user_id: userId,
          display_name: displayName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", staff.id);
    }
  }

  if (!staff && email) {
    const bootRole = await bootstrapStaffIfNeeded(userId, email, displayName);
    if (bootRole) {
      staff = await getStaffByClerkId(userId);
    }
  }

  if (!staff) return null;

  return {
    clerkUserId: userId,
    email: staff.email,
    displayName: staff.display_name ?? displayName,
    role: staff.role as StaffRole,
    staffId: staff.id,
  };
}

export async function isStaff(): Promise<boolean> {
  return (await getStaffSession()) !== null;
}

export async function requireStaff(): Promise<StaffSession> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin");
  }
  const session = await getStaffSession();
  if (!session) {
    redirect("/?error=admin-access-denied");
  }
  return session;
}

/** @deprecated Use requireStaff */
export async function requireAdmin(): Promise<void> {
  await requireStaff();
}

/** @deprecated Use isStaff */
export async function isAdmin(): Promise<boolean> {
  return isStaff();
}
