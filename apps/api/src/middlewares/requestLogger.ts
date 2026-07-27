import morgan from 'morgan';
import type { Request, Response, RequestHandler } from 'express';
import { env } from '../config/env.js';

/**
 * Structured Request Logger Middleware.
 * Logs incoming HTTP requests. Outputs clean JSON logs in production, and readable colored logs in development.
 */
export const requestLogger: RequestHandler =
  env.NODE_ENV === 'production'
    ? morgan((tokens, req: Request, res: Response): string => {
        return JSON.stringify({
          timestamp: new Date().toISOString(),
          method: tokens.method?.(req, res),
          url: tokens.url?.(req, res),
          status: Number(tokens.status?.(req, res)) || undefined,
          contentLength: tokens.res?.(req, res, 'content-length'),
          responseTimeMs: Number(tokens['response-time']?.(req, res)) || undefined,
          ip: req.ip || req.socket.remoteAddress,
          userAgent: tokens['user-agent']?.(req, res),
        });
      })
    : morgan('dev');
