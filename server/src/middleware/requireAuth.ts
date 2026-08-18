import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

/**
 * Guards endpoints that require a signed-in customer. Deliberately
 * fails closed: there is no session/token system yet (Part 6), so no
 * request can be trusted as coming from an authenticated user —
 * regardless of any header or body field a client sends claiming
 * otherwise. Swap this for real session/JWT verification once
 * customer authentication exists; routes using it today will start
 * working correctly with zero changes to their definitions.
 */
export function requireAuth(_req: Request, _res: Response, next: NextFunction): void {
  next(ApiError.unauthorized('Sign-in is not implemented yet. This action will be available once it is.'));
}
