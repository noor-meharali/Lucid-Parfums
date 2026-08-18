import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { reviewService } from '../services/review.service';
import type { ApiSuccessResponse, PaginatedResult } from '../types/api';
import type { PublicReview, ReviewStats } from '../types/review';
import type { ReviewListQueryInput } from '../validators/review.validator';

export const listReviews = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ReviewListQueryInput;
  const result = await reviewService.list(query);
  const body: ApiSuccessResponse<PaginatedResult<PublicReview> & { stats: ReviewStats }> = {
    success: true,
    data: result,
  };
  res.status(200).json(body);
});

// Unreachable today — requireAuth rejects every request before this
// runs. Kept fully implemented so it activates with zero changes
// once Part 6 provides a real authenticated user on `req`.
export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await reviewService.create(req.body, 'unknown-user', 'Anonymous');
  const body: ApiSuccessResponse<PublicReview> = { success: true, message: 'Review submitted', data: review };
  res.status(201).json(body);
});
