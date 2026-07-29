import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { ForbiddenError, NotFoundError, ValidationError } from '../utils/errors.js';

export const reviewSelect = {
  id: true,
  userId: true,
  courseId: true,
  rating: true,
  review: true,
  createdAt: true,
  updatedAt: true,
};

// ─── Private helper ───────────────────────────────────────────────────────────

/**
 * Aggregates all reviews for a course inside an active transaction,
 * then updates Course.averageRating and Course.reviewCount atomically.
 *
 * When the last review is deleted _avg.rating is null; we reset both
 * aggregates to 0 in that case.
 */
async function syncCourseRatingAggregates(
  tx: Prisma.TransactionClient,
  courseId: string,
): Promise<void> {
  const agg = await tx.review.aggregate({
    where: { courseId },
    _count: { id: true },
    _avg: { rating: true },
  });

  const reviewCount = agg._count.id;
  const averageRating = reviewCount === 0 ? 0 : Math.round((agg._avg.rating ?? 0) * 100) / 100;

  await tx.course.update({
    where: { id: courseId },
    data: { averageRating, reviewCount },
  });
}

// ─── Public service functions ─────────────────────────────────────────────────

/**
 * Creates a review for a course.
 * Enforces enrollment, completion of at least one lesson, and review uniqueness.
 * Re-aggregates course rating and review count inside the transaction.
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
      select: { id: true },
    });

    if (!course) {
      throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
    }

    // Verify user is enrolled
    const enrollment = await tx.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
      select: { id: true },
    });

    if (!enrollment) {
      throw new ValidationError('You can only review courses you are enrolled in.');
    }

    // Verify user has completed at least one lesson
    const completedProgressCount = await tx.progress.count({
      where: {
        userId,
        completed: true,
        lesson: { courseId: course.id },
      },
    });

    if (completedProgressCount === 0) {
      throw new ValidationError(
        'You must complete at least one lesson before reviewing this course.',
      );
    }

    // Verify course has not already been reviewed by this user
    const existingReview = await tx.review.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
      select: { id: true },
    });

    if (existingReview) {
      throw new ValidationError('You have already reviewed this course.');
    }

    // Create new review
    const review = await tx.review.create({
      data: { userId, courseId: course.id, rating, review: reviewContent },
      select: reviewSelect,
    });

    // Sync course aggregates
    await syncCourseRatingAggregates(tx, course.id);

    return review;
  });
}

/**
 * Retrieves all reviews for a course, sorted newest first.
 * Exposes only safe user fields (id, name).
 */
export async function getCourseReviews(courseSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true },
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
        select: { id: true, name: true },
      },
    },
  });
}

/**
 * Updates an existing review.
 * Verifies ownership, updates fields, and re-syncs course aggregates.
 */
export async function updateReview(
  reviewId: string,
  userId: string,
  rating?: number,
  reviewContent?: string | null,
) {
  return prisma.$transaction(async (tx) => {
    // Resolve review — narrow select, no include
    const existing = await tx.review.findUnique({
      where: { id: reviewId },
      select: { id: true, userId: true, courseId: true },
    });

    if (!existing) {
      throw new NotFoundError(`Review with id "${reviewId}" not found`);
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError('You can only edit your own reviews.');
    }

    // Update review fields and return with shared reviewSelect
    const updated = await tx.review.update({
      where: { id: reviewId },
      data: {
        ...(rating !== undefined && { rating }),
        ...(reviewContent !== undefined && { review: reviewContent }),
      },
      select: reviewSelect,
    });

    // Sync course aggregates
    await syncCourseRatingAggregates(tx, existing.courseId);

    return updated;
  });
}

/**
 * Deletes a review.
 * Verifies ownership, removes the record, and re-syncs course aggregates.
 * If the deleted review was the last one, course aggregates reset to 0.
 */
export async function deleteReview(reviewId: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    // Resolve review — narrow select, no include
    const existing = await tx.review.findUnique({
      where: { id: reviewId },
      select: { id: true, userId: true, courseId: true },
    });

    if (!existing) {
      throw new NotFoundError(`Review with id "${reviewId}" not found`);
    }

    if (existing.userId !== userId) {
      throw new ForbiddenError('You can only delete your own reviews.');
    }

    await tx.review.delete({ where: { id: reviewId } });

    // Sync course aggregates (helper handles zero-reset when count drops to 0)
    await syncCourseRatingAggregates(tx, existing.courseId);

    return { success: true };
  });
}
