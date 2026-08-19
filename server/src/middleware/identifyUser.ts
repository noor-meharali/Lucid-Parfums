import type { Request } from 'express';
import { User } from '../models/User';
import { verifyAuthToken } from '../utils/jwt';
import { serializeUser } from '../utils/serializeUser';
import { env } from '../config/env';
import type { SafeUser } from '../types/user';

/**
 * Resolves the authenticated user (if any) for a request, always by
 * re-reading the database — never by trusting the JWT payload beyond
 * the user id it carries. This means a disabled account or a role
 * change takes effect on the very next request, not only once an
 * old token expires. Never throws; returns null for any failure
 * (missing/invalid/expired token, deleted or disabled user).
 */
export async function identifyUser(req: Request): Promise<SafeUser | null> {
  const token: unknown = req.cookies?.[env.cookieName];
  if (typeof token !== 'string' || !token) return null;

  const userId = verifyAuthToken(token);
  if (!userId) return null;

  const user = await User.findById(userId);
  if (!user || !user.isActive) return null;

  return serializeUser(user);
}
