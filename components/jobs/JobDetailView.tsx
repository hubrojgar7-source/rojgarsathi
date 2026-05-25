import Link from "next/link";
import type { ReactNode } from "react";

import { Header } from "@/components/jobmatrix/Header";
import { SiteFooter } from "@/components/jobmatrix/SiteFooter";
import { TopBanner } from "@/components/TopBanner";
import { DeleteJobButton } from "@/components/jobs/DeleteJobButton";
import { JobContactSection } from "@/components/jobs/JobContactSection";
import { JobSaveButton } from "@/components/jobs/JobSaveButton";
import { RelatedJobs } from "@/components/jobs/RelatedJobs";
import { SkillTags } from "@/components/jobs/SkillTags";
import { phoneHref, whatsappHref } from "@/lib/jobs/contact";
import type { JobRow } from "@/lib/jobs/types";
import { parseSkills } from "@/lib/jobs/skills";

type Props = {
  job: JobRow;
  isOwner: boolean;
};

function companyInitial(name: string) {
  const t = name.trim();
  if (!t) return "?";
  return t[0]?.toUpperCase() ?? "?";
}

function formatJobType(jobType: string) {
  return jobType.replace(/-/g, " ");
}

function postedLabel(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  return `Posted ${days} days ago`;
}

export function JobDetailView({ job, isOwner }: Props) {
  const skillList = parseSkills(job.skills);
  const phone = job.contact_phone?.trim() ?? "";
  const whatsapp = job.contact_whatsapp?.trim() ?? "";
  const tel = phone ? phoneHref(phone) : "";
  const wa = whatsapp ? whatsappHref(whatsapp) : "";
  const applyHref = wa || tel || "#employer-contact";

  const initial = companyInitial(job.company_name || job.title);
  const brandPalette = [
    "bg-sky-600",
    "bg-violet-600",
    "bg-indigo-600",
    "bg-emerald-600",
    "bg-slate-700",
  ];
  const brand = brandPalette[initial.charCodeAt(0) % brandPalette.length];

  const summaryStats = [
    {
      label: "Job type",
      value: formatJobType(job.job_type),
      icon: "briefcase",
    },
    {
      label: "Location",
      value: job.location || "Not specified",
      icon: "location",
    },
    {
      label: "Work mode",
      value: job.is_remote ? "Remote-friendly" : "On-site / hybrid",
      icon: "globe",
    },
    {
      label: "Posted",
      value: postedLabel(job.created_at),
      icon: "calendar",
    },
    {
      label: "Category",
      value: skillList[0] || formatJobType(job.job_type),
      icon: "tag",
    },
    {
      label: "Company",
      value: job.company_name || "Not listed",
      icon: "building",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7fb] text-slate-900">
      <TopBanner />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-slate-500 sm:px-6 lg:px-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#jobs" className="hover:text-blue-600">
              Jobs
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-800 line-clamp-1">
              {job.title}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Hero job card */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 flex-1 gap-5">
                <span
                  className={`grid h-20 w-20 shrink-0 place-items-center rounded-xl text-2xl font-bold text-white shadow-lg ${brand}`}
                >
                  {initial}
                </span>
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {job.title}
                  </h1>
                  <p className="mt-1 text-lg font-semibold text-blue-700">
                    {job.company_name || "Employer"}
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
                    <DetailRow icon="location" label="Location">
                      {job.location || "Not specified"}
                      {job.is_remote ? " · Remote-friendly" : ""}
                    </DetailRow>
                    <DetailRow icon="tag" label="Category">
                      {skillList[0] || formatJobType(job.job_type)}
                    </DetailRow>
                    <DetailRow icon="calendar" label="Listed">
                      {postedLabel(job.created_at)}
                    </DetailRow>
                    {job.poster_display_name ? (
                      <DetailRow icon="user" label="Posted by">
                        {job.poster_display_name}
                      </DetailRow>
                    ) : null}
                  </ul>
                </div>
              </div>

              <div className="w-full shrink-0 lg:w-72">
                {job.salary_text ? (
                  <p className="text-lg font-bold text-slate-900 sm:text-xl">
                    {job.salary_text}
                  </p>
                ) : (
                  <p className="text-lg font-bold text-slate-500">Salary negotiable</p>
                )}
                <p className="mt-1 text-sm text-slate-500">Compensation</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={applyHref}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
                  >
                    Apply now
                  </a>
                  <JobSaveButton jobId={job.id} />
                </div>
              </div>
            </div>
          </article>

          {/* Summary grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {summaryStats.map((stat) => (
              <SummaryBox key={stat.label} {...stat} />
            ))}
          </div>

          {/* Skills */}
          {skillList.length > 0 ? (
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-slate-900">Required skills</h2>
              <div className="mt-4">
                <SkillTags skills={job.skills} />
              </div>
            </section>
          ) : null}

          {/* Two columns */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <ContentCard title="Job description">
                <p className="whitespace-pre-wrap leading-relaxed text-slate-700">
                  {job.description}
                </p>
              </ContentCard>

              {job.company_description?.trim() ? (
                <ContentCard title="About company">
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-700">
                    {job.company_description}
                  </p>
                </ContentCard>
              ) : null}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <a
                  href={applyHref}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Apply now
                </a>
                <div className="mt-3">
                  <JobSaveButton jobId={job.id} />
                </div>
                <p className="mt-4 text-center text-xs text-slate-500">
                  Copy the page URL from your browser to share this job.
                </p>
              </div>

              <div id="employer-contact">
                <JobContactSection
                  id={job.id}
                  contact_phone={job.contact_phone}
                  contact_whatsapp={job.contact_whatsapp}
                  isOwner={isOwner}
                />
              </div>

              {isOwner ? (
                <DeleteJobButton jobId={job.id} jobTitle={job.title} />
              ) : null}

              <RelatedJobs currentJobId={job.id} />

              {job.company_name ? (
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">More from employer</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {job.company_name} is hiring on Rojgar Sathi.
                  </p>
                  <Link
                    href="/#jobs"
                    className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Browse all jobs →
                  </Link>
                </section>
              ) : null}
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function ContentCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
        {title}
      </h2>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function DetailRow({
  label,
  children,
}: {
  icon?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-2">
      <span className="mt-0.5 text-blue-600" aria-hidden>
        •
      </span>
      <span>
        <span className="font-semibold text-slate-800">{label}: </span>
        {children}
      </span>
    </li>
  );
}

function SummaryBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/80 px-3 py-4 text-center sm:px-4">
      <SummaryIcon name={icon} />
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
        {label}
      </p>
      <p className="mt-1 text-xs font-bold leading-snug text-slate-900 sm:text-sm line-clamp-2">
        {value}
      </p>
    </div>
  );
}

function SummaryIcon({ name }: { name: string }) {
  const className = "mx-auto h-6 w-6 text-blue-600";
  if (name === "location")
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      </svg>
    );
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
