import { z } from 'zod';

export const certificateParamsSchema = z
  .object({
    courseSlug: z.string().trim().min(1, 'Course slug is required.'),
  })
  .strict();
