import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

/**
 * Middleware that assigns a unique UUID to every incoming HTTP request.
 * Resolves request ID from X-Request-ID header if present, otherwise generates a new one.
 * Attaches the ID to req.id and sets X-Request-ID in the response headers.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const reqId = (req.headers['x-request-id'] as string) || randomUUID();
  req.id = reqId;
  res.setHeader('x-request-id', reqId);
  next();
}
