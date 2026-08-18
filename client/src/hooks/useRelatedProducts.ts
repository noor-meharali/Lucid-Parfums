import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import type { Product } from '@/types/product';

interface UseRelatedProductsResult {
  products: Product[];
  isLoading: boolean;
}

export function useRelatedProducts(slug: string | undefined): UseRelatedProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    let ignore = false;
    setIsLoading(true);

    productService
      .getRelated(slug)
      .then((response) => {
        if (!ignore) setProducts(response.data);
      })
      .catch(() => {
        if (!ignore) setProducts([]);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  return { products, isLoading };
}
