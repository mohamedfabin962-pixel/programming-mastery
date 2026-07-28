import { z } from 'zod';

export const getLessonsParamsSchema = z
  .object({
    courseSlug: z
      .string()
      .trim()
      .min(1, 'Course slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid course slug format'),
  })
  .strict();

export type GetLessonsParamsInput = z.infer<typeof getLessonsParamsSchema>;

export const getLessonBySlugParamsSchema = z
  .object({
    courseSlug: z
      .string()
      .trim()
      .min(1, 'Course slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid course slug format'),
    lessonSlug: z
      .string()
      .trim()
      .min(1, 'Lesson slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid lesson slug format'),
  })
  .strict();

export type GetLessonBySlugParamsInput = z.infer<typeof getLessonBySlugParamsSchema>;
