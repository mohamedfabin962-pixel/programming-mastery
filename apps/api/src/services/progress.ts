import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Retrieves progress for a specific user and lesson.
 * If the lesson does not exist, throws NotFoundError.
 * If no progress record exists, returns { completed: false, completedAt: null }.
 */
export async function getLessonProgress(userId: string, lessonId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    throw new NotFoundError(`Lesson with ID "${lessonId}" not found`);
  }

  const progress = await prisma.progress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });

  if (!progress) {
    return {
      completed: false,
      completedAt: null,
    };
  }

  return {
    completed: progress.completed,
    completedAt: progress.completedAt,
  };
}
