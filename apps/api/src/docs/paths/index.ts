import { coursePaths } from './course.js';
import { lessonPaths } from './lesson.js';

/**
 * OpenAPI path fragments from different route modules.
 * Composition entrypoint.
 */
export const paths = {
  ...coursePaths,
  ...lessonPaths,
};
