import { coursePaths } from './course.js';

/**
 * OpenAPI path fragments from different route modules.
 * Composition entrypoint.
 */
export const paths = {
  ...coursePaths,
};
