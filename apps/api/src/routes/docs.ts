import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from '../docs/openapi.js';

const router: Router = Router();

/**
 * GET /docs/openapi.json
 * Serves the raw OpenAPI JSON specification.
 */
router.get('/openapi.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(openApiSpec);
});

// Swagger UI configuration options
const options = {
  swaggerOptions: {
    persistAuthorization: true,
    operationsSorter: 'alpha',
    tagsSorter: 'alpha',
  },
};

/**
 * Serve the interactive Swagger UI.
 * Accessible at the mount path (e.g. /docs).
 */
router.use('/', swaggerUi.serve, swaggerUi.setup(openApiSpec, options));

export default router;
