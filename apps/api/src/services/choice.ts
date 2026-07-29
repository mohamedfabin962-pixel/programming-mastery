import { prisma } from '../lib/prisma.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';
import { CreateChoiceInput, UpdateChoiceInput } from '../validation/choice.js';

/**
 * Creates a new choice for a question.
 * Throws NotFoundError if the question does not exist.
 * Throws ConflictError if a correct choice already exists and isCorrect: true.
 * Throws ConflictError if the choice order clashes.
 */
export async function createChoice(data: CreateChoiceInput) {
  const question = await prisma.question.findUnique({
    where: { id: data.questionId },
  });

  if (!question) {
    throw new NotFoundError(`Question with ID "${data.questionId}" not found`);
  }

  if (data.isCorrect) {
    const existingCorrect = await prisma.choice.findFirst({
      where: {
        questionId: data.questionId,
        isCorrect: true,
      },
    });

    if (existingCorrect) {
      throw new ConflictError('A correct choice already exists for this question');
    }
  }

  const existingOrder = await prisma.choice.findUnique({
    where: {
      questionId_order: {
        questionId: data.questionId,
        order: data.order,
      },
    },
  });

  if (existingOrder) {
    throw new ConflictError(`Choice with order ${data.order} already exists for this question`);
  }

  return prisma.choice.create({
    data: {
      questionId: data.questionId,
      text: data.text,
      isCorrect: data.isCorrect,
      order: data.order,
    },
  });
}

/**
 * Updates a choice.
 * Throws NotFoundError if the choice does not exist.
 * Throws ConflictError if order changes and clashes.
 * Throws ConflictError if isCorrect becomes true and another correct choice exists.
 */
export async function updateChoice(id: string, data: UpdateChoiceInput) {
  const choice = await prisma.choice.findUnique({
    where: { id },
  });

  if (!choice) {
    throw new NotFoundError(`Choice with ID "${id}" not found`);
  }

  if (data.isCorrect) {
    const existingCorrect = await prisma.choice.findFirst({
      where: {
        questionId: choice.questionId,
        isCorrect: true,
        id: { not: id },
      },
    });

    if (existingCorrect) {
      throw new ConflictError('A correct choice already exists for this question');
    }
  }

  if (data.order !== undefined && data.order !== choice.order) {
    const existingOrder = await prisma.choice.findUnique({
      where: {
        questionId_order: {
          questionId: choice.questionId,
          order: data.order,
        },
      },
    });

    if (existingOrder) {
      throw new ConflictError(`Choice with order ${data.order} already exists for this question`);
    }
  }

  return prisma.choice.update({
    where: { id },
    data: {
      text: data.text,
      isCorrect: data.isCorrect,
      order: data.order,
    },
  });
}

/**
 * Deletes a choice.
 * Throws NotFoundError if the choice does not exist.
 */
export async function deleteChoice(id: string) {
  const choice = await prisma.choice.findUnique({
    where: { id },
  });

  if (!choice) {
    throw new NotFoundError(`Choice with ID "${id}" not found`);
  }

  return prisma.choice.delete({
    where: { id },
  });
}
