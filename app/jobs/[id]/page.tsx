import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { JobDetailView } from "@/components/jobs/JobDetailView";
import { getPublishedJobById } from "@/lib/jobs/queries";
import { isClerkConfigured } from "@/lib/supabase/env";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const job = await getPublishedJobById(id);
  if (!job) return { title: "Job — Rojgar Sathi" };
  return {
    title: `${job.title} — Rojgar Sathi`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getPublishedJobById(id);
  if (!job) notFound();

  let isOwner = false;
  if (isClerkConfigured()) {
    const { userId } = await auth();
    isOwner = Boolean(userId && userId === job.clerk_user_id);
  }

  return <JobDetailView job={job} isOwner={isOwner} />;
}
