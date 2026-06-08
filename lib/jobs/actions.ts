"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { resolveCategoryId } from "@/lib/jobs/categories";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeSkillsInput, parseSkills } from "@/lib/jobs/skills";
import type {
  CreateJobState,
  DeleteJobState,
  UpdateJobContactState,
} from "./types";

function parseContactFields(formData: FormData) {
  const contactPhone =
    String(formData.get("contact_phone") ?? "").trim() || null;
  const contactWhatsapp =
    String(formData.get("contact_whatsapp") ?? "").trim() || null;
  return { contactPhone, contactWhatsapp };
}

function validateContactFields(contactPhone: string | null, contactWhatsapp: string | null) {
  if (contactPhone && contactPhone.length > 30) {
    return "Phone number is too long (max 30 characters).";
  }
  if (contactWhatsapp && contactWhatsapp.length > 120) {
    return "WhatsApp value is too long (max 120 characters).";
  }
  if (!contactPhone && !contactWhatsapp) {
    return "Add at least a phone number or WhatsApp.";
  }
  return null;
}

const JOB_TYPES = new Set([
  "full-time",
  "part-time",
  "contract",
  "internship",
  "temporary",
]);

function displayNameFromUser(user: NonNullable<Awaited<ReturnType<typeof currentUser>>>) {
  const parts = [user.firstName, user.lastName].filter(Boolean);
  if (parts.length) return parts.join(" ");
  if (user.username) return user.username;
  return "Member";
}

export async function createJob(
  _prev: CreateJobState,
  formData: FormData,
): Promise<CreateJobState> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/post-job");
  }

  const user = await currentUser();
  if (!user) {
    return { error: "Could not load your account. Try signing in again." };
  }

  const displayName = displayNameFromUser(user);

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const companyName = displayName;
  const companyDescription: string | null = null;
  const location = String(formData.get("location") ?? "").trim();
  const categoryId = resolveCategoryId(
    String(formData.get("category_id") ?? "").trim() || undefined,
  );
  const skillsRaw = String(formData.get("skills") ?? "").trim();
  const skills = normalizeSkillsInput(skillsRaw) || null;
  const rawType = String(formData.get("job_type") ?? "full-time").trim();
  const jobType = JOB_TYPES.has(rawType) ? rawType : "full-time";
  const isRemote = formData.get("is_remote") === "on";
  const salaryText = String(formData.get("salary_text") ?? "").trim() || null;
  const { contactPhone, contactWhatsapp } = parseContactFields(formData);

  if (!title) return { error: "Job title is required." };
  if (title.length > 200) return { error: "Title is too long (max 200 characters)." };
  if (!location) return { error: "Job location is required." };
  if (location.length > 200) {
    return { error: "Location is too long (max 200 characters)." };
  }
  if (!categoryId) return { error: "Please select a job category." };
  if (!skills || parseSkills(skills).length === 0) {
    return { error: "Add at least one skill (comma-separated)." };
  }
  if (skills.length > 500) {
    return { error: "Skills list is too long (max 500 characters)." };
  }
  if (!description) return { error: "Description is required." };
  if (description.length > 20000) {
    return { error: "Description is too long (max 20,000 characters)." };
  }
  const contactError = validateContactFields(contactPhone, contactWhatsapp);
  if (contactError) return { error: contactError };

  const supabase = createAdminClient();

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      clerk_user_id: userId,
      display_name: displayName,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "clerk_user_id" },
  );

  if (profileError) {
    return { error: profileError.message };
  }

  const { data: inserted, error: jobError } = await supabase
    .from("jobs")
    .insert({
      clerk_user_id: userId,
      poster_display_name: displayName,
      title,
      description,
      company_name: companyName,
      company_description: companyDescription,
      location,
      category_id: categoryId,
      skills,
      job_type: jobType,
      is_remote: isRemote,
      salary_text: salaryText,
      contact_phone: contactPhone,
      contact_whatsapp: contactWhatsapp,
      status: "published",
    })
    .select("id")
    .single();

  if (jobError) {
    if (jobError.message.includes("category_id")) {
      return {
        error:
          "Job category could not be saved. Ask the site admin to run the latest Supabase migration (job_category).",
      };
    }
    return { error: jobError.message };
  }

  revalidatePath("/");
  revalidatePath(`/jobs/${inserted.id}`);
  redirect(`/jobs/${inserted.id}`);
}

export async function updateJobContact(
  _prev: UpdateJobContactState,
  formData: FormData,
): Promise<UpdateJobContactState> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Sign in to update contact details.", success: false };
  }

  const jobId = String(formData.get("job_id") ?? "").trim();
  if (!jobId) {
    return { error: "Invalid job.", success: false };
  }

  const { contactPhone, contactWhatsapp } = parseContactFields(formData);
  const contactError = validateContactFields(contactPhone, contactWhatsapp);
  if (contactError) {
    return { error: contactError, success: false };
  }

  const supabase = createAdminClient();
  const { data: job, error: fetchError } = await supabase
    .from("jobs")
    .select("id, clerk_user_id")
    .eq("id", jobId)
    .maybeSingle();

  if (fetchError || !job) {
    return { error: "Job not found.", success: false };
  }
  if (job.clerk_user_id !== userId) {
    return { error: "You can only edit your own listings.", success: false };
  }

  const { error: updateError } = await supabase
    .from("jobs")
    .update({
      contact_phone: contactPhone,
      contact_whatsapp: contactWhatsapp,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  if (updateError) {
    return { error: updateError.message, success: false };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/");
  return { error: null, success: true };
}

export async function deleteJob(
  _prev: DeleteJobState,
  formData: FormData,
): Promise<DeleteJobState> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Sign in to delete your listing." };
  }

  const jobId = String(formData.get("job_id") ?? "").trim();
  if (!jobId) {
    return { error: "Invalid job." };
  }

  const supabase = createAdminClient();
  const { data: job, error: fetchError } = await supabase
    .from("jobs")
    .select("id, clerk_user_id, title")
    .eq("id", jobId)
    .maybeSingle();

  if (fetchError || !job) {
    return { error: "Job not found." };
  }
  if (job.clerk_user_id !== userId) {
    return { error: "You can only delete your own listings." };
  }

  const { error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId);

  if (deleteError) {
    return { error: deleteError.message };
  }

  revalidatePath("/");
  redirect("/#jobs");
}
