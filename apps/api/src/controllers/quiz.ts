import { Request, Response, NextFunction } from 'express';
import * as quizService from '../services/quiz.js';

/**
 * Controller to retrieve all published quizzes for a specific published lesson.
 */
export async function getLessonQuizzes(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { lessonSlug } = req.params;
    const quizzes = await quizService.getLessonQuizzes(lessonSlug as string);
    res.status(200).json({ success: true, data: quizzes });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve a single published quiz metadata by its ID.
 */
export async function getQuizById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const quiz = await quizService.getQuizById(id as string);
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    next(error);
  }
}
