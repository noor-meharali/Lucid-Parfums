import type { NextFunction, Request, Response } from 'express';
import { identifyUser } from './identifyUser';
import { ApiError } from '../utils/ApiError';

/**
 * Requires a valid, currently-active authenticated user. Populates
 * `req.user` on success. This replaces the Part 4/5 stub that
 * rejected every request — routes that used it (review submission)
 * now work correctly with zero changes to their own definitions.
 */
export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const user = await identifyUser(req);
  if (!user) {
    next(ApiError.unauthorized('Please sign in to continue.'));
    return;
  }
  req.user = user;
  next();
}
