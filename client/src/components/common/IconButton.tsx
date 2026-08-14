import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tone?: 'default' | 'inverted';
}

/**
 * A borderless, circular icon-only control used throughout the header
 * and toolbars (search, account, wishlist, cart, menu, close). Always
 * requires an accessible label since it carries no visible text.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, label, tone = 'default', children, ...props },
  ref,
) {
  const toneStyles =
    tone === 'inverted'
      ? 'text-ivory hover:bg-ivory/10 active:bg-ivory/15'
      : 'text-espresso hover:bg-cream active:bg-champagne/40';

  return (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200',
        toneStyles,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
