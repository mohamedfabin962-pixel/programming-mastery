import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  getLessonQuizzesParamsSchema,
  getQuizByIdParamsSchema,
  createQuizSchema,
  updateQuizSchema,
  quizIdParamSchema,
} from '../validation/quiz.js';
import * as quizController from '../controllers/quiz.js';

const lessonQuizRouter: Router = Router();

// Retrieve all quizzes for a specific lesson
lessonQuizRouter.get(
  '/:lessonSlug/quizzes',
  validateRequest({ params: getLessonQuizzesParamsSchema }),
  quizController.getLessonQuizzes,
);

const quizRouter: Router = Router();

// Retrieve quiz details by ID
quizRouter.get(
  '/:id',
  validateRequest({ params: getQuizByIdParamsSchema }),
  quizController.getQuizById,
);

// Create new quiz (protected)
quizRouter.post(
  '/',
  requireAuth,
  validateRequest({ body: createQuizSchema }),
  quizController.createQuiz,
);

// Update a quiz's title and description (protected)
quizRouter.put(
  '/:id',
  requireAuth,
  validateRequest({ params: quizIdParamSchema, body: updateQuizSchema }),
  quizController.updateQuiz,
);

// Delete a quiz by ID (protected)
quizRouter.delete(
  '/:id',
  requireAuth,
  validateRequest({ params: quizIdParamSchema }),
  quizController.deleteQuiz,
);

export { lessonQuizRouter, quizRouter };
