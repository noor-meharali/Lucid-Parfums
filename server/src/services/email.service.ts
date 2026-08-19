import { logger } from '../utils/logger';
import { isProduction } from '../config/env';

/**
 * No real email provider is configured yet. This service defines the
 * interface the rest of the app calls — swap the body of each method
 * for a real provider (SES, Postmark, Resend, etc.) later; nothing
 * else in the codebase needs to change.
 *
 * In development, since there's no way to actually deliver the email,
 * the reset link is logged to the server's own console so the flow
 * is testable locally. This is explicitly gated to non-production —
 * it must never run where a shared/production log stream could pick
 * it up. It also never appears in the API response.
 */
export const emailService = {
  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
    if (isProduction) {
      logger.warn(`sendPasswordResetEmail called with no email provider configured (recipient: ${email}).`);
      return;
    }
    logger.info(`[DEV ONLY] Password reset link for ${email}: ${resetUrl}`);
  },
};
