import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { getCourseBySlugSchema } from '../validation/course.js';
import * as courseController from '../controllers/course.js';

const router: Router = Router();

router.get('/', courseController.getCourses);
router.get(
  '/:slug',
  validateRequest({ params: getCourseBySlugSchema }),
  courseController.getCourseBySlug,
);

export default router;
