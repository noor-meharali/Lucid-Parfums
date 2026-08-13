/**
 * Shared, entity-agnostic types used across the application.
 * Domain-specific types (Product, Order, User, etc.) will be added
 * in their dedicated parts.
 */

export type ID = string;

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type SortDirection = 'asc' | 'desc';

export interface HealthStatus {
  status: 'ok' | 'error';
  uptime: number;
  timestamp: string;
  environment: string;
}
