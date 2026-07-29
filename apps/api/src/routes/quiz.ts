import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { getLessonQuizzesParamsSchema, getQuizByIdParamsSchema } from '../validation/quiz.js';
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

export { lessonQuizRouter, quizRouter };
