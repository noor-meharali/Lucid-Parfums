import { Types } from 'mongoose';
import { Review } from '../models/Review';
import { Product } from '../models/Product';
import { serializeReview } from '../utils/serializeReview';
import { ApiError } from '../utils/ApiError';
import type { PublicReview, ReviewListQuery, ReviewStats } from '../types/review';
import type { PaginatedResult } from '../types/api';
import type { CreateReviewInput } from '../validators/review.validator';

const EMPTY_DISTRIBUTION: ReviewStats['distribution'] = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

async function computeStats(productId: string): Promise<ReviewStats> {
  const rows = await Review.aggregate<{ _id: number; count: number }>([
    { $match: { product: new Types.ObjectId(productId) } },
    { $group: { _id: '$rating', count: { $sum: 1 } } },
  ]);

  const distribution = { ...EMPTY_DISTRIBUTION };
  let total = 0;
  let weightedSum = 0;

  for (const row of rows) {
    const key = String(row._id) as keyof ReviewStats['distribution'];
    if (key in distribution) {
      distribution[key] = row.count;
      total += row.count;
      weightedSum += row._id * row.count;
    }
  }

  return {
    average: total > 0 ? Math.round((weightedSum / total) * 10) / 10 : 0,
    count: total,
    distribution,
  };
}

export const reviewService = {
  async list(query: ReviewListQuery): Promise<PaginatedResult<PublicReview> & { stats: ReviewStats }> {
    const skip = (query.page - 1) * query.limit;

    const [docs, total, stats] = await Promise.all([
      Review.find({ product: query.productId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(query.limit),
      Review.countDocuments({ product: query.productId }),
      computeStats(query.productId),
    ]);

    return {
      items: docs.map(serializeReview),
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / query.limit)),
      stats,
    };
  },

  /**
   * Structurally complete but unreachable in practice today: the
   * route this backs is behind `requireAuth`, which currently rejects
   * every request. Once auth exists, the controller will pass a real
   * `user` (from the session) and this enforces one review per user
   * per product, on top of the database's own partial unique index.
   */
  async create(input: CreateReviewInput, userId: string, authorName: string): Promise<PublicReview> {
    const product = await Product.findOne({ _id: input.productId, isActive: true });
    if (!product) throw ApiError.notFound('Product not found');

    const existing = await Review.findOne({ product: input.productId, user: userId });
    if (existing) throw ApiError.badRequest('You have already reviewed this product');

    const doc = await Review.create({
      product: input.productId,
      user: userId,
      authorName,
      rating: input.rating,
      comment: input.comment,
      // Real purchase verification requires the Order model from a
      // later part — never set true without checking it.
      verifiedPurchase: false,
    });

    return serializeReview(doc);
  },
};
