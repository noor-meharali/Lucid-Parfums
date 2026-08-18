import type { ReviewDocument } from '../models/Review';
import type { PublicReview } from '../types/review';

export function serializeReview(review: ReviewDocument): PublicReview {
  return {
    id: review._id.toString(),
    productId: review.product.toString(),
    authorName: review.authorName,
    rating: review.rating,
    comment: review.comment,
    verifiedPurchase: review.verifiedPurchase,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  };
}
