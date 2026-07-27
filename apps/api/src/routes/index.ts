import { Router } from 'express';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { env } from '../config/env.js';

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

export default router;
