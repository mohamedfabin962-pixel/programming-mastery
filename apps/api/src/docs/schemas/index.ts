import { courseSchemas } from './course.js';
import { lessonSchemas } from './lesson.js';
import { progressSchemas } from './progress.js';
import { quizSchemas } from './quiz.js';

/**
 * OpenAPI schema components from different domain validations.
 * Composition entrypoint.
 */
export const schemas = {
  ...courseSchemas,
  ...lessonSchemas,
  ...progressSchemas,
  ...quizSchemas,
};
