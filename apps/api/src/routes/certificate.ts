import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { certificateParamsSchema } from '../validation/certificate.js';
import * as certificateController from '../controllers/certificate.js';

const router: Router = Router();

// GET /api/certificates - Get all certificates for authenticated user (Protected)
router.get('/', requireAuth, certificateController.getMyCertificates);

// GET /api/certificates/:courseSlug - Get certificate for courseSlug (Protected)
router.get(
  '/:courseSlug',
  requireAuth,
  validateRequest({ params: certificateParamsSchema }),
  certificateController.getCertificate,
);

// POST /api/certificates/:courseSlug/generate - Generate certificate for courseSlug (Protected)
router.post(
  '/:courseSlug/generate',
  requireAuth,
  validateRequest({ params: certificateParamsSchema }),
  certificateController.generateCertificate,
);

export default router;
