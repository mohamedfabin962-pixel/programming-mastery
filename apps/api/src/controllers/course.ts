import { Request, Response, NextFunction } from 'express';
import * as courseService from '../services/course.js';

/**
 * Controller to retrieve all published courses.
 */
export async function getCourses(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await courseService.getCourses();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve a single published course by its slug.
 */
export async function getCourseBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { slug } = req.params;
    const course = await courseService.getCourseBySlug(slug as string);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to create a new course.
 */
export async function createCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update properties of an existing course by its ID.
 */
export async function updateCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const course = await courseService.updateCourse(id as string, req.body);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to delete a course by its ID.
 */
export async function deleteCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const course = await courseService.deleteCourse(id as string);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
}
