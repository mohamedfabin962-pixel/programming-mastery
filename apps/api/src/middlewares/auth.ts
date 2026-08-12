import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import { UnauthorizedError } from '../utils/errors.js';

/**
 * Express middleware to require a valid session from Better Auth.
 * Automatically validates the session using standard Node headers and passes control.
 * Rejects with a standard 401 UnauthorizedError if no valid session is present.
 */
export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(new UnauthorizedError('Unauthorized'));
    }

    // Attach user and session context securely
    req.user = session.user;
    req.session = session.session;

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Express middleware to optionally extract session and attach req.user if a valid session is present.
 * Does not reject requests if no session is present.
 */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session) {
      req.user = session.user;
      req.session = session.session;
    }
    next();
  } catch (_error) {
    next();
  }
}
