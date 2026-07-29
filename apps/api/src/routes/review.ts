import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  createReviewSchema,
  getCourseReviewsSchema,
  reviewIdParamSchema,
  updateReviewSchema,
} from '../validation/review.js';
import * as reviewController from '../controllers/review.js';

const router: Router = Router();

// POST /api/reviews — Create a review (Protected)
router.post(
  '/',
  requireAuth,
  validateRequest({ body: createReviewSchema }),
  reviewController.createReview,
);

// GET /api/reviews/:courseSlug — Get all reviews for a course (Protected)
router.get(
  '/:courseSlug',
  requireAuth,
  validateRequest({ params: getCourseReviewsSchema }),
  reviewController.getCourseReviews,
);

// PATCH /api/reviews/:reviewId — Update own review (Protected)
router.patch(
  '/:reviewId',
  requireAuth,
  validateRequest({ params: reviewIdParamSchema, body: updateReviewSchema }),
  reviewController.updateReview,
);

// DELETE /api/reviews/:reviewId — Delete own review (Protected)
router.delete(
  '/:reviewId',
  requireAuth,
  validateRequest({ params: reviewIdParamSchema }),
  reviewController.deleteReview,
);

export default router;
