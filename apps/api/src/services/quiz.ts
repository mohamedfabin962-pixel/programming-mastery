import { prisma } from '../lib/prisma.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';
import { CreateQuizInput, UpdateQuizInput } from '../validation/quiz.js';

/**
 * Retrieves all published quizzes for a published lesson.
 * Throws NotFoundError if the lesson doesn't exist or is not published.
 */
export async function getLessonQuizzes(lessonSlug: string) {
  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      isPublished: true,
    },
  });

  if (!lesson) {
    throw new NotFoundError(`Lesson with slug "${lessonSlug}" not found`);
  }

  const quizzes = await prisma.quiz.findMany({
    where: {
      lessonId: lesson.id,
      isPublished: true,
    },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
    orderBy: {
      title: 'asc',
    },
  });

  return quizzes.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    questionCount: q._count.questions,
  }));
}

/**
 * Retrieves a single published quiz by ID.
 * Throws NotFoundError if the quiz does not exist, is not published,
 * or belongs to a lesson that is not published.
 */
export async function getQuizById(id: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      lesson: true,
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  if (!quiz || !quiz.isPublished || !quiz.lesson.isPublished) {
    throw new NotFoundError(`Quiz with ID "${id}" not found`);
  }

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    questionCount: quiz._count.questions,
  };
}

/**
 * Creates a new quiz.
 * Throws NotFoundError if the parent lesson does not exist.
 * Throws ConflictError if a quiz with the same title already exists in that lesson.
 * Newly created quizzes are always unpublished.
 */
export async function createQuiz(data: CreateQuizInput) {
  const lesson = await prisma.lesson.findFirst({
    where: { slug: data.lessonSlug },
  });

  if (!lesson) {
    throw new NotFoundError(`Lesson with slug "${data.lessonSlug}" not found`);
  }

  const existing = await prisma.quiz.findUnique({
    where: {
      lessonId_title: {
        lessonId: lesson.id,
        title: data.title,
      },
    },
  });

  if (existing) {
    throw new ConflictError(`Quiz with title "${data.title}" already exists in this lesson`);
  }

  const quiz = await prisma.quiz.create({
    data: {
      lessonId: lesson.id,
      title: data.title,
      description: data.description,
      isPublished: false,
    },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    questionCount: quiz._count.questions,
  };
}

/**
 * Updates a quiz's title and/or description.
 * Throws NotFoundError if the quiz does not exist.
 * Throws ConflictError if title changes and clashes with another quiz in the same lesson.
 */
export async function updateQuiz(id: string, data: UpdateQuizInput) {
  const quiz = await prisma.quiz.findUnique({
    where: { id },
  });

  if (!quiz) {
    throw new NotFoundError(`Quiz with ID "${id}" not found`);
  }

  if (data.title && data.title !== quiz.title) {
    const existing = await prisma.quiz.findUnique({
      where: {
        lessonId_title: {
          lessonId: quiz.lessonId,
          title: data.title,
        },
      },
    });

    if (existing) {
      throw new ConflictError(`Quiz with title "${data.title}" already exists in this lesson`);
    }
  }

  const updated = await prisma.quiz.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
    },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  return {
    id: updated.id,
    title: updated.title,
    description: updated.description,
    questionCount: updated._count.questions,
  };
}

/**
 * Deletes a quiz by ID.
 * Throws NotFoundError if the quiz does not exist.
 */
export async function deleteQuiz(id: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { id },
  });

  if (!quiz) {
    throw new NotFoundError(`Quiz with ID "${id}" not found`);
  }

  return prisma.quiz.delete({
    where: { id },
  });
}
