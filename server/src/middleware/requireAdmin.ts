import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

/**
 * Guards write endpoints until real authentication exists.
 *
 * Deliberately fails closed: there is no session, token, or role
 * system yet, so no request — regardless of any header, body flag,
 * or frontend "admin mode" — can be trusted as coming from an admin.
 * Swap this for real JWT + role verification once customer/admin
 * authentication is built; every route using it today will start
 * working correctly with zero changes to the route definitions.
 */
export function requireAdmin(_req: Request, _res: Response, next: NextFunction): void {
  next(ApiError.forbidden('Admin authentication is not implemented yet. This endpoint is disabled until it is.'));
}
