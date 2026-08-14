import type { ID } from '@/types/common';
import type { BadgeVariant } from '@/components/common/Badge';

export type ProductGender = 'men' | 'women' | 'unisex';

export type StockState = 'inStock' | 'lowStock' | 'outOfStock';

/**
 * The shape the product catalog will use once the backend serves
 * real products. Fields map directly to what ProductCard renders,
 * so swapping mock data for API data later needs no component change.
 */
export interface Product {
  id: ID;
  slug: string;
  name: string;
  category: string;
  gender: ProductGender;
  priceCents: number;
  salePriceCents?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageAlt: string;
  stock: StockState;
  badges?: BadgeVariant[];
}
