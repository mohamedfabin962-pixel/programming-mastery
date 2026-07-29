import { z } from 'zod';

export const createChoiceSchema = z
  .object({
    questionId: z.string().uuid('Invalid question ID format. Expected a valid UUID.'),
    text: z.string().trim().min(1, 'Choice text is required'),
    isCorrect: z.boolean({
      message: 'isCorrect must be a boolean',
    }),
    order: z.number().int().min(1, 'Order must be an integer greater than or equal to 1'),
  })
  .strict();

export type CreateChoiceInput = z.infer<typeof createChoiceSchema>;

export const updateChoiceSchema = z
  .object({
    text: z.string().trim().min(1, 'Choice text is required').optional(),
    isCorrect: z
      .boolean({
        message: 'isCorrect must be a boolean',
      })
      .optional(),
    order: z
      .number()
      .int()
      .min(1, 'Order must be an integer greater than or equal to 1')
      .optional(),
  })
  .strict();

export type UpdateChoiceInput = z.infer<typeof updateChoiceSchema>;

export const choiceIdParamSchema = z
  .object({
    id: z.string().uuid('Invalid choice ID format. Expected a valid UUID.'),
  })
  .strict();

export type ChoiceIdParamInput = z.infer<typeof choiceIdParamSchema>;
