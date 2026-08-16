import { useEffect, useState } from 'react';

/**
 * Returns `value`, updated only after it has stopped changing for
 * `delayMs`. Used to avoid firing a search request on every keystroke.
 */
export function useDebouncedValue<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
