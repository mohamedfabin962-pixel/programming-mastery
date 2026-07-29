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

export const attemptIdParamSchema = z
  .object({
    attemptId: z.string().uuid('Invalid quiz attempt ID format. Expected a valid UUID.'),
  })
  .strict();

export type AttemptIdParamInput = z.infer<typeof attemptIdParamSchema>;

export const submitAnswerSchema = z
  .object({
    questionId: z.string().uuid('Invalid question ID format. Expected a valid UUID.'),
    choiceId: z.string().uuid('Invalid choice ID format. Expected a valid UUID.'),
  })
  .strict();

export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>;
