import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { cartService } from '@/services/cartService';
import { useAuth } from '@/context/AuthContext';
import { ApiRequestError } from '@/api/client';
import type { Cart } from '@/types/cart';

interface CartContextValue {
  cart: Cart | null;
  items: Cart['items'];
  itemCount: number;
  subtotalCents: number;
  isLoading: boolean;
  error: string | null;
  addItem: (productId: string, quantity: number, selectedSize?: string) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const EMPTY_CART: Cart = { id: '', items: [], itemCount: 0, subtotalCents: 0 };

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.get();
      setCart(response.data);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Could not load your cart.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // The cart is server-side and per-authenticated-user only (no
  // guest/localStorage cart) — refetch on sign-in, clear immediately
  // on sign-out rather than showing the previous user's items.
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCart(null);
      setError(null);
    }
  }, [isAuthenticated, refreshCart]);

  const addItem = useCallback(async (productId: string, quantity: number, selectedSize?: string) => {
    const response = await cartService.addItem(productId, quantity, selectedSize);
    setCart(response.data);
  }, []);

  const updateItem = useCallback(async (itemId: string, quantity: number) => {
    const response = await cartService.updateItem(itemId, quantity);
    setCart(response.data);
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    const response = await cartService.removeItem(itemId);
    setCart(response.data);
  }, []);

  const clearCart = useCallback(async () => {
    const response = await cartService.clear();
    setCart(response.data);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const resolvedCart = cart ?? EMPTY_CART;
    return {
      cart,
      items: resolvedCart.items,
      itemCount: resolvedCart.itemCount,
      subtotalCents: resolvedCart.subtotalCents,
      isLoading,
      error,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      refreshCart,
    };
  }, [cart, isLoading, error, addItem, updateItem, removeItem, clearCart, refreshCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
