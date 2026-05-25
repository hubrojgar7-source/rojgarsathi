import { AdminReviewsList } from "@/components/admin/AdminReviewsList";
import { getAdminReviews } from "@/lib/admin/queries";

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Reviews</h1>
        <p className="mt-1 text-slate-600">Moderate homepage reviews.</p>
      </div>
      <AdminReviewsList reviews={reviews} />
    </div>
  );
}
