import { ApiError } from './ApiError';

/**
 * Express types route params as `string | string[]` to account for
 * repeated segments, which none of our routes use. This narrows to a
 * single string or fails clearly instead of silently mishandling an
 * array.
 */
export function getStringParam(value: string | string[] | undefined, name: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw ApiError.badRequest(`A valid ${name} is required`);
  }
  return value;
}
