import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/common';
import type { Address, AddressInput } from '@/types/address';

export const addressService = {
  list: () => apiClient.get<ApiResponse<Address[]>>('/addresses'),
  create: (input: AddressInput) => apiClient.post<ApiResponse<Address>>('/addresses', input),
  update: (id: string, input: Partial<AddressInput>) =>
    apiClient.put<ApiResponse<Address>>(`/addresses/${id}`, input),
  remove: (id: string) => apiClient.delete<ApiResponse<null>>(`/addresses/${id}`),
  setDefault: (id: string) => apiClient.put<ApiResponse<Address>>(`/addresses/${id}/default`),
};
