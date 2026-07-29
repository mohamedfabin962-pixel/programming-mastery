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

/**
 * Controller to create a new quiz.
 */
export async function createQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json({ success: true, data: quiz });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update a quiz's title and description.
 */
export async function updateQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const quiz = await quizService.updateQuiz(id as string, req.body);
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to delete a quiz by ID.
 */
export async function deleteQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await quizService.deleteQuiz(id as string);
    res.status(200).json({ success: true, data: deleted });
  } catch (error) {
    next(error);
  }
}
