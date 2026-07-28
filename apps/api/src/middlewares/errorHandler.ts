import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import { env } from '../config/env.js';
import { logger } from '../lib/logger.js';

/**
 * Express error-handling middleware.
 * Formats errors consistently and prevents leaking sensitive information in production.
 */
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  // If headers have already been sent, delegate to default Express handler
  if (res.headersSent) {
    return;
  }

  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';
  let details: unknown = null;
  let stack: string | undefined = undefined;

  if (err instanceof AppError) {
    const appErr = err as AppError;
    statusCode = appErr.statusCode;
    errorCode = appErr.errorCode;
    message = appErr.message;
    details = appErr.details;
    if (env.NODE_ENV !== 'production') {
      stack = appErr.stack;
    }
  } else if (err instanceof Error) {
    const stdErr = err as Error;
    // If it's a native JS/Node error but not an AppError
    if (env.NODE_ENV !== 'production') {
      statusCode = 500;
      message = stdErr.message;
      stack = stdErr.stack;
    }
  } else {
    // Unknown error type
    if (env.NODE_ENV !== 'production') {
      message = String(err);
    }
  }

  // Log errors using centralized pino logger
  if (statusCode >= 500) {
    logger.error({
      msg: 'Unexpected server error',
      error: err instanceof Error ? { message: err.message, stack: err.stack } : err,
      requestId: req.id,
      statusCode,
      errorCode,
    });
  } else {
    logger.warn({
      msg: `Client error: ${message}`,
      requestId: req.id,
      statusCode,
      errorCode,
      details,
    });
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: errorCode,
      status: statusCode,
      ...(details ? { details } : {}),
      ...(stack ? { stack } : {}),
    },
  });
}
