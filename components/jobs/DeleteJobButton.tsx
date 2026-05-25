"use client";

import { useActionState } from "react";

import { deleteJob } from "@/lib/jobs/actions";
import type { DeleteJobState } from "@/lib/jobs/types";

const initial: DeleteJobState = { error: null };

type Props = {
  jobId: string;
  jobTitle: string;
};

export function DeleteJobButton({ jobId, jobTitle }: Props) {
  const [state, formAction, pending] = useActionState(deleteJob, initial);

  return (
    <section className="rounded-xl border border-red-200 bg-red-50/50 p-5">
      <h3 className="text-sm font-bold text-slate-900">Manage listing</h3>
      <p className="mt-1 text-xs text-slate-600">
        You posted this job. Remove it permanently if it is filled or no longer needed.
      </p>

      {state.error ? (
        <p className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      ) : null}

      <form action={formAction} className="mt-4">
        <input type="hidden" name="job_id" value={jobId} />
        <button
          type="submit"
          disabled={pending}
          onClick={(e) => {
            const ok = window.confirm(
              `Delete "${jobTitle}"?\n\nThis cannot be undone.`,
            );
            if (!ok) e.preventDefault();
          }}
          className="inline-flex w-full items-center justify-center rounded-lg border-2 border-red-600 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Deleting…" : "Delete this job"}
        </button>
      </form>
    </section>
  );
}
