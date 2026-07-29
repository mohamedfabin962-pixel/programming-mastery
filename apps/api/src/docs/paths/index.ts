import { coursePaths } from './course.js';
import { lessonPaths } from './lesson.js';
import { progressPaths } from './progress.js';
import { quizPaths } from './quiz.js';
import { questionPaths } from './question.js';
import { choicePaths } from './choice.js';
import { quizAttemptPaths } from './quizAttempt.js';
import { enrollmentPaths } from './enrollment.js';

/**
 * OpenAPI path fragments from different route modules.
 * Composition entrypoint.
 */
export const paths = {
  ...coursePaths,
  ...lessonPaths,
  ...progressPaths,
  ...quizPaths,
  ...questionPaths,
  ...choicePaths,
  ...quizAttemptPaths,
  ...enrollmentPaths,
};
