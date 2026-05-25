"use client";

import { useActionState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { createReview } from "@/lib/reviews/actions";
import type { CreateReviewState } from "@/lib/reviews/types";

const initial: CreateReviewState = {};

type Props = {
  onSuccess?: () => void;
  inModal?: boolean;
};

export function ReviewForm({ onSuccess, inModal = false }: Props) {
  const { isSignedIn } = useUser();
  const [state, action, pending] = useActionState(createReview, initial);

  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  if (state.success && !onSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
        Thank you! Your review has been published.
      </div>
    );
  }

  if (state.success && onSuccess) {
    return (
      <p className="text-center text-sm font-medium text-emerald-700">
        Thank you! Your review has been published.
      </p>
    );
  }

  return (
    <form action={action} className={inModal ? "" : "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"}>
      {!inModal ? (
        <>
          <h3 className="text-lg font-semibold text-slate-900">Share your experience</h3>
          <p className="mt-1 text-sm text-slate-600">
            Anyone can leave a review. Signed-in users use their account name.
          </p>
        </>
      ) : (
        <p className="mb-4 text-sm text-slate-600">
          Share your experience with Rojgar Sathi. Signed-in users use their account name.
        </p>
      )}

      {state.error ? (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="space-y-4">
        {!isSignedIn ? (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Your name</span>
            <input
              type="text"
              name="author_name"
              required
              minLength={2}
              maxLength={80}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Full name"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Role or company <span className="font-normal text-slate-400">(optional)</span>
          </span>
          <input
            type="text"
            name="author_role"
            maxLength={120}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="e.g. Accountant · Biratnagar"
          />
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-slate-700">Rating</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <label
                key={n}
                className="cursor-pointer has-[:checked]:ring-2 has-[:checked]:ring-amber-400"
              >
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  required
                  className="peer sr-only"
                  defaultChecked={n === 5}
                />
                <span className="inline-flex rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:text-amber-800">
                  {n} ★
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Your review</span>
          <textarea
            name="body"
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            className="mt-1 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Tell others how Rojgar Sathi helped you..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
