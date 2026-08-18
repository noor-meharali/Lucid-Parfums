import { ROUTES } from '@/constants/routes';
import type { FragranceFamily, ProductGender, ProductListParams } from '@/types/product';

export const GENDER_LABELS: Record<ProductGender, string> = {
  men: 'Men',
  women: 'Women',
  unisex: 'Unisex',
};

export const GENDER_ROUTES: Record<ProductGender, string> = {
  men: ROUTES.MEN,
  women: ROUTES.WOMEN,
  unisex: ROUTES.UNISEX,
};

export const GENDER_OPTIONS: { value: ProductGender; label: string }[] = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
];

export const FRAGRANCE_FAMILY_OPTIONS: { value: FragranceFamily; label: string }[] = [
  { value: 'floral', label: 'Floral' },
  { value: 'woody', label: 'Woody' },
  { value: 'fresh', label: 'Fresh' },
  { value: 'citrus', label: 'Citrus' },
  { value: 'amber', label: 'Amber' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'musk', label: 'Musk' },
  { value: 'other', label: 'Other' },
];

export const SORT_OPTIONS: { value: NonNullable<ProductListParams['sort']>; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popularity', label: 'Most Popular' },
];

export const DEFAULT_PAGE_SIZE = 12;
