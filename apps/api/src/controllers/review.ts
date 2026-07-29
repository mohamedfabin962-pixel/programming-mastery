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
