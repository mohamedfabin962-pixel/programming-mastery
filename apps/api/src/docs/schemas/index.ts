import { courseSchemas } from './course.js';

/**
 * OpenAPI schema components from different domain validations.
 * Composition entrypoint.
 */
export const schemas = {
  ...courseSchemas,
};
