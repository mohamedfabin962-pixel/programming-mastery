import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createReviewSchema, getCourseReviewsSchema } from '../validation/review.js';
import * as reviewController from '../controllers/review.js';

const router: Router = Router();

// Create a review (Protected)
router.post(
  '/',
  requireAuth,
  validateRequest({ body: createReviewSchema }),
  reviewController.createReview,
);

// Get reviews for a specific course (Protected)
router.get(
  '/:courseSlug',
  requireAuth,
  validateRequest({ params: getCourseReviewsSchema }),
  reviewController.getCourseReviews,
);

export default router;
