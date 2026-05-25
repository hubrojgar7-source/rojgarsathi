import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { AuthConfigFallback } from "@/components/auth/AuthConfigFallback";
import { Header } from "@/components/jobmatrix/Header";
import { SiteFooter } from "@/components/jobmatrix/SiteFooter";
import { TopBanner } from "@/components/TopBanner";
import { isClerkConfigured } from "@/lib/supabase/env";
import { PostJobForm } from "./post-job-form";

export const metadata = {
  title: "Post a job — Rojgar Sathi",
  description: "Publish a new job listing for job seekers.",
};

export default async function PostJobPage() {
  if (!isClerkConfigured()) {
    return (
      <AuthConfigFallback
        title="Post a job unavailable"
        description="Sign-in and job posting require Clerk keys in your deployment environment. Configure them in Vercel, then redeploy."
      />
    );
  }

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/post-job");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7fb]">
      <TopBanner />
      <Header />

      <main className="flex-1">
        <div className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Post a job
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Create a full listing with location, skills, and contact details so
              job seekers get a complete, easy-to-read listing.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <PostJobForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
