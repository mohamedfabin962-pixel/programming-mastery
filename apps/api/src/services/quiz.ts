import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';

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
