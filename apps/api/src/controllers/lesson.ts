import { Request, Response, NextFunction } from 'express';
import * as lessonService from '../services/lesson.js';

/**
 * Controller to retrieve all published lessons for a published course.
 */
export async function getLessons(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const lessons = await lessonService.getLessons(courseSlug as string);
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve a single published lesson by its slug and parent course slug.
 */
export async function getLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { courseSlug, lessonSlug } = req.params;
    const lesson = await lessonService.getLesson(courseSlug as string, lessonSlug as string);
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
}
