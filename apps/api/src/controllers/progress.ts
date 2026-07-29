import { Request, Response, NextFunction } from 'express';
import * as progressService from '../services/progress.js';

/**
 * Controller to retrieve an authenticated user's progress for a specific lesson.
 */
export async function getLessonProgress(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { lessonId } = req.params;
    const userId = req.session?.userId;

    const progress = await progressService.getLessonProgress(userId as string, lessonId as string);
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update/upsert an authenticated user's progress for a specific lesson.
 */
export async function updateLessonProgress(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { lessonId } = req.params;
    const { completed } = req.body;
    const userId = req.session?.userId;

    const progress = await progressService.updateLessonProgress(
      userId as string,
      lessonId as string,
      completed as boolean,
    );
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
}
