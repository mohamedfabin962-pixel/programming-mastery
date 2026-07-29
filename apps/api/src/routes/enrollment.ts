import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { enrollInCourseSchema } from '../validation/enrollment.js';
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

export default router;
