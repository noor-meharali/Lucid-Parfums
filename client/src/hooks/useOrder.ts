import { useEffect, useState } from 'react';
import { orderService } from '@/services/orderService';
import { ApiRequestError } from '@/api/client';
import type { Order } from '@/types/order';

export function useOrder(orderNumber: string | undefined) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<'not-found' | 'server' | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setError('not-found');
      setIsLoading(false);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError(null);

    orderService
      .getByOrderNumber(orderNumber)
      .then((response) => {
        if (!ignore) setOrder(response.data);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setError(err instanceof ApiRequestError && err.status === 404 ? 'not-found' : 'server');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [orderNumber]);

  return { order, isLoading, error };
}
