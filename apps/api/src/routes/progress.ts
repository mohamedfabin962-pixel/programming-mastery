import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  getLessonProgressSchema,
  updateLessonProgressParamsSchema,
  updateLessonProgressBodySchema,
} from '../validation/progress.js';
import * as progressController from '../controllers/progress.js';

const router: Router = Router();

// Retrieve lesson progress status
router.get(
  '/:lessonId/progress',
  requireAuth,
  validateRequest({ params: getLessonProgressSchema }),
  progressController.getLessonProgress,
);

// Record or update lesson progress status
router.put(
  '/:lessonId/progress',
  requireAuth,
  validateRequest({
    params: updateLessonProgressParamsSchema,
    body: updateLessonProgressBodySchema,
  }),
  progressController.updateLessonProgress,
);

export default router;
