import type { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';

/**
 * Pino-based Request Logging Middleware.
 * Logs incoming HTTP requests and response metrics on request completion (finish event).
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();

  // Log incoming request
  logger.info({
    msg: 'Incoming request',
    method: req.method,
    url: req.originalUrl || req.url,
    requestId: req.id,
  });

  // Log completed request metrics when the connection completes
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logger.info({
      msg: 'Request processed',
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      responseTimeMs: responseTime,
      requestId: req.id,
    });
  });

  next();
}
