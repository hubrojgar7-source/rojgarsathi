import { adminDeleteReview } from "@/lib/admin/actions";
import type { ReviewRow } from "@/lib/reviews/types";

import { AdminDeleteButton } from "./AdminDeleteButton";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminReviewsList({ reviews }: { reviews: ReviewRow[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>
        <p className="text-sm text-slate-500">{reviews.length} shown (newest first)</p>
      </div>
      <div className="divide-y divide-slate-100">
        {reviews.length === 0 ? (
          <p className="px-6 py-10 text-center text-slate-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{review.author_name}</p>
                  <span className="text-sm text-amber-500">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatDate(review.created_at)}
                  </span>
                </div>
                {review.author_role ? (
                  <p className="text-xs text-slate-500">{review.author_role}</p>
                ) : null}
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  &ldquo;{review.body}&rdquo;
                </p>
              </div>
              <AdminDeleteButton
                action={adminDeleteReview}
                idField="review_id"
                id={review.id}
                label="Delete"
                confirmMessage="Delete this review?"
              />
            </article>
          ))
        )}
      </div>
    </section>
  );
}
