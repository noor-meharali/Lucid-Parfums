import { cn } from '@/utils/cn';

interface BrandDividerProps {
  className?: string;
  tone?: 'default' | 'inverted';
}

/**
 * The recurring Lucid Parfums signature mark: a hairline rule broken
 * by a small rotated diamond, the way perfume labels set a rule
 * between the maison name and its designation. Used under the
 * wordmark and between major sections throughout the site.
 */
export function BrandDivider({ className, tone = 'default' }: BrandDividerProps) {
  const lineColor = tone === 'inverted' ? 'bg-champagne/40' : 'bg-beige';
  const dotColor = tone === 'inverted' ? 'border-champagne' : 'border-gold';

  return (
    <div className={cn('flex items-center justify-center gap-3', className)} aria-hidden="true">
      <span className={cn('h-px w-10 sm:w-14', lineColor)} />
      <span className={cn('h-1.5 w-1.5 rotate-45 border', dotColor)} />
      <span className={cn('h-px w-10 sm:w-14', lineColor)} />
    </div>
  );
}
