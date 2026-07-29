import { Request, Response, NextFunction } from 'express';
import * as questionService from '../services/question.js';

/**
 * Controller to create a new question for a quiz.
 */
export async function createQuestion(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update a question by its ID.
 */
export async function updateQuestion(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const question = await questionService.updateQuestion(id as string, req.body);
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to delete a question by its ID.
 */
export async function deleteQuestion(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await questionService.deleteQuestion(id as string);
    res.status(200).json({ success: true, data: deleted });
  } catch (error) {
    next(error);
  }
}
