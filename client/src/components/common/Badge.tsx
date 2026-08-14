import type { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant =
  | 'new'
  | 'bestseller'
  | 'sale'
  | 'featured'
  | 'outOfStock'
  | 'lowStock'
  | 'men'
  | 'women'
  | 'unisex'
  | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  new: 'bg-champagne/50 text-espresso',
  bestseller: 'bg-gold/15 text-bronze',
  sale: 'bg-destructive-soft text-destructive',
  featured: 'bg-charcoal text-ivory',
  outOfStock: 'bg-beige text-taupe',
  lowStock: 'bg-warning-soft text-warning',
  men: 'bg-cream text-espresso border border-beige',
  women: 'bg-cream text-espresso border border-beige',
  unisex: 'bg-cream text-espresso border border-beige',
  neutral: 'bg-offwhite text-taupe',
};

/**
 * A subtle status label for product cards and lists. Deliberately
 * low-contrast — badges inform, they don't shout.
 */
export function Badge({ variant = 'neutral', className, children }: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-1 text-label font-medium uppercase tracking-[0.08em]',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
