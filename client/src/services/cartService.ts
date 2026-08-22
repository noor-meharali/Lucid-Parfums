import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/common';
import type { Cart } from '@/types/cart';

export const cartService = {
  get: () => apiClient.get<ApiResponse<Cart>>('/cart'),
  addItem: (productId: string, quantity: number, selectedSize?: string) =>
    apiClient.post<ApiResponse<Cart>>('/cart/items', { productId, quantity, selectedSize }),
  updateItem: (itemId: string, quantity: number) =>
    apiClient.put<ApiResponse<Cart>>(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: string) => apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`),
  clear: () => apiClient.delete<ApiResponse<Cart>>('/cart'),
};
