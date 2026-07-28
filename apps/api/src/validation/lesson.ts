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

export const createLessonSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Slug is required')
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must contain only lowercase letters, numbers, and hyphens',
      ),
    title: z.string().trim().min(3, 'Title must be at least 3 characters'),
    description: z.string().trim().min(1, 'Description is required'),
    content: z.string().trim().min(1, 'Content is required'),
    order: z.number().int().gt(0, 'Order must be an integer greater than 0'),
    durationMinutes: z.number().int().gt(0, 'Duration must be greater than 0'),
    thumbnail: z.string().trim().url('Thumbnail must be a valid URL').optional().nullable(),
  })
  .strict();

export type CreateLessonInput = z.infer<typeof createLessonSchema>;

export const updateLessonSchema = z
  .object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters').optional(),
    description: z.string().trim().min(1, 'Description is required').optional(),
    content: z.string().trim().min(1, 'Content is required').optional(),
    order: z.number().int().gt(0, 'Order must be an integer greater than 0').optional(),
    durationMinutes: z.number().int().gt(0, 'Duration must be greater than 0').optional(),
    thumbnail: z.string().trim().url('Thumbnail must be a valid URL').optional().nullable(),
  })
  .strict();

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;

export const deleteLessonSchema = z
  .object({
    id: z.string().uuid('Invalid lesson ID format. Expected a valid UUID.'),
  })
  .strict();

export type DeleteLessonInput = z.infer<typeof deleteLessonSchema>;

export const updateLessonParamsSchema = z
  .object({
    id: z.string().uuid('Invalid lesson ID format. Expected a valid UUID.'),
  })
  .strict();
