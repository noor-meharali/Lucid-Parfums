import { useEffect, useState } from 'react';
import { reviewService } from '@/services/reviewService';
import type { Review, ReviewStats } from '@/types/review';
import type { PaginatedResult } from '@/types/common';

interface UseReviewsResult {
  reviews: Review[];
  stats: ReviewStats | null;
  pagination: Omit<PaginatedResult<Review>, 'items'> | null;
  isLoading: boolean;
  error: string | null;
}

export function useReviews(productId: string | undefined, page = 1): UseReviewsResult {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [pagination, setPagination] = useState<UseReviewsResult['pagination']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError(null);

    reviewService
      .list({ productId, page })
      .then((response) => {
        if (ignore) return;
        const { items, stats: reviewStats, ...meta } = response.data;
        setReviews(items);
        setStats(reviewStats);
        setPagination(meta);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setError(err instanceof Error ? err.message : 'Could not load reviews.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [productId, page]);

  return { reviews, stats, pagination, isLoading, error };
}
