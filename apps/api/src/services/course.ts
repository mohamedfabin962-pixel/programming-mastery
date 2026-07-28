import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Retrieves all published courses from the database, ordered by creation date descending.
 */
export async function getCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Retrieves a single published course by its slug.
 * Throws a NotFoundError if the course doesn't exist or is not published.
 */
export async function getCourseBySlug(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course || !course.isPublished) {
    throw new NotFoundError(`Course with slug "${slug}" not found`);
  }

  return course;
}
