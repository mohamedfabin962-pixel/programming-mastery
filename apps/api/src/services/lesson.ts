import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Retrieves all published lessons for a published course.
 * Throws a NotFoundError if the course doesn't exist or is not published.
 */
export async function getLessons(courseSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course || !course.isPublished) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  return prisma.lesson.findMany({
    where: {
      courseId: course.id,
      isPublished: true,
    },
    orderBy: {
      order: 'asc',
    },
  });
}

/**
 * Retrieves a single published lesson by its slug and parent course slug.
 * Throws a NotFoundError if either the course or the lesson is not found or is not published.
 */
export async function getLesson(courseSlug: string, lessonSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course || !course.isPublished) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  const lesson = await prisma.lesson.findUnique({
    where: {
      courseId_slug: {
        courseId: course.id,
        slug: lessonSlug,
      },
    },
  });

  if (!lesson || !lesson.isPublished) {
    throw new NotFoundError(`Lesson with slug "${lessonSlug}" not found`);
  }

  return lesson;
}
