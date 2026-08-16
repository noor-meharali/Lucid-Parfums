import type { Gender, FragranceFamily } from '../constants/product';

export type StockState = 'inStock' | 'lowStock' | 'outOfStock';
export type ProductBadge =
  | 'new'
  | 'bestseller'
  | 'sale'
  | 'featured'
  | 'outOfStock'
  | 'lowStock'
  | 'men'
  | 'women'
  | 'unisex';

/**
 * The shape sent to the frontend — matches the `Product` type
 * ProductCard has consumed since Part 2/3, so no frontend component
 * needs to change now that data is real. `id`/`imageUrl`/`imageAlt`/
 * `stock`/`badges` are computed here rather than stored verbatim.
 */
export interface PublicProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  gender: Gender;
  brand: string;
  priceCents: number;
  salePriceCents?: number;
  sku: string;
  stock: StockState;
  stockCount: number;
  sizes: { label: string; volumeMl: number; priceCents: number; stock: number }[];
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
  badges: ProductBadge[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductListQuery {
  page: number;
  limit: number;
  gender?: Gender;
  category?: string;
  fragranceFamily?: FragranceFamily;
  minPriceCents?: number;
  maxPriceCents?: number;
  inStockOnly?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  search?: string;
  sort: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popularity';
}
