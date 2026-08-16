/**
 * Represents a known, operational error (bad request, not found, etc.)
 * as opposed to an unexpected programming error. Controllers and
 * services throw this so the centralized error handler can respond
 * with the correct status code and a safe message.
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  /** Field-level validation messages, when this error came from request validation. */
  errors?: Record<string, string[]>;

  constructor(statusCode: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad request', errors?: Record<string, string[]>) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message);
  }
}
