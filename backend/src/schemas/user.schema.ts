import z from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
});

export const signinSchema = z.object({
  email: z.email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
});