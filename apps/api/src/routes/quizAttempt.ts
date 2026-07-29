import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  startQuizAttemptSchema,
  quizAttemptIdParamSchema,
  attemptIdParamSchema,
  submitAnswerSchema,
} from '../validation/quizAttempt.js';
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

// Submit an answer (protected)
router.post(
  '/:attemptId/answers',
  requireAuth,
  validateRequest({ params: attemptIdParamSchema, body: submitAnswerSchema }),
  attemptController.submitAnswer,
);

// Complete an attempt (protected)
router.post(
  '/:attemptId/complete',
  requireAuth,
  validateRequest({ params: attemptIdParamSchema }),
  attemptController.completeAttempt,
);

export default router;
