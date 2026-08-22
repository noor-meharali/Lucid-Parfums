import { z } from 'zod';
import { PAYMENT_METHODS } from '../constants/order';

const mongoIdSchema = z.string().trim().regex(/^[a-f0-9]{24}$/i, 'must be a valid id');

const inlineAddressSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  phone: z.string().trim().min(1).max(30),
  addressLine1: z.string().trim().min(1).max(200),
  addressLine2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1).max(100),
  province: z.string().trim().min(1).max(100),
  postalCode: z.string().trim().min(1).max(20),
  country: z.string().trim().min(1).max(100),
});

// Either reuse a saved address (addressId) or submit a new one inline
// (address) — never both required, but at least one. deliveryMethodId
// and paymentMethod are the only other client inputs; price, stock,
// and totals are never accepted from the client anywhere in here.
export const createOrderSchema = z
  .object({
    addressId: mongoIdSchema.optional(),
    address: inlineAddressSchema.optional(),
    deliveryMethodId: mongoIdSchema,
    paymentMethod: z.enum(PAYMENT_METHODS),
  })
  .refine((data) => Boolean(data.addressId) || Boolean(data.address), {
    message: 'A shipping address is required.',
    path: ['address'],
  });

export const orderListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderListQueryInput = z.infer<typeof orderListQuerySchema>;
