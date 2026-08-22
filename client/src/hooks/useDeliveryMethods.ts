import { useEffect, useState } from 'react';
import { deliveryMethodService } from '@/services/deliveryMethodService';
import type { DeliveryMethod } from '@/types/deliveryMethod';

export function useDeliveryMethods() {
  const [methods, setMethods] = useState<DeliveryMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    deliveryMethodService
      .list()
      .then((response) => setMethods(response.data))
      .finally(() => setIsLoading(false));
  }, []);

  return { methods, isLoading };
}
