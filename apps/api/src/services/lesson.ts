import { prisma } from '../lib/prisma.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';
import { CreateLessonInput, UpdateLessonInput } from '../validation/lesson.js';

/**
 * Retrieves all published lessons for a published course.
 * Throws a NotFoundError if the course doesn't exist or is not published.
 */
export async function getLessons(courseSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course || !course.isPublished) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  return prisma.lesson.findMany({
    where: {
      courseId: course.id,
      isPublished: true,
    },
    orderBy: {
      order: 'asc',
    },
  });
}

/**
 * Retrieves a single published lesson by its slug and parent course slug.
 * Throws a NotFoundError if either the course or the lesson is not found or is not published.
 */
export async function getLesson(courseSlug: string, lessonSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course || !course.isPublished) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  const lesson = await prisma.lesson.findUnique({
    where: {
      courseId_slug: {
        courseId: course.id,
        slug: lessonSlug,
      },
    },
  });

  if (!lesson || !lesson.isPublished) {
    throw new NotFoundError(`Lesson with slug "${lessonSlug}" not found`);
  }

  return lesson;
}

/**
 * Creates a new lesson.
 * Throws NotFoundError if the course Slug doesn't exist.
 * Throws ConflictError if slug or order are duplicated inside the course.
 * All new lessons are created with isPublished = false.
 */
export async function createLesson(courseSlug: string, data: CreateLessonInput) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
  });

  if (!course) {
    throw new NotFoundError(`Course with slug "${courseSlug}" not found`);
  }

  const existingSlug = await prisma.lesson.findUnique({
    where: {
      courseId_slug: {
        courseId: course.id,
        slug: data.slug,
      },
    },
  });

  if (existingSlug) {
    throw new ConflictError(`Lesson with slug "${data.slug}" already exists in this course`);
  }

  const existingOrder = await prisma.lesson.findUnique({
    where: {
      courseId_order: {
        courseId: course.id,
        order: data.order,
      },
    },
  });

  if (existingOrder) {
    throw new ConflictError(`Lesson with order ${data.order} already exists in this course`);
  }

  return prisma.lesson.create({
    data: {
      ...data,
      courseId: course.id,
      isPublished: false,
    },
  });
}

/**
 * Updates an existing lesson by its ID.
 * Throws a NotFoundError if the lesson does not exist.
 * Throws a ConflictError if order changes and is already taken in the course.
 */
export async function updateLesson(id: string, data: UpdateLessonInput) {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
  });

  if (!lesson) {
    throw new NotFoundError(`Lesson with ID "${id}" not found`);
  }

  if (data.order !== undefined && data.order !== lesson.order) {
    const existingOrder = await prisma.lesson.findUnique({
      where: {
        courseId_order: {
          courseId: lesson.courseId,
          order: data.order,
        },
      },
    });

    if (existingOrder) {
      throw new ConflictError(`Lesson with order ${data.order} already exists in this course`);
    }
  }

  return prisma.lesson.update({
    where: { id },
    data,
  });
}

/**
 * Deletes an existing lesson by its ID.
 * Throws a NotFoundError if the lesson does not exist.
 */
export async function deleteLesson(id: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
  });

  if (!lesson) {
    throw new NotFoundError(`Lesson with ID "${id}" not found`);
  }

  return prisma.lesson.delete({
    where: { id },
  });
}
