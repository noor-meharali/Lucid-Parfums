export const GENDERS = ['men', 'women', 'unisex'] as const;
export type Gender = (typeof GENDERS)[number];

export const FRAGRANCE_FAMILIES = [
  'floral',
  'woody',
  'fresh',
  'citrus',
  'amber',
  'oriental',
  'musk',
  'other',
] as const;
export type FragranceFamily = (typeof FRAGRANCE_FAMILIES)[number];

export const PRODUCT_SORTS = ['newest', 'price-low', 'price-high', 'rating', 'popularity'] as const;
export type ProductSort = (typeof PRODUCT_SORTS)[number];

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

/** Stock below this count (but above 0) is surfaced as "low stock". */
export const LOW_STOCK_THRESHOLD = 5;
