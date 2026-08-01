import crypto from 'crypto';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export const certificateSelect = {
  id: true,
  userId: true,
  courseId: true,
  certificateNumber: true,
  issuedAt: true,
  createdAt: true,
};

/**
 * Reusable private helper to verify course completion inside a transaction.
 */
async function verifyCourseCompletion(
  tx: Prisma.TransactionClient,
  courseId: string,
  userId: string,
): Promise<boolean> {
  const publishedLessons = await tx.lesson.findMany({
    where: { courseId, isPublished: true },
    select: { id: true },
  });

  if (publishedLessons.length === 0) {
    return false;
  }

  const completedCount = await tx.progress.count({
    where: {
      userId,
      completed: true,
      lessonId: { in: publishedLessons.map((l) => l.id) },
    },
  });

  return completedCount === publishedLessons.length;
}

/**
 * Automatically generates a course completion certificate for a learner.
 * Enforces enrollment, completion of all published lessons, and uniqueness.
 */
export async function generateCertificate(courseSlug: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    // Resolve course slug
    const course = await tx.course.findUnique({
      where: { slug: courseSlug },
      select: { id: true },
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
      select: { id: true },
    });

    if (!enrollment) {
      throw new ValidationError(
        'You can only generate certificates for courses you are enrolled in.',
      );
    }

    // Verify user does not already own a certificate
    const existingCertificate = await tx.certificate.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
      select: { id: true },
    });

    if (existingCertificate) {
      throw new ValidationError('Certificate already issued for this course.');
    }

    // Verify course completion
    const isCompleted = await verifyCourseCompletion(tx, course.id, userId);
    if (!isCompleted) {
      throw new ValidationError(
        'You must complete all published lessons in this course to generate a certificate.',
      );
    }

    // Generate unique human-readable certificateNumber
    let isUnique = false;
    let certificateNumber = '';
    while (!isUnique) {
      const uuid = crypto.randomUUID();
      const parts = uuid.split('-');
      const shortUuid = parts[0] ? parts[0].toUpperCase() : 'UNKNOWN';
      certificateNumber = `CERT-${shortUuid}`;
      const duplicate = await tx.certificate.findUnique({
        where: { certificateNumber },
        select: { id: true },
      });
      if (!duplicate) {
        isUnique = true;
      }
    }

    // Create and return certificate
    return tx.certificate.create({
      data: {
        userId,
        courseId: course.id,
        certificateNumber,
      },
      select: certificateSelect,
    });
  });
}

/**
 * Returns all learner certificates ordered by issuedAt DESC, createdAt DESC.
 */
export async function getMyCertificates(userId: string) {
  return prisma.certificate.findMany({
    where: { userId },
    orderBy: [{ issuedAt: 'desc' }, { createdAt: 'desc' }],
    select: {
      certificateNumber: true,
      issuedAt: true,
      course: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
  });
}

/**
 * Returns the learner's certificate for that course, or null if not found.
 */
export async function getCertificate(courseSlug: string, userId: string) {
  // Resolve course slug
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true },
  });

  if (!course) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  const certificate = await prisma.certificate.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
    select: certificateSelect,
  });

  return certificate; // Returns null if not found
}
