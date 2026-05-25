"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import type { CreateReviewState } from "./types";

function displayNameFromUser(user: NonNullable<Awaited<ReturnType<typeof currentUser>>>) {
  const parts = [user.firstName, user.lastName].filter(Boolean);
  if (parts.length) return parts.join(" ");
  if (user.username) return user.username;
  return "Member";
}

export async function createReview(
  _prev: CreateReviewState,
  formData: FormData,
): Promise<CreateReviewState> {
  const ratingRaw = Number(formData.get("rating"));
  const rating = Number.isFinite(ratingRaw) ? Math.round(ratingRaw) : 0;
  const body = String(formData.get("body") ?? "").trim();
  let authorName = String(formData.get("author_name") ?? "").trim();
  const authorRole = String(formData.get("author_role") ?? "").trim() || null;

  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  if (user) {
    authorName = displayNameFromUser(user);
  }

  if (!authorName || authorName.length < 2) {
    return { error: "Please enter your name (at least 2 characters)." };
  }
  if (authorName.length > 80) {
    return { error: "Name is too long (max 80 characters)." };
  }
  if (rating < 1 || rating > 5) {
    return { error: "Please choose a rating from 1 to 5 stars." };
  }
  if (body.length < 10) {
    return { error: "Review must be at least 10 characters." };
  }
  if (body.length > 2000) {
    return { error: "Review is too long (max 2000 characters)." };
  }
  if (authorRole && authorRole.length > 120) {
    return { error: "Role/company line is too long (max 120 characters)." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("reviews").insert({
    clerk_user_id: userId ?? null,
    author_name: authorName,
    author_role: authorRole,
    rating,
    body,
  });

  if (error) {
    console.error("[createReview]", error.message);
    return { error: "Could not save your review. Please try again." };
  }

  revalidatePath("/");
  return { success: true };
}
