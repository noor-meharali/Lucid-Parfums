import type { ID } from '@/types/common';
import type { BadgeVariant } from '@/components/common/Badge';

export type ProductGender = 'men' | 'women' | 'unisex';

export type StockState = 'inStock' | 'lowStock' | 'outOfStock';

export type FragranceFamily =
  | 'floral'
  | 'woody'
  | 'fresh'
  | 'citrus'
  | 'amber'
  | 'oriental'
  | 'musk'
  | 'other';

export interface ProductSize {
  label: string;
  volumeMl: number;
  priceCents: number;
  stock: number;
}

/**
 * The real product shape served by the API (see server's PublicProduct
 * DTO). ProductCard only reads the fields it always has — id, slug,
 * name, category, gender, priceCents, salePriceCents, rating,
 * reviewCount, imageUrl, imageAlt, stock, badges — so it needed no
 * changes when mock data was replaced with this. The rest of the
 * fields exist for the product detail page (Part 5).
 */
export interface Product {
  id: ID;
  slug: string;
  name: string;
  description: string;
  category: string;
  gender: ProductGender;
  brand: string;
  priceCents: number;
  salePriceCents?: number;
  sku: string;
  stock: StockState;
  stockCount: number;
  sizes: ProductSize[];
  images: string[];
  imageUrl: string;
  imageAlt: string;
  fragranceFamily: FragranceFamily;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  ingredients: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  badges: BadgeVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  gender?: ProductGender;
  category?: string;
  fragranceFamily?: FragranceFamily;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  search?: string;
  sort?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popularity';
}
