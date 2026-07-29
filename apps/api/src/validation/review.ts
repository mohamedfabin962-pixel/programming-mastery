import { z } from 'zod';

export const createReviewSchema = z
  .object({
    courseSlug: z.string().trim().min(1, 'Course slug is required.'),
    rating: z
      .number()
      .int()
      .min(1, 'Rating must be at least 1.')
      .max(5, 'Rating must be at most 5.'),
    review: z
      .string()
      .trim()
      .max(2000, 'Review text must not exceed 2000 characters.')
      .optional()
      .nullable(),
  })
  .strict();

export const getCourseReviewsSchema = z
  .object({
    courseSlug: z.string().trim().min(1, 'Course slug is required.'),
  })
  .strict();

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
