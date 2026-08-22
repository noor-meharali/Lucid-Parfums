export interface PublicCartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  selectedSize?: string;
  quantity: number;
  unitPriceCents: number;
  subtotalCents: number;
  /** Current live stock for the selected size (or the product overall) — lets the UI warn before checkout if it's dropped below the requested quantity. */
  availableStock: number;
  isActive: boolean;
}

export interface PublicCart {
  id: string;
  items: PublicCartItem[];
  itemCount: number;
  subtotalCents: number;
}
