export interface CartItem {
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
  availableStock: number;
  isActive: boolean;
}

export interface Cart {
  id: string;
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
}
