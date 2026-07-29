import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { startQuizAttemptSchema, quizAttemptIdParamSchema } from '../validation/quizAttempt.js';
import * as attemptController from '../controllers/quizAttempt.js';

const router: Router = Router();

// Start attempt
router.post(
  '/',
  requireAuth,
  validateRequest({ body: startQuizAttemptSchema }),
  attemptController.startQuizAttempt,
);

// Get my attempts
router.get('/', requireAuth, attemptController.getMyAttempts);

// Get specific attempt details by ID
router.get(
  '/:id',
  requireAuth,
  validateRequest({ params: quizAttemptIdParamSchema }),
  attemptController.getAttempt,
);

export default router;
