import { useCallback, useEffect, useState } from 'react';
import { addressService } from '@/services/addressService';
import type { Address } from '@/types/address';

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await addressService.list();
      setAddresses(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { addresses, isLoading, refresh };
}
