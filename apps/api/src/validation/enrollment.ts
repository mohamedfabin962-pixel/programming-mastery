import { z } from 'zod';

export const enrollInCourseSchema = z
  .object({
    courseSlug: z.string().trim().min(1, 'Course slug is required.'),
  })
  .strict();

export type EnrollInCourseInput = z.infer<typeof enrollInCourseSchema>;
