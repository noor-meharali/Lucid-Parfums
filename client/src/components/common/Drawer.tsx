import { useRef, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { IconButton } from '@/components/common/IconButton';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  side?: 'left' | 'right';
  className?: string;
}

/**
 * A side panel used for mobile navigation and the cart. Slides in
 * from `side`, traps focus, closes on Escape or backdrop click, and
 * never changes page width or causes horizontal scroll.
 */
export function Drawer({ isOpen, onClose, title, side = 'right', className, children }: PropsWithChildren<DrawerProps>) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEscapeKey(isOpen, onClose);
  useLockBodyScroll(isOpen);
  useFocusTrap(panelRef, isOpen);

  const offscreenX = side === 'right' ? '100%' : '-100%';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-charcoal/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            tabIndex={-1}
            initial={{ x: prefersReducedMotion ? 0 : offscreenX, opacity: prefersReducedMotion ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: prefersReducedMotion ? 0 : offscreenX, opacity: prefersReducedMotion ? 0 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute top-0 flex h-full w-full max-w-sm flex-col bg-ivory shadow-elevated',
              side === 'right' ? 'right-0' : 'left-0',
              className,
            )}
          >
            <div className="flex items-center justify-between border-b border-beige px-5 py-4">
              <h2 id="drawer-title" className="font-serif text-heading-sm text-espresso">
                {title}
              </h2>
              <IconButton label="Close menu" onClick={onClose}>
                <X className="h-5 w-5" aria-hidden="true" />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
