import { courseSchemas } from './course.js';
import { lessonSchemas } from './lesson.js';
import { progressSchemas } from './progress.js';
import { quizSchemas } from './quiz.js';
import { questionSchemas } from './question.js';
import { choiceSchemas } from './choice.js';
import { quizAttemptSchemas } from './quizAttempt.js';
import { enrollmentSchemas } from './enrollment.js';
import { dashboardSchemas } from './dashboard.js';
import { reviewSchemas } from './review.js';
import { certificateSchemas } from './certificate.js';

/**
 * OpenAPI schema components from different domain validations.
 * Composition entrypoint.
 */
export const schemas = {
  ...courseSchemas,
  ...lessonSchemas,
  ...progressSchemas,
  ...quizSchemas,
  ...questionSchemas,
  ...choiceSchemas,
  ...quizAttemptSchemas,
  ...enrollmentSchemas,
  ...dashboardSchemas,
  ...reviewSchemas,
  ...certificateSchemas,
};
