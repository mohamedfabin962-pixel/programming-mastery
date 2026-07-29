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

export const reviewIdParamSchema = z
  .object({
    reviewId: z.string().uuid('reviewId must be a valid UUID.'),
  })
  .strict();

export const updateReviewSchema = z
  .object({
    rating: z
      .number()
      .int()
      .min(1, 'Rating must be at least 1.')
      .max(5, 'Rating must be at most 5.')
      .optional(),
    review: z
      .string()
      .trim()
      .max(2000, 'Review text must not exceed 2000 characters.')
      .optional()
      .nullable(),
  })
  .strict()
  .refine((data) => data.rating !== undefined || data.review !== undefined, {
    message: 'At least one of rating or review must be provided.',
  });

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
