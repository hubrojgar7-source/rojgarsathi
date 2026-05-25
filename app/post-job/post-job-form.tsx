"use client";

import { useActionState } from "react";

import {
  inputClass,
  labelClass,
  sectionClass,
  sectionDescClass,
  sectionTitleClass,
} from "@/components/jobs/form-styles";
import { createJob } from "@/lib/jobs/actions";
import { JOB_CATEGORIES } from "@/lib/jobs/categories";
import type { CreateJobState } from "@/lib/jobs/types";

const initial: CreateJobState = { error: null };

export function PostJobForm() {
  const [state, formAction, pending] = useActionState(createJob, initial);

  return (
    <form action={formAction} className="space-y-8">
      {state.error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Job details</h2>
        <p className={sectionDescClass}>
          Title, category, where the role is based, and employment type.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="category_id" className={labelClass}>
              Job category <span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              name="category_id"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-slate-500">
              Shown under Popular Job Categories on the home page.
            </p>
          </div>

          <div>
            <label htmlFor="title" className={labelClass}>
              Job title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              maxLength={200}
              placeholder="e.g. Waiter, Driver, Office Assistant"
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label htmlFor="location" className={labelClass}>
                Job location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                required
                maxLength={200}
                placeholder="e.g. Kathmandu, Nepal or Remote"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="job_type" className={labelClass}>
                Job type
              </label>
              <select
                id="job_type"
                name="job_type"
                defaultValue="full-time"
                className={inputClass}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              id="is_remote"
              name="is_remote"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_remote" className="text-sm font-medium text-slate-800">
              Remote-friendly (hybrid or fully remote)
            </label>
          </div>

          <div>
            <label htmlFor="salary_text" className={labelClass}>
              Salary / compensation (optional)
            </label>
            <input
              id="salary_text"
              name="salary_text"
              maxLength={120}
              placeholder="e.g. NPR 80k–120k / Negotiable"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Role & skills</h2>
        <p className={sectionDescClass}>
          Describe the position and what skills candidates should have.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="skills" className={labelClass}>
              Skills needed <span className="text-red-500">*</span>
            </label>
            <input
              id="skills"
              name="skills"
              required
              maxLength={500}
              placeholder="e.g. React, Communication, Excel (comma-separated)"
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Separate skills with commas. They appear as tags on the job page.
            </p>
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Job description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={12}
              maxLength={20000}
              placeholder="Responsibilities, requirements, benefits, how to apply…"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/80 p-6 shadow-sm sm:p-8">
        <h2 className={sectionTitleClass}>Contact details</h2>
        <p className={sectionDescClass}>
          Phone and WhatsApp so applicants can reach you. At least one is required.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact_phone" className={labelClass}>
              Phone number
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="tel"
              maxLength={30}
              placeholder="+977 98XXXXXXXX"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact_whatsapp" className={labelClass}>
              WhatsApp
            </label>
            <input
              id="contact_whatsapp"
              name="contact_whatsapp"
              type="text"
              maxLength={120}
              placeholder="+977 98XXXXXXXX"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Your listing goes live immediately after publishing.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Publishing…" : "Publish job"}
        </button>
      </div>
    </form>
  );
}
