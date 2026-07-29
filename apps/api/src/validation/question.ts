import { z } from 'zod';

export const createQuestionSchema = z
  .object({
    quizId: z.string().uuid('Invalid quiz ID format. Expected a valid UUID.'),
    question: z.string().trim().min(1, 'Question text is required'),
    explanation: z.string().trim().nullable().optional(),
    order: z.number().int().min(1, 'Order must be an integer greater than or equal to 1'),
    points: z.number().int().min(1, 'Points must be at least 1'),
  })
  .strict();

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;

export const updateQuestionSchema = z
  .object({
    question: z.string().trim().min(1, 'Question text is required').optional(),
    explanation: z.string().trim().nullable().optional(),
    order: z
      .number()
      .int()
      .min(1, 'Order must be an integer greater than or equal to 1')
      .optional(),
    points: z.number().int().min(1, 'Points must be at least 1').optional(),
  })
  .strict();

export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;

export const questionIdParamSchema = z
  .object({
    id: z.string().uuid('Invalid question ID format. Expected a valid UUID.'),
  })
  .strict();

export type QuestionIdParamInput = z.infer<typeof questionIdParamSchema>;
