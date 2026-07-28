import { z } from 'zod';
import { Difficulty } from '@prisma/client';

export const getCourseBySlugSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1, 'Slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  })
  .strict();

export type GetCourseBySlugInput = z.infer<typeof getCourseBySlugSchema>;

export const createCourseSchema = z
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
    difficulty: z.nativeEnum(Difficulty, {
      message: 'Difficulty must be BEGINNER, INTERMEDIATE, or ADVANCED',
    }),
    languageCode: z.string().trim().min(2, 'Language code must be at least 2 characters'),
    thumbnail: z.string().trim().url('Thumbnail must be a valid URL').optional().nullable(),
  })
  .strict();

export type CreateCourseInput = z.infer<typeof createCourseSchema>;

export const updateCourseSchema = z
  .object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters').optional(),
    description: z.string().trim().min(1, 'Description is required').optional(),
    difficulty: z.nativeEnum(Difficulty).optional(),
    languageCode: z
      .string()
      .trim()
      .min(2, 'Language code must be at least 2 characters')
      .optional(),
    thumbnail: z.string().trim().url('Thumbnail must be a valid URL').optional().nullable(),
  })
  .strict();

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;

export const deleteCourseSchema = z
  .object({
    id: z.string().uuid('Invalid course ID format. Expected a valid UUID.'),
  })
  .strict();

export type DeleteCourseInput = z.infer<typeof deleteCourseSchema>;

export const updateCourseParamsSchema = z
  .object({
    id: z.string().uuid('Invalid course ID format. Expected a valid UUID.'),
  })
  .strict();
