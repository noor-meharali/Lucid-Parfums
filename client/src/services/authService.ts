import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/common';
import type { User } from '@/types/user';
import type { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from '@/types/auth';

export const authService = {
  register: (input: RegisterInput) => apiClient.post<ApiResponse<User>>('/auth/register', input),
  login: (input: LoginInput) => apiClient.post<ApiResponse<User>>('/auth/login', input),
  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),
  me: () => apiClient.get<ApiResponse<User>>('/auth/me'),
  forgotPassword: (input: ForgotPasswordInput) =>
    apiClient.post<ApiResponse<null>>('/auth/forgot-password', input),
  resetPassword: (input: ResetPasswordInput) =>
    apiClient.post<ApiResponse<null>>('/auth/reset-password', input),
};
