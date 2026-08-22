import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/common';
import type { DeliveryMethod } from '@/types/deliveryMethod';

export const deliveryMethodService = {
  list: () => apiClient.get<ApiResponse<DeliveryMethod[]>>('/delivery-methods'),
};
