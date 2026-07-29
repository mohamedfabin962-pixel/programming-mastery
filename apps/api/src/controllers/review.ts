import { Request, Response, NextFunction } from 'express';
import * as reviewService from '../services/review.js';

/**
 * Controller to create a course review.
 */
export async function createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { courseSlug, rating, review } = req.body;
    const userId = req.user!.id;
    const reviewRecord = await reviewService.createReview(courseSlug, userId, rating, review);
    res.status(201).json({ success: true, data: reviewRecord });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve all reviews for a specific course.
 */
export async function getCourseReviews(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const reviews = await reviewService.getCourseReviews(courseSlug as string);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update the authenticated user's own review.
 */
export async function updateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { reviewId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user!.id;
    const updated = await reviewService.updateReview(reviewId as string, userId, rating, review);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to delete the authenticated user's own review.
 */
export async function deleteReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { reviewId } = req.params;
    const userId = req.user!.id;
    const result = await reviewService.deleteReview(reviewId as string, userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
