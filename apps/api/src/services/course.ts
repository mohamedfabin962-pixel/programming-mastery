import { prisma } from '../lib/prisma.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';
import { CreateCourseInput, UpdateCourseInput } from '../validation/course.js';

/**
 * Retrieves all published courses from the database, ordered by creation date descending.
 */
export async function getCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Retrieves a single published course by its slug.
 * Throws a NotFoundError if the course doesn't exist or is not published.
 */
export async function getCourseBySlug(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course || !course.isPublished) {
    throw new NotFoundError(`Course with slug "${slug}" not found`);
  }

  return course;
}

/**
 * Creates a new course.
 * Throws a ConflictError if a course with the same slug already exists.
 * All new courses are created with isPublished = false.
 */
export async function createCourse(data: CreateCourseInput) {
  const existing = await prisma.course.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new ConflictError(`Course with slug "${data.slug}" already exists`);
  }

  return prisma.course.create({
    data: {
      ...data,
      isPublished: false,
    },
  });
}

/**
 * Updates an existing course by its ID.
 * Throws a NotFoundError if the course does not exist.
 */
export async function updateCourse(id: string, data: UpdateCourseInput) {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw new NotFoundError(`Course with ID "${id}" not found`);
  }

  return prisma.course.update({
    where: { id },
    data,
  });
}

/**
 * Deletes an existing course by its ID.
 * Throws a NotFoundError if the course does not exist.
 */
export async function deleteCourse(id: string) {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw new NotFoundError(`Course with ID "${id}" not found`);
  }

  return prisma.course.delete({
    where: { id },
  });
}
