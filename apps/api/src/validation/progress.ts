import { z } from 'zod';

export const getLessonProgressSchema = z
  .object({
    lessonId: z.string().uuid('Invalid lesson ID format. Expected a valid UUID.'),
  })
  .strict();

export type GetLessonProgressInput = z.infer<typeof getLessonProgressSchema>;

export const updateLessonProgressParamsSchema = z
  .object({
    lessonId: z.string().uuid('Invalid lesson ID format. Expected a valid UUID.'),
  })
  .strict();

export type UpdateLessonProgressParamsInput = z.infer<typeof updateLessonProgressParamsSchema>;

export const updateLessonProgressBodySchema = z
  .object({
    completed: z.boolean({
      message: 'Completed must be a boolean',
    }),
  })
  .strict();

export type UpdateLessonProgressBodyInput = z.infer<typeof updateLessonProgressBodySchema>;
