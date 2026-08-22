import type { Product } from '@/types/product';

export interface Wishlist {
  id: string;
  products: Product[];
}
