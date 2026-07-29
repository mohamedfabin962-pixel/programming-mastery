import { prisma } from '../lib/prisma.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export const reviewSelect = {
  id: true,
  userId: true,
  courseId: true,
  rating: true,
  review: true,
  createdAt: true,
  updatedAt: true,
};

/**
 * Creates a review for a course.
 * Enforces enrollment, completion of at least one lesson, and review uniqueness.
 * Re-aggregates course average rating and review counts inside the transaction.
 */
export async function createReview(
  courseSlug: string,
  userId: string,
  rating: number,
  reviewContent?: string | null,
) {
  return prisma.$transaction(async (tx) => {
    // Resolve course by slug
    const course = await tx.course.findUnique({
      where: { slug: courseSlug },
    });

    if (!course) {
      throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
    }

    // Verify user is enrolled
    const enrollment = await tx.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    if (!enrollment) {
      throw new ValidationError('You can only review courses you are enrolled in.');
    }

    // Verify user has completed at least one lesson
    const completedProgressCount = await tx.progress.count({
      where: {
        userId,
        completed: true,
        lesson: {
          courseId: course.id,
        },
      },
    });

    if (completedProgressCount === 0) {
      throw new ValidationError(
        'You must complete at least one lesson before reviewing this course.',
      );
    }

    // Verify course has not already been reviewed by this user
    const existingReview = await tx.review.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    if (existingReview) {
      throw new ValidationError('You have already reviewed this course.');
    }

    // Create new review
    const review = await tx.review.create({
      data: {
        userId,
        courseId: course.id,
        rating,
        review: reviewContent,
      },
      select: reviewSelect,
    });

    // Aggregate reviews for course
    const agg = await tx.review.aggregate({
      where: { courseId: course.id },
      _count: { id: true },
      _avg: { rating: true },
    });

    const reviewCount = agg._count.id;
    const averageRating = Math.round((agg._avg.rating ?? 0) * 100) / 100;

    // Update course aggregates
    await tx.course.update({
      where: { id: course.id },
      data: {
        averageRating,
        reviewCount,
      },
    });

    return review;
  });
}

/**
 * Retrieves all reviews for a course, sorted newest first.
 * Employs select to return stable and safe user profiles details.
 */
export async function getCourseReviews(courseSlug: string) {
  // Resolve course by slug
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  return prisma.review.findMany({
    where: { courseId: course.id },
    orderBy: { createdAt: 'desc' },
    select: {
      rating: true,
      review: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
