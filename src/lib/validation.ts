import { z } from 'zod';

export const upsertAdminSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1).max(256),
  email: z.string().email().min(1).max(256),
  password: z.string().max(256).optional(),
});

export const loginSchema = z.object({
  email: z.string().email().min(1).max(256),
  password: z.string().max(256),
});

export const upsertProductSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1).max(256),
  description: z.string().min(1).max(256),
  price: z.coerce
    .number()
    .positive()
    .default('' as unknown as number),
  quantity: z.coerce
    .number()
    .positive()
    .default('' as unknown as number),
});
