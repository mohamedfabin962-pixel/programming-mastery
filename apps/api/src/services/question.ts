import { prisma } from '../lib/prisma.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';
import { CreateQuestionInput, UpdateQuestionInput } from '../validation/question.js';

/**
 * Creates a new question for a quiz.
 * Throws NotFoundError if the quiz does not exist.
 * Throws ConflictError if the question order clashes.
 */
export async function createQuestion(data: CreateQuestionInput) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: data.quizId },
  });

  if (!quiz) {
    throw new NotFoundError(`Quiz with ID "${data.quizId}" not found`);
  }

  const existing = await prisma.question.findUnique({
    where: {
      quizId_order: {
        quizId: data.quizId,
        order: data.order,
      },
    },
  });

  if (existing) {
    throw new ConflictError(`Question with order ${data.order} already exists in this quiz`);
  }

  return prisma.question.create({
    data: {
      quizId: data.quizId,
      question: data.question,
      explanation: data.explanation,
      order: data.order,
      points: data.points,
    },
  });
}

/**
 * Updates a question.
 * Throws NotFoundError if the question does not exist.
 * Throws ConflictError if order changes and clashes.
 */
export async function updateQuestion(id: string, data: UpdateQuestionInput) {
  const question = await prisma.question.findUnique({
    where: { id },
  });

  if (!question) {
    throw new NotFoundError(`Question with ID "${id}" not found`);
  }

  if (data.order !== undefined && data.order !== question.order) {
    const existing = await prisma.question.findUnique({
      where: {
        quizId_order: {
          quizId: question.quizId,
          order: data.order,
        },
      },
    });

    if (existing) {
      throw new ConflictError(`Question with order ${data.order} already exists in this quiz`);
    }
  }

  return prisma.question.update({
    where: { id },
    data: {
      question: data.question,
      explanation: data.explanation,
      order: data.order,
      points: data.points,
    },
  });
}

/**
 * Deletes a question.
 * Throws NotFoundError if the question does not exist.
 */
export async function deleteQuestion(id: string) {
  const question = await prisma.question.findUnique({
    where: { id },
  });

  if (!question) {
    throw new NotFoundError(`Question with ID "${id}" not found`);
  }

  return prisma.question.delete({
    where: { id },
  });
}
