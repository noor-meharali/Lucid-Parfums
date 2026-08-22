import { apiClient } from '@/api/client';
import type { ApiResponse, PaginatedResult } from '@/types/common';
import type { Order, CreateOrderInput } from '@/types/order';

export const orderService = {
  create: (input: CreateOrderInput) => apiClient.post<ApiResponse<Order>>('/orders', input),
  list: (page = 1, limit = 10) =>
    apiClient.get<ApiResponse<PaginatedResult<Order>>>(`/orders?page=${page}&limit=${limit}`),
  getByOrderNumber: (orderNumber: string) =>
    apiClient.get<ApiResponse<Order>>(`/orders/${encodeURIComponent(orderNumber)}`),
};
