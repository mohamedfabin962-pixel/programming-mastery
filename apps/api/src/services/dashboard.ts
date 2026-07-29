import { prisma } from '../lib/prisma.js';

export const courseMetadataSelect = {
  id: true,
  slug: true,
  title: true,
  thumbnail: true,
  difficulty: true,
  languageCode: true,
};

/**
 * Retrieves the learner's dashboard summary numbers.
 * Executes independent queries concurrently using Promise.all() to minimize latency.
 * Categorizes active and completed courses based on published lesson progress.
 */
export async function getDashboardSummary(userId: string) {
  const [enrollments, completedProgress, completedQuizzes] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId },
      select: {
        courseId: true,
        course: {
          select: {
            lessons: {
              where: { isPublished: true },
              select: {
                id: true,
              },
            },
          },
        },
      },
    }),
    prisma.progress.findMany({
      where: {
        userId,
        completed: true,
      },
      select: {
        lessonId: true,
      },
    }),
    prisma.quizAttempt.count({
      where: {
        userId,
        status: 'COMPLETED',
      },
    }),
  ]);

  const completedLessonIds = new Set(completedProgress.map((p) => p.lessonId));
  let completedCourses = 0;
  let activeCourses = 0;

  for (const enrollment of enrollments) {
    const publishedLessons = enrollment.course.lessons;
    if (publishedLessons.length === 0) {
      continue;
    }

    const completedCount = publishedLessons.filter((l) => completedLessonIds.has(l.id)).length;

    if (completedCount === publishedLessons.length) {
      completedCourses++;
    } else if (completedCount > 0) {
      activeCourses++;
    }
  }

  return {
    enrolledCourses: enrollments.length,
    activeCourses,
    completedCourses,
    completedLessons: completedProgress.length,
    completedQuizzes,
  };
}

/**
 * Retrieves the learner's most recently accessed enrollment to continue learning.
 * Includes course metadata and the latest completed lesson (if any).
 * Returns null if the learner is not enrolled in any courses.
 */
export async function getContinueLearning(userId: string) {
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId },
    orderBy: [{ lastAccessedAt: 'desc' }, { enrolledAt: 'desc' }],
    select: {
      id: true,
      userId: true,
      courseId: true,
      lastAccessedAt: true,
      enrolledAt: true,
      createdAt: true,
      updatedAt: true,
      course: {
        select: {
          ...courseMetadataSelect,
          lessons: {
            where: { isPublished: true },
            select: {
              id: true,
              title: true,
              order: true,
            },
          },
        },
      },
    },
  });

  if (!enrollment) {
    return null;
  }

  const lessonIds = enrollment.course.lessons.map((l) => l.id);
  let latestCompletedLesson = null;

  if (lessonIds.length > 0) {
    const latestProgress = await prisma.progress.findFirst({
      where: {
        userId,
        lessonId: { in: lessonIds },
        completed: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
      select: {
        completedAt: true,
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (latestProgress) {
      latestCompletedLesson = {
        id: latestProgress.lesson.id,
        title: latestProgress.lesson.title,
        completedAt: latestProgress.completedAt,
      };
    }
  }

  const courseMetadata = {
    id: enrollment.course.id,
    slug: enrollment.course.slug,
    title: enrollment.course.title,
    thumbnail: enrollment.course.thumbnail,
    difficulty: enrollment.course.difficulty,
    languageCode: enrollment.course.languageCode,
  };

  return {
    id: enrollment.id,
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    lastAccessedAt: enrollment.lastAccessedAt,
    enrolledAt: enrollment.enrolledAt,
    createdAt: enrollment.createdAt,
    updatedAt: enrollment.updatedAt,
    course: courseMetadata,
    latestCompletedLesson,
  };
}

/**
 * Retrieves the latest 10 completed quiz attempts for the learner.
 * Avoids N+1 query patterns by fetching quiz details and earned answers concurrently.
 * Returns an empty array if no completed attempts exist.
 */
export async function getRecentQuizAttempts(userId: string) {
  const completedAttempts = await prisma.quizAttempt.findMany({
    where: {
      userId,
      status: 'COMPLETED',
    },
    orderBy: {
      completedAt: 'desc',
    },
    take: 10,
    select: {
      completedAt: true,
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
          questions: {
            select: {
              points: true,
            },
          },
        },
      },
      answers: {
        select: {
          earnedPoints: true,
        },
      },
    },
  });

  return completedAttempts.map((attempt) => {
    const score = attempt.answers.reduce((sum, a) => sum + (a.earnedPoints ?? 0), 0);
    const maximumScore = attempt.quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = maximumScore > 0 ? (score / maximumScore) * 100 : 0;

    return {
      quiz: {
        id: attempt.quiz.id,
        title: attempt.quiz.title,
      },
      lesson: {
        id: attempt.quiz.lesson.id,
        title: attempt.quiz.lesson.title,
      },
      attempt: {
        score,
        maximumScore,
        percentage,
        completedAt: attempt.completedAt!,
      },
    };
  });
}
