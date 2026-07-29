import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  createQuestionSchema,
  updateQuestionSchema,
  questionIdParamSchema,
} from '../validation/question.js';
import * as questionController from '../controllers/question.js';

const router: Router = Router();

// Create new question (protected)
router.post(
  '/',
  requireAuth,
  validateRequest({ body: createQuestionSchema }),
  questionController.createQuestion,
);

// Update a question (protected)
router.put(
  '/:id',
  requireAuth,
  validateRequest({ params: questionIdParamSchema, body: updateQuestionSchema }),
  questionController.updateQuestion,
);

// Delete a question (protected)
router.delete(
  '/:id',
  requireAuth,
  validateRequest({ params: questionIdParamSchema }),
  questionController.deleteQuestion,
);

export default router;
