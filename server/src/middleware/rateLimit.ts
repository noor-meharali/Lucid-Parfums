import rateLimit from 'express-rate-limit';

/**
 * Applied to auth endpoints that are attractive to brute-force/abuse
 * (login, registration, password reset/change). Limits are generous
 * enough that a normal person mistyping their password a few times
 * never gets blocked, while still bounding automated attempts.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again in a few minutes.' },
});
