import { Request, Response, NextFunction } from 'express';
import * as certificateService from '../services/certificate.js';

/**
 * Controller to retrieve all certificates for the authenticated user.
 */
export async function getMyCertificates(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const certificates = await certificateService.getMyCertificates(userId);
    res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to retrieve a specific certificate for the authenticated user.
 */
export async function getCertificate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const userId = req.user!.id;
    const certificate = await certificateService.getCertificate(courseSlug as string, userId);
    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to generate a new certificate for the authenticated user.
 */
export async function generateCertificate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { courseSlug } = req.params;
    const userId = req.user!.id;
    const certificate = await certificateService.generateCertificate(courseSlug as string, userId);
    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
}
