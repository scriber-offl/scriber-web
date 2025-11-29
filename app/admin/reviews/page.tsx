import { getAllReviews } from "@/actions/portfolio";
import { ReviewsList } from "@/components/admin/reviews-list";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

async function ReviewsData() {
  await connection();
  const reviews = await getAllReviews();
  return <ReviewsList reviews={reviews} />;
}

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
        <p className="text-muted-foreground">Manage your reviews here.</p>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        }
      >
        <ReviewsData />
      </Suspense>
    </div>
  );
}
