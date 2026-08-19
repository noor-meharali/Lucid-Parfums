import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/common';
import type { User } from '@/types/user';
import type { UpdateProfileInput, ChangePasswordInput } from '@/types/auth';

export const userService = {
  getProfile: () => apiClient.get<ApiResponse<User>>('/users/me'),
  updateProfile: (input: UpdateProfileInput) => apiClient.put<ApiResponse<User>>('/users/me', input),
  changePassword: (input: ChangePasswordInput) =>
    apiClient.post<ApiResponse<null>>('/users/me/password', input),
};
