import { z } from 'zod';

export const getCourseBySlugSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1, 'Slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  })
  .strict();

export type GetCourseBySlugInput = z.infer<typeof getCourseBySlugSchema>;
