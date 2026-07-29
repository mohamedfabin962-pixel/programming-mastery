import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

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

/**
 * Submits an answer for a specific question in an in-progress quiz attempt.
 * Verifies attempt ownership, in-progress state, question association, and choice correctness.
 */
export async function submitAnswer(
  attemptId: string,
  userId: string,
  questionId: string,
  choiceId: string,
) {
  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
  });

  if (!attempt || attempt.userId !== userId) {
    throw new NotFoundError(`Quiz attempt with ID "${attemptId}" not found`);
  }

  if (attempt.status !== 'IN_PROGRESS') {
    throw new ValidationError(
      `Cannot submit answer. Quiz attempt status is ${attempt.status}. Only IN_PROGRESS attempts can be modified.`,
    );
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: {
      choices: true,
    },
  });

  if (!question || question.quizId !== attempt.quizId) {
    throw new NotFoundError(`Question with ID "${questionId}" not found in this quiz`);
  }

  const choice = question.choices.find((c) => c.id === choiceId);
  if (!choice) {
    throw new NotFoundError(`Choice with ID "${choiceId}" not found for this question`);
  }

  const isCorrect = choice.isCorrect;
  const earnedPoints = isCorrect ? question.points : 0;

  return prisma.questionAnswer.upsert({
    where: {
      attemptId_questionId: {
        attemptId,
        questionId,
      },
    },
    create: {
      attemptId,
      questionId,
      choiceId,
      isCorrect,
      earnedPoints,
    },
    update: {
      choiceId,
      isCorrect,
      earnedPoints,
    },
  });
}

/**
 * Completes an in-progress quiz attempt.
 * Verifies that all questions in the quiz have answers.
 * Calculates totals, score, and grade percentages.
 */
export async function completeAttempt(attemptId: string, userId: string) {
  return prisma.$transaction(async (tx) => {
    const attempt = await tx.quizAttempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt || attempt.userId !== userId) {
      throw new NotFoundError(`Quiz attempt with ID "${attemptId}" not found`);
    }

    if (attempt.status !== 'IN_PROGRESS') {
      throw new ValidationError(
        `Cannot complete attempt. Quiz attempt status is ${attempt.status}. Only IN_PROGRESS attempts can be completed.`,
      );
    }

    const quizQuestions = await tx.question.findMany({
      where: { quizId: attempt.quizId },
    });

    const answers = await tx.questionAnswer.findMany({
      where: { attemptId },
    });

    const unansweredQuestions = quizQuestions.filter(
      (q) => !answers.some((a) => a.questionId === q.id),
    );

    if (unansweredQuestions.length > 0) {
      throw new ValidationError(
        `Cannot complete quiz attempt. There are ${unansweredQuestions.length} unanswered questions.`,
      );
    }

    const totalQuestions = quizQuestions.length;
    const correctAnswers = answers.filter((a) => a.isCorrect === true).length;
    const totalScore = answers.reduce((sum, a) => sum + (a.earnedPoints ?? 0), 0);
    const maximumScore = quizQuestions.reduce((sum, q) => sum + q.points, 0);
    const percentage = maximumScore > 0 ? (totalScore / maximumScore) * 100 : 0;

    const updatedAttempt = await tx.quizAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
      include: metadataInclude,
    });

    return {
      attempt: updatedAttempt,
      summary: {
        totalQuestions,
        correctAnswers,
        totalScore,
        maximumScore,
        percentage,
      },
    };
  });
}
