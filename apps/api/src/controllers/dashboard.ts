import { Request, Response, NextFunction } from 'express';
import * as dashboardService from '../services/dashboard.js';

/**
 * Controller to retrieve dashboard metrics summary.
 */
export async function getDashboardSummary(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const summary = await dashboardService.getDashboardSummary(userId);
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve the learner's continue learning state.
 */
export async function getContinueLearning(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const continueLearning = await dashboardService.getContinueLearning(userId);
    res.status(200).json({ success: true, data: continueLearning });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve the learner's recent quiz attempts.
 */
export async function getRecentQuizAttempts(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const attempts = await dashboardService.getRecentQuizAttempts(userId);
    res.status(200).json({ success: true, data: attempts });
  } catch (error) {
    next(error);
  }
}
