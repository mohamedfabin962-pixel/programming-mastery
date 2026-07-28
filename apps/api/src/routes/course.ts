import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  getCourseBySlugSchema,
  createCourseSchema,
  updateCourseSchema,
  updateCourseParamsSchema,
  deleteCourseSchema,
} from '../validation/course.js';
import * as courseController from '../controllers/course.js';

const router: Router = Router();

router.get('/', courseController.getCourses);
router.get(
  '/:slug',
  validateRequest({ params: getCourseBySlugSchema }),
  courseController.getCourseBySlug,
);

router.post(
  '/',
  requireAuth,
  validateRequest({ body: createCourseSchema }),
  courseController.createCourse,
);

router.patch(
  '/:id',
  requireAuth,
  validateRequest({ params: updateCourseParamsSchema, body: updateCourseSchema }),
  courseController.updateCourse,
);

router.delete(
  '/:id',
  requireAuth,
  validateRequest({ params: deleteCourseSchema }),
  courseController.deleteCourse,
);

export default router;
