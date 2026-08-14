import { useRef, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { IconButton } from '@/components/common/IconButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  className?: string;
}

/**
 * A centered dialog for confirmations and quick-view content.
 * Closes on Escape or backdrop click, traps focus while open, and
 * locks background scroll. Title is always visible for screen readers
 * even if visually redundant with in-content headings.
 */
export function Modal({ isOpen, onClose, title, description, className, children }: PropsWithChildren<ModalProps>) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEscapeKey(isOpen, onClose);
  useLockBodyScroll(isOpen);
  useFocusTrap(dialogRef, isOpen);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={description ? 'modal-description' : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative z-10 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-lg border border-beige bg-ivory p-6 shadow-elevated',
              className,
            )}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 id="modal-title" className="font-serif text-heading-md text-espresso">
                  {title}
                </h2>
                {description && (
                  <p id="modal-description" className="mt-1 text-body-sm text-taupe">
                    {description}
                  </p>
                )}
              </div>
              <IconButton label="Close dialog" onClick={onClose} className="-mr-2 -mt-2 shrink-0">
                <X className="h-5 w-5" aria-hidden="true" />
              </IconButton>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
