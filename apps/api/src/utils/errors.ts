/**
 * Base Application Error class.
 * All custom application errors should inherit from this.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode: string;
  public readonly details: unknown;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    details: unknown = null,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 400 Bad Request Error
 */
export class BadRequestError extends AppError {
  constructor(
    message: string = 'Bad Request',
    errorCode: string = 'BAD_REQUEST',
    details: unknown = null,
  ) {
    super(message, 400, errorCode, true, details);
  }
}

/**
 * 401 Unauthorized Error
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', errorCode: string = 'UNAUTHORIZED') {
    super(message, 401, errorCode, true, null);
  }
}

/**
 * 403 Forbidden Error
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', errorCode: string = 'FORBIDDEN') {
    super(message, 403, errorCode, true, null);
  }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource Not Found', errorCode: string = 'NOT_FOUND') {
    super(message, 404, errorCode, true, null);
  }
}

/**
 * 409 Conflict Error
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resource Conflict', errorCode: string = 'CONFLICT') {
    super(message, 409, errorCode, true, null);
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends AppError {
  constructor(
    message: string = 'Internal Server Error',
    errorCode: string = 'INTERNAL_SERVER_ERROR',
  ) {
    super(message, 500, errorCode, false, null);
  }
}

/**
 * 429 Too Many Requests Error
 */
export class TooManyRequestsError extends AppError {
  constructor(message: string = 'Too many requests', errorCode: string = 'RATE_LIMIT_EXCEEDED') {
    super(message, 429, errorCode, true, null);
  }
}
