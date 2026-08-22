import { z } from 'zod';

const mongoIdSchema = z.string().trim().regex(/^[a-f0-9]{24}$/i, 'must be a valid id');

export const addCartItemSchema = z.object({
  productId: mongoIdSchema,
  quantity: z.number().int().min(1).max(20),
  selectedSize: z.string().trim().min(1).optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(20),
});

export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
