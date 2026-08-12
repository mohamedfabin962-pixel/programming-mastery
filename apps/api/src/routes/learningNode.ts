import { Router } from 'express';
import { requireAuth, optionalAuth } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  getNodeBySlugParamsSchema,
  getNodeByIdParamsSchema,
  createNodeSchema,
  updateNodeSchema,
  addPrerequisiteSchema,
  removePrerequisiteParamsSchema,
} from '../validation/learningNode.js';
import * as learningNodeController from '../controllers/learningNode.js';

const router: Router = Router();

// GET /api/nodes/tree - Get complete connected learning node graph for map visualizer
router.get('/tree', optionalAuth, learningNodeController.getNodesTree);

// GET /api/nodes/:slug - Get single node details, prerequisites, and learner status
router.get(
  '/:slug',
  optionalAuth,
  validateRequest({ params: getNodeBySlugParamsSchema }),
  learningNodeController.getNodeBySlug,
);

// POST /api/nodes - Create a new learning node (Admin)
router.post(
  '/',
  requireAuth,
  validateRequest({ body: createNodeSchema }),
  learningNodeController.createNode,
);

// PUT /api/nodes/:id - Update an existing learning node (Admin)
router.put(
  '/:id',
  requireAuth,
  validateRequest({ params: getNodeByIdParamsSchema, body: updateNodeSchema }),
  learningNodeController.updateNode,
);

// POST /api/nodes/:id/prerequisites - Add a prerequisite dependency edge (Admin)
router.post(
  '/:id/prerequisites',
  requireAuth,
  validateRequest({ params: getNodeByIdParamsSchema, body: addPrerequisiteSchema }),
  learningNodeController.addPrerequisite,
);

// DELETE /api/nodes/:id/prerequisites/:prerequisiteId - Remove a prerequisite dependency edge (Admin)
router.delete(
  '/:id/prerequisites/:prerequisiteId',
  requireAuth,
  validateRequest({ params: removePrerequisiteParamsSchema }),
  learningNodeController.removePrerequisite,
);

export default router;
