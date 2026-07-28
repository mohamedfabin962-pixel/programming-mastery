import { z } from 'zod';

export const getLessonProgressSchema = z
  .object({
    lessonId: z.string().uuid('Invalid lesson ID format. Expected a valid UUID.'),
  })
  .strict();

export type GetLessonProgressInput = z.infer<typeof getLessonProgressSchema>;
