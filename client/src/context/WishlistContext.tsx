import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { wishlistService } from '@/services/wishlistService';
import { useAuth } from '@/context/AuthContext';
import { ApiRequestError } from '@/api/client';
import type { Product } from '@/types/product';

interface WishlistContextValue {
  products: Product[];
  productIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  isWishlisted: (productId: string) => boolean;
  addProduct: (productId: string) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  toggleProduct: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshWishlist = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await wishlistService.get();
      setProducts(response.data.products);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Could not load your wishlist.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshWishlist();
    } else {
      setProducts([]);
      setError(null);
    }
  }, [isAuthenticated, refreshWishlist]);

  const addProduct = useCallback(async (productId: string) => {
    const response = await wishlistService.add(productId);
    setProducts(response.data.products);
  }, []);

  const removeProduct = useCallback(async (productId: string) => {
    const response = await wishlistService.remove(productId);
    setProducts(response.data.products);
  }, []);

  const productIds = useMemo(() => new Set(products.map((product) => product.id)), [products]);

  const toggleProduct = useCallback(
    async (productId: string) => {
      if (productIds.has(productId)) {
        await removeProduct(productId);
      } else {
        await addProduct(productId);
      }
    },
    [productIds, addProduct, removeProduct],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      products,
      productIds,
      isLoading,
      error,
      isWishlisted: (productId: string) => productIds.has(productId),
      addProduct,
      removeProduct,
      toggleProduct,
      refreshWishlist,
    }),
    [products, productIds, isLoading, error, addProduct, removeProduct, toggleProduct, refreshWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
