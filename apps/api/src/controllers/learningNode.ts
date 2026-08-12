import { Request, Response, NextFunction } from 'express';
import * as learningNodeService from '../services/learningNode.js';

/**
 * Controller to retrieve the full connected Knowledge Tree graph suitable for GTA-style map visualizer.
 */
export async function getNodesTree(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    const tree = await learningNodeService.getNodesTree(userId);
    res.status(200).json({ success: true, data: tree });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve a single learning node by its slug with prerequisites, dependent nodes, and learner status.
 */
export async function getNodeBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { slug } = req.params;
    const userId = req.user?.id;
    const node = await learningNodeService.getNodeBySlug(slug as string, userId);
    res.status(200).json({ success: true, data: node });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to create a new learning node (Admin).
 */
export async function createNode(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const node = await learningNodeService.createNode(req.body);
    res.status(201).json({ success: true, data: node });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to update an existing learning node (Admin).
 */
export async function updateNode(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const node = await learningNodeService.updateNode(id as string, req.body);
    res.status(200).json({ success: true, data: node });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to add a prerequisite link to a learning node (Admin).
 */
export async function addPrerequisite(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const edge = await learningNodeService.addPrerequisite(id as string, req.body);
    res.status(201).json({ success: true, data: edge });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to remove a prerequisite link from a learning node (Admin).
 */
export async function removePrerequisite(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id, prerequisiteId } = req.params;
    await learningNodeService.removePrerequisite(id as string, prerequisiteId as string);
    res.status(200).json({
      success: true,
      message: 'Prerequisite dependency edge removed successfully',
    });
  } catch (error) {
    next(error);
  }
}
