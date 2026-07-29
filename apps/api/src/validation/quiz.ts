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
