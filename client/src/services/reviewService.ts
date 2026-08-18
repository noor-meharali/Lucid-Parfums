import { apiClient } from '@/api/client';
import type { ApiResponse, PaginatedResult } from '@/types/common';
import type { Review, ReviewListParams, ReviewStats } from '@/types/review';

export const reviewService = {
  list: (params: ReviewListParams) => {
    const search = new URLSearchParams();
    search.set('productId', params.productId);
    if (params.page) search.set('page', String(params.page));
    if (params.limit) search.set('limit', String(params.limit));

    return apiClient.get<ApiResponse<PaginatedResult<Review> & { stats: ReviewStats }>>(
      `/reviews?${search.toString()}`,
    );
  },
};
