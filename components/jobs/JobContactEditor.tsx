"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { updateJobContact } from "@/lib/jobs/actions";
import type { UpdateJobContactState } from "@/lib/jobs/types";

const initial: UpdateJobContactState = { error: null, success: false };

type Props = {
  jobId: string;
  defaultPhone: string;
  defaultWhatsapp: string;
};

export function JobContactEditor({
  jobId,
  defaultPhone,
  defaultWhatsapp,
}: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    updateJobContact,
    initial,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="job_id" value={jobId} />

      {state.error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Contact saved. Applicants can see it above.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`contact_phone_${jobId}`}
            className="block text-xs font-semibold text-slate-700"
          >
            Phone number
          </label>
          <input
            id={`contact_phone_${jobId}`}
            name="contact_phone"
            type="tel"
            defaultValue={defaultPhone}
            maxLength={30}
            placeholder="+977 98XXXXXXXX"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label
            htmlFor={`contact_whatsapp_${jobId}`}
            className="block text-xs font-semibold text-slate-700"
          >
            WhatsApp
          </label>
          <input
            id={`contact_whatsapp_${jobId}`}
            name="contact_whatsapp"
            type="text"
            defaultValue={defaultWhatsapp}
            maxLength={120}
            placeholder="+977 98XXXXXXXX"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save contact"}
      </button>
    </form>
  );
}
