import { z } from 'zod';
import {
  GENDERS,
  FRAGRANCE_FAMILIES,
  PRODUCT_SORTS,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '../constants/product';

const sizeSchema = z.object({
  label: z.string().trim().min(1),
  volumeMl: z.number().positive(),
  priceCents: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
});

const baseProductSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase, alphanumeric, and hyphen-separated'),
  description: z.string().trim().min(1).max(4000),
  category: z.string().trim().min(1),
  gender: z.enum(GENDERS),
  brand: z.string().trim().min(1).optional(),
  priceCents: z.number().int().nonnegative(),
  salePriceCents: z.number().int().nonnegative().optional(),
  sku: z.string().trim().min(1),
  stock: z.number().int().nonnegative(),
  sizes: z.array(sizeSchema).optional(),
  images: z.array(z.string().trim().min(1)).optional(),
  primaryImage: z.string().trim().min(1),
  fragranceFamily: z.enum(FRAGRANCE_FAMILIES),
  topNotes: z.array(z.string().trim().min(1)).optional(),
  heartNotes: z.array(z.string().trim().min(1)).optional(),
  baseNotes: z.array(z.string().trim().min(1)).optional(),
  ingredients: z.array(z.string().trim().min(1)).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  newArrival: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const createProductSchema = baseProductSchema;
export const updateProductSchema = baseProductSchema.partial();

const booleanFromQuery = z
  .union([z.literal('true'), z.literal('false')])
  .transform((value) => value === 'true');

export const productListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  gender: z.enum(GENDERS).optional(),
  category: z.string().trim().min(1).optional(),
  fragranceFamily: z.enum(FRAGRANCE_FAMILIES).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  inStock: booleanFromQuery.optional(),
  featured: booleanFromQuery.optional(),
  bestSeller: booleanFromQuery.optional(),
  newArrival: booleanFromQuery.optional(),
  search: z.string().trim().min(1).max(200).optional(),
  sort: z.enum(PRODUCT_SORTS).default('newest'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductListQueryInput = z.infer<typeof productListQuerySchema>;
