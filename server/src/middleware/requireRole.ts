import type { NextFunction, Request, Response } from 'express';
import { identifyUser } from './identifyUser';
import { ApiError } from '../utils/ApiError';
import type { Role } from '../constants/auth';

/**
 * Requires a valid, currently-active authenticated user whose
 * *current* database role is one of `roles` — never a role claimed
 * by the client. Populates `req.user` on success.
 */
export function requireRole(...roles: Role[]) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const user = await identifyUser(req);
    if (!user) {
      next(ApiError.unauthorized('Please sign in to continue.'));
      return;
    }
    if (!roles.includes(user.role)) {
      next(ApiError.forbidden('You do not have permission to do that.'));
      return;
    }
    req.user = user;
    next();
  };
}
