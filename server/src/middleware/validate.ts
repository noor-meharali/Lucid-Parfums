import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError';

type RequestPart = 'body' | 'query' | 'params';

/**
 * Parses `req[part]` against a zod schema, replacing it with the
 * parsed (and coerced/defaulted) value on success, or forwarding a
 * 400 with field-level messages on failure. Keeps controllers free
 * of manual validation logic.
 */
export function validate(schema: ZodType, part: RequestPart = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const errors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join('.') || part;
        errors[key] = [...(errors[key] ?? []), issue.message];
      }
      next(ApiError.badRequest('Validation failed', errors));
      return;
    }

    // Query/params objects are read-only getters on the Request in
    // recent Express types; body is always safe to reassign.
    if (part === 'body') {
      req.body = result.data;
    } else {
      Object.assign(req[part], result.data);
    }
    next();
  };
}
