import { useEffect, useState } from 'react';
import { orderService } from '@/services/orderService';
import { ApiRequestError } from '@/api/client';
import type { Order } from '@/types/order';
import type { PaginatedResult } from '@/types/common';

export function useOrders(page: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResult<Order>, 'items'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError(null);

    orderService
      .list(page)
      .then((response) => {
        if (ignore) return;
        const { items, ...meta } = response.data;
        setOrders(items);
        setPagination(meta);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setError(err instanceof ApiRequestError ? err.message : 'Could not load your orders.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page]);

  return { orders, pagination, isLoading, error };
}
