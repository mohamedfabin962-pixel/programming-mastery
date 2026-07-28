import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z.string().trim().toLowerCase().email('Invalid email address'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters'),
  })
  .strict();

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z
  .object({
    email: z.string().trim().toLowerCase().email('Invalid email address'),
    password: z.string().trim().min(1, 'Password is required'),
  })
  .strict();

export type SignInInput = z.infer<typeof signInSchema>;
