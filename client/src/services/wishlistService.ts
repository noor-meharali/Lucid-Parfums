import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/common';
import type { Wishlist } from '@/types/wishlist';

export const wishlistService = {
  get: () => apiClient.get<ApiResponse<Wishlist>>('/wishlist'),
  add: (productId: string) => apiClient.post<ApiResponse<Wishlist>>(`/wishlist/${productId}`),
  remove: (productId: string) => apiClient.delete<ApiResponse<Wishlist>>(`/wishlist/${productId}`),
};
