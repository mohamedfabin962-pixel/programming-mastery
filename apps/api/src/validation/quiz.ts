import { z } from 'zod';

export const getLessonQuizzesParamsSchema = z
  .object({
    lessonSlug: z
      .string()
      .trim()
      .min(1, 'Lesson slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid lesson slug format'),
  })
  .strict();

export type GetLessonQuizzesParamsInput = z.infer<typeof getLessonQuizzesParamsSchema>;

export const getQuizByIdParamsSchema = z
  .object({
    id: z.string().uuid('Invalid quiz ID format. Expected a valid UUID.'),
  })
  .strict();

export type GetQuizByIdParamsInput = z.infer<typeof getQuizByIdParamsSchema>;

export const createQuizSchema = z
  .object({
    lessonSlug: z
      .string()
      .trim()
      .min(1, 'Lesson slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid lesson slug format'),
    title: z.string().trim().min(3, 'Title must be at least 3 characters'),
    description: z.string().trim().nullable().optional(),
  })
  .strict();

export type CreateQuizInput = z.infer<typeof createQuizSchema>;

export const updateQuizSchema = z
  .object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters').optional(),
    description: z.string().trim().nullable().optional(),
  })
  .strict();

export type UpdateQuizInput = z.infer<typeof updateQuizSchema>;

export const quizIdParamSchema = z
  .object({
    id: z.string().uuid('Invalid quiz ID format. Expected a valid UUID.'),
  })
  .strict();
