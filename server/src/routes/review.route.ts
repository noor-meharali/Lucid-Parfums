import { Router } from 'express';
import { listReviews, createReview } from '../controllers/review.controller';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/requireAuth';
import { reviewListQuerySchema, createReviewSchema } from '../validators/review.validator';

const router = Router();

router.get('/', validate(reviewListQuerySchema, 'query'), listReviews);

// requireAuth currently rejects every request — see middleware/requireAuth.ts.
router.post('/', requireAuth, validate(createReviewSchema), createReview);

export default router;
