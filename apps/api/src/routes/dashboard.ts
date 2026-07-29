import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import * as dashboardController from '../controllers/dashboard.js';

const router: Router = Router();

// Retrieve dashboard summary metrics (Protected)
router.get('/', requireAuth, dashboardController.getDashboardSummary);

// Retrieve recently accessed enrollment details (Protected)
router.get('/continue-learning', requireAuth, dashboardController.getContinueLearning);

// Retrieve latest 10 completed quiz attempts (Protected)
router.get('/recent-quizzes', requireAuth, dashboardController.getRecentQuizAttempts);

export default router;
