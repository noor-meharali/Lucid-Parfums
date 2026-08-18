import { z } from 'zod';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants/product';

const mongoIdSchema = z
  .string()
  .trim()
  .regex(/^[a-f0-9]{24}$/i, 'must be a valid product id');

export const reviewListQuerySchema = z.object({
  productId: mongoIdSchema,
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
});

// Deliberately does NOT accept user, order, or verifiedPurchase —
// those are never trusted from the client. Once auth exists, the
// route handler derives `user` from the session and looks up
// `verifiedPurchase` from real order history itself.
export const createReviewSchema = z.object({
  productId: mongoIdSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(1).max(1000),
});

export type ReviewListQueryInput = z.infer<typeof reviewListQuerySchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
