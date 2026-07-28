import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { getLessonsParamsSchema, getLessonBySlugParamsSchema } from '../validation/lesson.js';
import * as lessonController from '../controllers/lesson.js';

const router: Router = Router();

router.get(
  '/:courseSlug/lessons',
  validateRequest({ params: getLessonsParamsSchema }),
  lessonController.getLessons,
);

router.get(
  '/:courseSlug/lessons/:lessonSlug',
  validateRequest({ params: getLessonBySlugParamsSchema }),
  lessonController.getLesson,
);

export default router;
