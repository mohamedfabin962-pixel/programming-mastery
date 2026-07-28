import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  getLessonsParamsSchema,
  getLessonBySlugParamsSchema,
  createLessonSchema,
  updateLessonSchema,
  updateLessonParamsSchema,
  deleteLessonSchema,
} from '../validation/lesson.js';
import * as lessonController from '../controllers/lesson.js';

const lessonRouter: Router = Router();

// Retrieve lessons list
lessonRouter.get(
  '/:courseSlug/lessons',
  validateRequest({ params: getLessonsParamsSchema }),
  lessonController.getLessons,
);

// Retrieve lesson details
lessonRouter.get(
  '/:courseSlug/lessons/:lessonSlug',
  validateRequest({ params: getLessonBySlugParamsSchema }),
  lessonController.getLesson,
);

// Create new lesson (protected)
lessonRouter.post(
  '/:courseSlug/lessons',
  requireAuth,
  validateRequest({ params: getLessonsParamsSchema, body: createLessonSchema }),
  lessonController.createLesson,
);

const lessonMgmtRouter: Router = Router();

// Update lesson (protected)
lessonMgmtRouter.patch(
  '/:id',
  requireAuth,
  validateRequest({ params: updateLessonParamsSchema, body: updateLessonSchema }),
  lessonController.updateLesson,
);

// Delete lesson (protected)
lessonMgmtRouter.delete(
  '/:id',
  requireAuth,
  validateRequest({ params: deleteLessonSchema }),
  lessonController.deleteLesson,
);

export { lessonRouter, lessonMgmtRouter };
