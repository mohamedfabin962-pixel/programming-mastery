import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';

const courseMetadataInclude = {
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
};

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
      include: courseMetadataInclude,
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
      include: courseMetadataInclude,
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
    include: courseMetadataInclude,
    orderBy: {
      enrolledAt: 'desc',
    },
  });
}

/**
 * Retrieves the user's enrollment for a specific course by slug.
 * Throws NotFoundError if the course or the enrollment does not exist.
 */
export async function getCourseEnrollment(courseSlug: string, userId: string) {
  // Resolve course by slug
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
    include: courseMetadataInclude,
  });

  if (!enrollment) {
    throw new NotFoundError(`Enrollment for course "${courseSlug}" not found`);
  }

  return enrollment;
}

/**
 * Updates the last accessed timestamp for a user's course enrollment.
 * Executes all database operations inside a single transaction.
 * Throws NotFoundError if the course or the enrollment does not exist.
 */
export async function updateLastAccess(courseSlug: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    // Resolve course by slug
    const course = await tx.course.findUnique({
      where: { slug: courseSlug },
    });

    if (!course) {
      throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
    }

    // Find the enrollment
    const enrollment = await tx.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundError(`Enrollment for course "${courseSlug}" not found`);
    }

    // Update lastAccessedAt
    return tx.enrollment.update({
      where: { id: enrollment.id },
      data: {
        lastAccessedAt: new Date(),
      },
      include: courseMetadataInclude,
    });
  });
}

/**
 * Deletes a course enrollment, effectively unenrolling the user.
 * Executes all database operations inside a single transaction.
 * Throws NotFoundError if the course or the enrollment does not exist.
 */
export async function deleteEnrollment(courseSlug: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    // Resolve course by slug
    const course = await tx.course.findUnique({
      where: { slug: courseSlug },
    });

    if (!course) {
      throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
    }

    // Find the enrollment
    const enrollment = await tx.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundError(`Enrollment for course "${courseSlug}" not found`);
    }

    // Delete enrollment
    await tx.enrollment.delete({
      where: { id: enrollment.id },
    });

    return { success: true };
  });
}
