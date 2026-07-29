import { Request, Response, NextFunction } from 'express';
import * as choiceService from '../services/choice.js';

/**
 * Controller to create a new choice for a question.
 */
export async function createChoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const choice = await choiceService.createChoice(req.body);
    res.status(201).json({ success: true, data: choice });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update a choice by its ID.
 */
export async function updateChoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const choice = await choiceService.updateChoice(id as string, req.body);
    res.status(200).json({ success: true, data: choice });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to delete a choice by its ID.
 */
export async function deleteChoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await choiceService.deleteChoice(id as string);
    res.status(200).json({ success: true, data: deleted });
  } catch (error) {
    next(error);
  }
}
