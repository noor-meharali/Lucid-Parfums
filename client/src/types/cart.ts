import type { ID } from '@/types/common';

/**
 * Visual shape for a cart line item. No cart state, persistence, or
 * checkout logic exists yet — this only supports the cart UI
 * foundation (CartDrawer, CartItem, CartSummary).
 */
export interface CartLineItem {
  id: ID;
  name: string;
  variant?: string;
  imageUrl: string;
  imageAlt: string;
  unitPriceCents: number;
  quantity: number;
}
