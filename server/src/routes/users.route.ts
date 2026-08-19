import { Router } from 'express';
import { getProfile, updateProfile, changePassword } from '../controllers/users.controller';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/requireAuth';
import { authRateLimiter } from '../middleware/rateLimit';
import { updateProfileSchema, changePasswordSchema } from '../validators/auth.validator';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.put('/me', requireAuth, validate(updateProfileSchema), updateProfile);
router.post('/me/password', requireAuth, authRateLimiter, validate(changePasswordSchema), changePassword);

export default router;
