import type { Product } from '@/types/product';
import { bottlePlaceholder } from '@/utils/placeholderImage';

/**
 * TEMPORARY mock data for demonstrating ProductCard only.
 * Replace with data from `services/productService` once the product
 * API exists — nothing outside this file should need to change.
 */
export const mockProducts: Product[] = [
  {
    id: 'mock-1',
    slug: 'ambre-noir',
    name: 'Ambre Noir',
    category: 'Eau de Parfum',
    gender: 'unisex',
    priceCents: 18500,
    rating: 4.8,
    reviewCount: 126,
    imageUrl: bottlePlaceholder('#4a3728', '#f7f2ea'),
    imageAlt: 'Ambre Noir eau de parfum bottle',
    stock: 'inStock',
    badges: ['bestseller'],
  },
  {
    id: 'mock-2',
    slug: 'jardin-blanc',
    name: 'Jardin Blanc',
    category: 'Eau de Toilette',
    gender: 'women',
    priceCents: 15500,
    salePriceCents: 12400,
    rating: 4.6,
    reviewCount: 84,
    imageUrl: bottlePlaceholder('#8c6d4f', '#f4f1ec'),
    imageAlt: 'Jardin Blanc eau de toilette bottle',
    stock: 'inStock',
    badges: ['sale', 'women'],
  },
  {
    id: 'mock-3',
    slug: 'vetiver-fume',
    name: 'Vétiver Fumé',
    category: 'Eau de Parfum',
    gender: 'men',
    priceCents: 19500,
    rating: 4.9,
    reviewCount: 51,
    imageUrl: bottlePlaceholder('#211d1a', '#e8dfd0'),
    imageAlt: 'Vétiver Fumé eau de parfum bottle',
    stock: 'lowStock',
    badges: ['new', 'men'],
  },
  {
    id: 'mock-4',
    slug: 'lueur-doree',
    name: 'Lueur Dorée',
    category: 'Parfum',
    gender: 'unisex',
    priceCents: 24500,
    rating: 5,
    reviewCount: 19,
    imageUrl: bottlePlaceholder('#b08d57', '#f7f2ea'),
    imageAlt: 'Lueur Dorée parfum bottle',
    stock: 'outOfStock',
    badges: ['featured'],
  },
];
