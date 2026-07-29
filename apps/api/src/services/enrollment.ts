import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Enrolls a user in a course by course slug.
 * Resolves the course, checks for existing enrollment, and creates the enrollment.
 * Executes all database operations inside a single transaction.
 */
export async function enrollInCourse(courseSlug: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    // Resolve course by slug
    const course = await tx.course.findUnique({
      where: { slug: courseSlug },
    });

    if (!course || !course.isPublished) {
      throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
    }

    // Check for an existing enrollment
    const existingEnrollment = await tx.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return existingEnrollment;
    }

    // Create new enrollment
    return tx.enrollment.create({
      data: {
        userId,
        courseId: course.id,
      },
    });
  });
}

/**
 * Retrieves all enrollments for the authenticated user, sorted newest first.
 * Includes lightweight course metadata.
 */
export async function getMyEnrollments(userId: string) {
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        select: {
          id: true,
          slug: true,
          title: true,
          thumbnail: true,
          difficulty: true,
          languageCode: true,
        },
      },
    },
    orderBy: {
      enrolledAt: 'desc',
    },
  });
}
