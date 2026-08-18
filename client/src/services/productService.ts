import { apiClient } from '@/api/client';
import type { ApiResponse, PaginatedResult } from '@/types/common';
import type { Product, ProductListParams } from '@/types/product';

function buildQueryString(params: ProductListParams): string {
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.gender) search.set('gender', params.gender);
  if (params.category) search.set('category', params.category);
  if (params.fragranceFamily) search.set('fragranceFamily', params.fragranceFamily);
  if (params.minPrice !== undefined) search.set('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined) search.set('maxPrice', String(params.maxPrice));
  if (params.inStock) search.set('inStock', 'true');
  if (params.featured) search.set('featured', 'true');
  if (params.bestSeller) search.set('bestSeller', 'true');
  if (params.newArrival) search.set('newArrival', 'true');
  if (params.search) search.set('search', params.search);
  if (params.sort) search.set('sort', params.sort);

  const query = search.toString();
  return query ? `?${query}` : '';
}

export const productService = {
  list: (params: ProductListParams = {}) =>
    apiClient.get<ApiResponse<PaginatedResult<Product>>>(`/products${buildQueryString(params)}`),

  getBySlug: (slug: string) => apiClient.get<ApiResponse<Product>>(`/products/${encodeURIComponent(slug)}`),

  getRelated: (slug: string) =>
    apiClient.get<ApiResponse<Product[]>>(`/products/${encodeURIComponent(slug)}/related`),
};
