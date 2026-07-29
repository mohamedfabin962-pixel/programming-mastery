import { Router } from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { env } from '../config/env.js';
import { requireAuth } from '../middlewares/auth.js';
import docsRouter from './docs.js';
import courseRouter from './course.js';
import { lessonRouter, lessonMgmtRouter } from './lesson.js';
import progressRouter from './progress.js';
import { lessonQuizRouter, quizRouter } from './quiz.js';
import questionRouter from './question.js';
import choiceRouter from './choice.js';
import quizAttemptRouter from './quizAttempt.js';

const router: Router = Router();

// Retrieve API version dynamically from package.json
let apiVersion = '1.0.0';
try {
  const packageJsonPath = fileURLToPath(new URL('../../package.json', import.meta.url));
  const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent) as { version?: string };
  apiVersion = packageJson.version || '1.0.0';
} catch (error) {
  console.warn('[Router] Failed to load API version from package.json, using default:', error);
}

/**
 * GET /health
 * System health and performance status.
 */
router.get('/health', (_req, res) => {
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: env.NODE_ENV,
    uptime: process.uptime(),
    details: {
      memory: {
        rss: `${Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100} MB`,
        heapTotal: `${Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100} MB`,
        heapUsed: `${Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100} MB`,
        external: `${Math.round((memoryUsage.external / 1024 / 1024) * 100) / 100} MB`,
      },
      pid: process.pid,
    },
  });
});

/**
 * GET /version
 * Retrieves the current API application version.
 */
router.get('/version', (_req, res) => {
  res.status(200).json({
    success: true,
    version: apiVersion,
    env: env.NODE_ENV,
  });
});

/**
 * GET /api/me
 * Retrieves current authenticated user profile and session metadata.
 * Ensures that no sensitive credentials (e.g. passwords/tokens) are exposed.
 */
router.get('/api/me', requireAuth, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user?.id,
      name: req.user?.name,
      email: req.user?.email,
      emailVerified: req.user?.emailVerified,
      image: req.user?.image,
      createdAt: req.user?.createdAt,
      updatedAt: req.user?.updatedAt,
    },
    session: {
      id: req.session?.id,
      expiresAt: req.session?.expiresAt,
      token: req.session?.token,
      createdAt: req.session?.createdAt,
      updatedAt: req.session?.updatedAt,
      ipAddress: req.session?.ipAddress,
      userAgent: req.session?.userAgent,
      userId: req.session?.userId,
    },
  });
});

// Mount API documentation routes
router.use('/docs', docsRouter);

// Mount Course routes
router.use('/api/courses', courseRouter);
router.use('/api/courses', lessonRouter);
router.use('/api/lessons', lessonMgmtRouter);
router.use('/api/lessons', progressRouter);
router.use('/api/lessons', lessonQuizRouter);
router.use('/api/quizzes', quizRouter);
router.use('/api/questions', questionRouter);
router.use('/api/choices', choiceRouter);
router.use('/api/quiz-attempts', quizAttemptRouter);

export default router;
