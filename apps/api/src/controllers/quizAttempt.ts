import { Request, Response, NextFunction } from 'express';
import * as attemptService from '../services/quizAttempt.js';

/**
 * Controller to start a new quiz attempt or return an existing IN_PROGRESS attempt.
 */
export async function startQuizAttempt(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { quizId } = req.body;
    const userId = req.user!.id;
    const attempt = await attemptService.startQuizAttempt(quizId, userId);
    res.status(201).json({ success: true, data: attempt });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve details of a specific quiz attempt.
 */
export async function getAttempt(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const attempt = await attemptService.getAttempt(id as string, userId);
    res.status(200).json({ success: true, data: attempt });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve all quiz attempts for the authenticated user.
 */
export async function getMyAttempts(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const attempts = await attemptService.getMyAttempts(userId);
    res.status(200).json({ success: true, data: attempts });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to submit an answer to a question in a quiz attempt.
 */
export async function submitAnswer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { attemptId } = req.params;
    const userId = req.user!.id;
    const { questionId, choiceId } = req.body;
    const answer = await attemptService.submitAnswer(
      attemptId as string,
      userId,
      questionId as string,
      choiceId as string,
    );
    res.status(200).json({ success: true, data: answer });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to complete an active quiz attempt.
 */
export async function completeAttempt(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { attemptId } = req.params;
    const userId = req.user!.id;
    const result = await attemptService.completeAttempt(attemptId as string, userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
