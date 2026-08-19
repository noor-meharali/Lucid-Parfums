import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface AuthTokenPayload {
  sub: string;
}

/**
 * The token carries only the user id — role and account status are
 * always re-read from the database on every request (see
 * middleware/requireAuth.ts), never trusted from the token payload.
 * That way revoking a role or disabling an account takes effect
 * immediately, not only after the token expires.
 */
export function signAuthToken(userId: string): string {
  return jwt.sign({ sub: userId } satisfies AuthTokenPayload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

export function verifyAuthToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
    return decoded.sub;
  } catch {
    return null;
  }
}
