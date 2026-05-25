import { AddReviewButton } from "@/components/reviews/AddReviewButton";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { DEMO_REVIEWS } from "@/lib/reviews/demo";
import { getPublishedReviews } from "@/lib/reviews/queries";

export async function ReviewsSection() {
  const userReviews = await getPublishedReviews(24);

  return (
    <section id="reviews" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          What do they say about us?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-slate-600">
          Feedback from job seekers and employers across Nepal. Tap Add review to
          share your own story.
        </p>

        <div className="mt-8 flex justify-center">
          <AddReviewButton />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} isDemo />
          ))}
          {userReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
