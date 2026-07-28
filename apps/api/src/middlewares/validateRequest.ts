import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { BadRequestError } from '../utils/errors.js';

export interface RequestValidationSchema {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  headers?: z.ZodTypeAny;
}

/**
 * Centrally validates incoming Express request parameters using Zod schemas.
 * Overwrites req.body, req.query, req.params, and req.headers with validated/normalized values on success.
 * Forwards a formatted validation error to the next middleware if validation fails.
 */
export function validateRequest(schemas: RequestValidationSchema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params)) as Request['params'];
      }
      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query)) as Request['query'];
      }
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.headers) {
        req.headers = (await schemas.headers.parseAsync(req.headers)) as Request['headers'];
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationIssues = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          rule: err.code,
        }));

        return next(new BadRequestError('Validation failed', 'VALIDATION_ERROR', validationIssues));
      }
      next(error);
    }
  };
}
