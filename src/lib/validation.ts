import { z } from 'zod';

export const upsertAdminSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.coerce.string().min(1).max(256),
  email: z.coerce.string().email().min(1).max(256),
  password: z.coerce.string().min(1).max(256),
});

export const loginSchema = upsertAdminSchema.pick({
  email: true,
  password: true,
});
