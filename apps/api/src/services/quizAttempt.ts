import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';

const metadataInclude = {
  quiz: {
    select: {
      id: true,
      title: true,
      lesson: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  },
};

/**
 * Starts a new quiz attempt or returns an existing IN_PROGRESS attempt.
 * Executes in a transaction-safe interactive transaction with Serializable isolation level.
 */
export async function startQuizAttempt(quizId: string, userId: string) {
  return prisma.$transaction(
    async (tx) => {
      // Verify quiz exists and is published, and that the parent lesson is published
      const quiz = await tx.quiz.findUnique({
        where: { id: quizId },
        include: {
          lesson: true,
        },
      });

      if (!quiz || !quiz.isPublished || !quiz.lesson.isPublished) {
        throw new NotFoundError('Quiz not found or not published');
      }

      // Check for an existing IN_PROGRESS attempt
      const existing = await tx.quizAttempt.findFirst({
        where: {
          userId,
          quizId,
          status: 'IN_PROGRESS',
        },
        include: metadataInclude,
      });

      if (existing) {
        return existing;
      }

      // Create new quiz attempt
      return tx.quizAttempt.create({
        data: {
          userId,
          quizId,
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        },
        include: metadataInclude,
      });
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    },
  );
}

/**
 * Retrieves a single quiz attempt by ID.
 * Throws NotFoundError if it does not exist or if it belongs to another user.
 */
export async function getAttempt(id: string, userId: string) {
  const attempt = await prisma.quizAttempt.findUnique({
    where: { id },
    include: metadataInclude,
  });

  if (!attempt || attempt.userId !== userId) {
    throw new NotFoundError(`Quiz attempt with ID "${id}" not found`);
  }

  return attempt;
}

/**
 * Retrieves all attempts for the authenticated user, sorted newest first.
 */
export async function getMyAttempts(userId: string) {
  return prisma.quizAttempt.findMany({
    where: { userId },
    include: metadataInclude,
    orderBy: {
      createdAt: 'desc',
    },
  });
}
