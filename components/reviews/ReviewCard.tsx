import { IconStar } from "@/components/jobmatrix/icons";
import type { ReviewRow } from "@/lib/reviews/types";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }
  return (name.trim()[0] ?? "?").toUpperCase();
}

type Props = {
  review: ReviewRow;
  isDemo?: boolean;
};

export function ReviewCard({ review, isDemo }: Props) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div
          className="flex gap-0.5 text-amber-400"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar
              key={i}
              className={`h-5 w-5 ${i < review.rating ? "" : "opacity-25"}`}
            />
          ))}
        </div>
        {isDemo ? (
          <span className="shrink-0 rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Sample
          </span>
        ) : null}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200/80 pt-4">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-500 text-xs font-bold text-white">
          {initials(review.author_name)}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">{review.author_name}</p>
          {review.author_role ? (
            <p className="text-xs text-slate-500">{review.author_role}</p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
