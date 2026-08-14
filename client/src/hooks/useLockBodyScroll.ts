import { useEffect } from 'react';

/**
 * Locks background scroll while `locked` is true — used by modals and
 * drawers so opening them doesn't let the page scroll behind.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    document.body.setAttribute('data-scroll-locked', 'true');
    return () => {
      document.body.removeAttribute('data-scroll-locked');
    };
  }, [locked]);
}
