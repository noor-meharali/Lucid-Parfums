import { useEffect, type RefObject } from 'react';

/**
 * Calls `handler` when a pointer event occurs outside `ref`'s element.
 * Used to close menus/drawers/popovers on an outside click.
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  active: boolean,
  handler: () => void,
): void {
  useEffect(() => {
    if (!active) return;

    function handlePointerDown(event: PointerEvent) {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [ref, active, handler]);
}
