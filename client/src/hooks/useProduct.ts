import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import { ApiRequestError } from '@/api/client';
import type { Product } from '@/types/product';

interface UseProductResult {
  product: Product | null;
  isLoading: boolean;
  /** 'not-found' gets its own state so the page can show a dedicated 404, not a generic error. */
  error: 'not-found' | 'server' | null;
}

/** Fetches a single product by slug for the product detail page. */
export function useProduct(slug: string | undefined): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<UseProductResult['error']>(null);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      setError('not-found');
      setIsLoading(false);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError(null);

    productService
      .getBySlug(slug)
      .then((response) => {
        if (ignore) return;
        setProduct(response.data);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setProduct(null);
        setError(err instanceof ApiRequestError && err.status === 404 ? 'not-found' : 'server');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  return { product, isLoading, error };
}
