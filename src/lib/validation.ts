import { z } from 'zod';

export const upsertAdminSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(256),
  email: z.string().email().min(1).max(256),
  password: z.string().max(256).optional(),
});

export const loginSchema = z.object({
  email: z.string().email().min(1).max(256),
  password: z.string().max(256),
});
