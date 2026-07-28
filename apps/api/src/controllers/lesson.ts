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

/**
 * Controller to create a new lesson for a course.
 */
export async function createLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const lesson = await lessonService.createLesson(courseSlug as string, req.body);
    res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update properties of an existing lesson by its ID.
 */
export async function updateLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const lesson = await lessonService.updateLesson(id as string, req.body);
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to delete a lesson by its ID.
 */
export async function deleteLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const lesson = await lessonService.deleteLesson(id as string);
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
}
