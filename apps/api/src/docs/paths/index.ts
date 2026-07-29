import { coursePaths } from './course.js';
import { lessonPaths } from './lesson.js';
import { progressPaths } from './progress.js';
import { quizPaths } from './quiz.js';

/**
 * OpenAPI path fragments from different route modules.
 * Composition entrypoint.
 */
export const paths = {
  ...coursePaths,
  ...lessonPaths,
  ...progressPaths,
  ...quizPaths,
};
