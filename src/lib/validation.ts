import { coerce, custom, object, string } from 'zod';

export const upsertAdminSchema = object({
  id: coerce.number().optional(),
  name: string().min(1).max(256).trim(),
  email: string().email().min(1).max(256).trim(),
  password: string().max(256).trim().optional(),
});

export const loginSchema = object({
  email: string().email().min(1).max(256).trim(),
  password: string().max(256).trim(),
});

export const upsertProductSchema = object({
  id: coerce.number().optional(),
  name: string().min(1).max(256).trim(),
  description: string().min(1).max(256).trim(),
  image: custom(),
  categoryId: coerce
    .number()
    .positive('Required')
    .default('' as unknown as number),
  price: coerce
    .number()
    .positive()
    .default('' as unknown as number),
  quantity: coerce
    .number()
    .positive()
    .default('' as unknown as number),
});

export const upsertCategorySchema = object({
  id: coerce.number().optional(),
  name: string().min(1).max(256).trim(),
  image: custom(),
});

export const addToCartSchema = object({
  quantity: coerce
    .number()
    .positive()
    .min(1)
    .default('' as unknown as number),
});

export const updateCartSchema = object({
  quantity: coerce
    .number()
    .positive()
    .default('' as unknown as number)
    .array()
    .min(1),
  product: coerce
    .number()
    .positive()
    .default('' as unknown as number)
    .array()
    .min(1),
});

export const createOrderSchema = object({
  id: coerce.number().optional(),
  name: string().min(1).max(256).trim(),
  email: string().email().min(1).max(256).trim(),
  phone: string().min(1).max(256).trim(),
  city: string().min(1).max(256).trim(),
  address: string().min(1).max(256).trim(),
});
