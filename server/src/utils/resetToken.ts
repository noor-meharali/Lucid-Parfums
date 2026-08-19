import { randomBytes, createHash } from 'crypto';

export interface ResetTokenPair {
  /** Sent to the user once — never stored. */
  rawToken: string;
  /** What actually gets persisted, so a database leak alone can't be used to reset a password. */
  tokenHash: string;
}

export function generateResetToken(): ResetTokenPair {
  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  return { rawToken, tokenHash };
}

export function hashResetToken(rawToken: string): string {
  return createHash('sha256').update(rawToken).digest('hex');
}
