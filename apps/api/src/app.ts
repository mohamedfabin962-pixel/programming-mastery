import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { toNodeHandler } from 'better-auth/node';
import { env } from './config/env.js';
import { auth } from './lib/auth.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import baseRouter from './routes/index.js';
import { NotFoundError } from './utils/errors.js';

const app: Express = express();

// Security and utility middleware
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
    credentials: true,
  }),
);

// Better Auth route handler must be mounted before body parsing middleware
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Structured request logging middleware
app.use(requestLogger);

// Base application routes (includes /health and /version)
app.use('/', baseRouter);

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(new NotFoundError('Resource not found'));
});

// Centralized error handler middleware
app.use(errorHandler);

export default app;
