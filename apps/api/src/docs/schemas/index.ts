import { courseSchemas } from './course.js';
import { lessonSchemas } from './lesson.js';

/**
 * OpenAPI schema components from different domain validations.
 * Composition entrypoint.
 */
export const schemas = {
  ...courseSchemas,
  ...lessonSchemas,
};
