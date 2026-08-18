import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { RatingDistribution } from '@/components/product/RatingDistribution';
import { ReviewCard } from '@/components/product/ReviewCard';
import { Pagination } from '@/components/product/Pagination';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/Skeleton';
import { Button } from '@/components/common/Button';
import { useReviews } from '@/hooks/useReviews';

interface ReviewsSectionProps {
  productId: string;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [page, setPage] = useState(1);
  const { reviews, stats, pagination, isLoading, error } = useReviews(productId, page);

  return (
    <section id="reviews" className="scroll-mt-24">
      <h2 className="font-serif text-heading-lg text-espresso">Reviews</h2>
      <span className="mt-3 mb-6 block h-px w-16 bg-gold" aria-hidden="true" />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-24 w-full max-w-md" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : error ? (
        <ErrorState variant="server" description={error} />
      ) : (
        <div className="flex flex-col gap-8">
          {stats && stats.count > 0 && <RatingDistribution stats={stats} />}

          <div className="rounded-md border border-beige bg-cream p-5">
            <p className="text-body-sm text-taupe">
              Reviews can only be left by signed-in customers who purchased this product.
            </p>
            <Button variant="outline" size="sm" disabled className="mt-3">
              Sign in to write a review
            </Button>
          </div>

          {reviews.length === 0 ? (
            <EmptyState
              icon={<MessageSquare className="h-8 w-8" />}
              title="No reviews yet"
              description="Be the first to share your thoughts once you're signed in."
            />
          ) : (
            <>
              <div className="flex flex-col">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              {pagination && (
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
