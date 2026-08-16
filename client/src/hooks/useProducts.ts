import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import type { Product, ProductListParams } from '@/types/product';
import type { PaginatedResult } from '@/types/common';

interface UseProductsResult {
  products: Product[];
  pagination: Omit<PaginatedResult<Product>, 'items'> | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Fetches a page of products for the given filters. Re-fetches
 * whenever the filter values change (compared by content, not object
 * identity, so callers don't need to memoize the params object) and
 * ignores responses that arrive after a newer request has been made.
 */
export function useProducts(params: ProductListParams): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<UseProductsResult['pagination']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError(null);

    productService
      .list(JSON.parse(paramsKey))
      .then((response) => {
        if (ignore) return;
        const { items, ...meta } = response.data;
        setProducts(items);
        setPagination(meta);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setError(err instanceof Error ? err.message : 'Something went wrong loading products.');
        setProducts([]);
        setPagination(null);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  return { products, pagination, isLoading, error };
}
