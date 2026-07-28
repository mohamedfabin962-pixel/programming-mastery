import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { getLessonProgressSchema } from '../validation/progress.js';
import * as progressController from '../controllers/progress.js';

const router: Router = Router();

router.get(
  '/:lessonId/progress',
  requireAuth,
  validateRequest({ params: getLessonProgressSchema }),
  progressController.getLessonProgress,
);

export default router;
