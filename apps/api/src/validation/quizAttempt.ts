import { z } from 'zod';

export const startQuizAttemptSchema = z
  .object({
    quizId: z.string().uuid('Invalid quiz ID format. Expected a valid UUID.'),
  })
  .strict();

export type StartQuizAttemptInput = z.infer<typeof startQuizAttemptSchema>;

export const quizAttemptIdParamSchema = z
  .object({
    id: z.string().uuid('Invalid quiz attempt ID format. Expected a valid UUID.'),
  })
  .strict();

export type QuizAttemptIdParamInput = z.infer<typeof quizAttemptIdParamSchema>;
