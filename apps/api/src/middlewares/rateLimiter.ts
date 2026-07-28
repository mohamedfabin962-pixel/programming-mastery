import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';
import { TooManyRequestsError } from '../utils/errors.js';

/**
 * Reusable Global Rate Limiting Middleware.
 * Applies a rate limit configuration to safeguard the entire API surface.
 */
export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: 'draft-7', // Enables RateLimit-* headers
  legacyHeaders: false, // Disables X-RateLimit-* headers
  handler: (req, res, next, options) => {
    const resetTime = req.rateLimit?.resetTime;
    const retryAfter = resetTime
      ? Math.ceil((resetTime.getTime() - Date.now()) / 1000)
      : Math.ceil(options.windowMs / 1000);

    res.setHeader('Retry-After', String(retryAfter > 0 ? retryAfter : 1));
    next(new TooManyRequestsError('Too many requests', 'RATE_LIMIT_EXCEEDED'));
  },
});

/**
 * Reusable Authentication Endpoint Rate Limiter Middleware.
 * Stricter rate limits specifically for sign-up, sign-in, etc.
 */
export const authLimiter = rateLimit({
  windowMs: env.AUTH_RATE_LIMIT_WINDOW_MS,
  max: env.AUTH_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    const resetTime = req.rateLimit?.resetTime;
    const retryAfter = resetTime
      ? Math.ceil((resetTime.getTime() - Date.now()) / 1000)
      : Math.ceil(options.windowMs / 1000);

    res.setHeader('Retry-After', String(retryAfter > 0 ? retryAfter : 1));
    next(new TooManyRequestsError('Too many requests', 'RATE_LIMIT_EXCEEDED'));
  },
});
