import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const PADDING_STYLES: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-8',
};

/**
 * The base surface for product, content, info, admin, and analytics
 * cards. Premium feel comes from spacing, type, and a hairline
 * border — not heavy shadows, so `interactive` only lifts the
 * shadow a little on hover.
 */
export function Card({ interactive = false, padding = 'md', className, children, ...props }: PropsWithChildren<CardProps>) {
  return (
    <div
      className={cn(
        'rounded-md border border-beige bg-ivory shadow-soft transition-shadow duration-200',
        interactive && 'hover:shadow-raised',
        PADDING_STYLES[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
