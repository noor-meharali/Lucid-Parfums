import type { PublicProduct } from './product';

export interface PublicWishlist {
  id: string;
  products: PublicProduct[];
}
