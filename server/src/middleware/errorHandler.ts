import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';
import { isProduction } from '../config/env';
import type { ApiErrorResponse } from '../types/api';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // Express requires 4 parameters to recognize error-handling middleware.
  _next: NextFunction,
): void {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;

  const message =
    isApiError || !isProduction
      ? (err as Error).message
      : 'Something went wrong. Please try again later.';

  if (!isApiError || statusCode >= 500) {
    logger.error((err as Error).stack ?? String(err));
  }

  const body: ApiErrorResponse = { success: false, message };
  res.status(statusCode).json(body);
}
