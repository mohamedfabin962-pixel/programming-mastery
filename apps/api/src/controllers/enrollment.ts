import { Request, Response, NextFunction } from 'express';
import * as enrollmentService from '../services/enrollment.js';

/**
 * Controller to enroll the authenticated user in a course.
 */
export async function enrollInCourse(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { courseSlug } = req.body;
    const userId = req.user!.id;
    const enrollment = await enrollmentService.enrollInCourse(courseSlug, userId);
    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve all enrollments for the authenticated user.
 */
export async function getMyEnrollments(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const enrollments = await enrollmentService.getMyEnrollments(userId);
    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve enrollment details for a specific course by slug.
 */
export async function getCourseEnrollment(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const userId = req.user!.id;
    const enrollment = await enrollmentService.getCourseEnrollment(courseSlug as string, userId);
    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update the last accessed timestamp for a course enrollment.
 */
export async function updateLastAccess(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const userId = req.user!.id;
    const enrollment = await enrollmentService.updateLastAccess(courseSlug as string, userId);
    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to delete a course enrollment (unenroll).
 */
export async function deleteEnrollment(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const userId = req.user!.id;
    const result = await enrollmentService.deleteEnrollment(courseSlug as string, userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
