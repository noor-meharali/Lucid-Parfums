import { useEffect, useState } from 'react';
import { healthService } from '@/services/healthService';

type ConnectionState = 'checking' | 'connected' | 'disconnected';

export function useHealthCheck() {
  const [state, setState] = useState<ConnectionState>('checking');

  useEffect(() => {
    let isMounted = true;

    healthService
      .check()
      .then(() => {
        if (isMounted) setState('connected');
      })
      .catch(() => {
        if (isMounted) setState('disconnected');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
