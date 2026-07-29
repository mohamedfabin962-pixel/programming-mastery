import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { enrollInCourseSchema, courseSlugParamSchema } from '../validation/enrollment.js';
import * as enrollmentController from '../controllers/enrollment.js';

const router: Router = Router();

// Enroll in a course (Protected)
router.post(
  '/',
  requireAuth,
  validateRequest({ body: enrollInCourseSchema }),
  enrollmentController.enrollInCourse,
);

// Get my enrollments (Protected)
router.get('/', requireAuth, enrollmentController.getMyEnrollments);

// Get specific course enrollment (Protected)
router.get(
  '/:courseSlug',
  requireAuth,
  validateRequest({ params: courseSlugParamSchema }),
  enrollmentController.getCourseEnrollment,
);

// Update last accessed timestamp (Protected)
router.patch(
  '/:courseSlug/last-access',
  requireAuth,
  validateRequest({ params: courseSlugParamSchema }),
  enrollmentController.updateLastAccess,
);

// Unenroll from course (Protected)
router.delete(
  '/:courseSlug',
  requireAuth,
  validateRequest({ params: courseSlugParamSchema }),
  enrollmentController.deleteEnrollment,
);

export default router;
