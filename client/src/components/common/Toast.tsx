import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Toast, ToastVariant } from '@/types/toast';

const VARIANT_CONFIG: Record<ToastVariant, { icon: typeof CheckCircle2; className: string }> = {
  success: { icon: CheckCircle2, className: 'border-success/30 text-success' },
  error: { icon: AlertCircle, className: 'border-destructive/30 text-destructive' },
  warning: { icon: AlertTriangle, className: 'border-warning/30 text-warning' },
  info: { icon: Info, className: 'border-taupe/30 text-taupe' },
};

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  const prefersReducedMotion = useReducedMotion();

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:pr-6"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const { icon: Icon, className } = VARIANT_CONFIG[toast.variant];
          return (
            <motion.div
              key={toast.id}
              role="status"
              layout
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className={cn(
                'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border bg-ivory px-4 py-3 shadow-raised',
                className,
              )}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="flex-1 text-body-sm text-espresso">{toast.message}</p>
              <button
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="shrink-0 text-taupe transition-colors hover:text-espresso"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
