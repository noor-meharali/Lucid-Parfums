import { apiClient } from '@/api/client';
import type { ApiResponse, HealthStatus } from '@/types/common';

export const healthService = {
  check: () => apiClient.get<ApiResponse<HealthStatus>>('/health'),
};
