import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  createChoiceSchema,
  updateChoiceSchema,
  choiceIdParamSchema,
} from '../validation/choice.js';
import * as choiceController from '../controllers/choice.js';

const router: Router = Router();

// Create new choice (protected)
router.post(
  '/',
  requireAuth,
  validateRequest({ body: createChoiceSchema }),
  choiceController.createChoice,
);

// Update a choice (protected)
router.put(
  '/:id',
  requireAuth,
  validateRequest({ params: choiceIdParamSchema, body: updateChoiceSchema }),
  choiceController.updateChoice,
);

// Delete a choice (protected)
router.delete(
  '/:id',
  requireAuth,
  validateRequest({ params: choiceIdParamSchema }),
  choiceController.deleteChoice,
);

export default router;
