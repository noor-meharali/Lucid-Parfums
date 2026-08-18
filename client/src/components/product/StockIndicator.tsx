import { cn } from '@/utils/cn';
import type { StockState } from '@/types/product';

interface StockIndicatorProps {
  stock: StockState;
}

const CONFIG: Record<StockState, { label: string; dotClassName: string; textClassName: string }> = {
  inStock: { label: 'In Stock', dotClassName: 'bg-success', textClassName: 'text-success' },
  lowStock: { label: 'Low Stock', dotClassName: 'bg-warning', textClassName: 'text-warning' },
  outOfStock: { label: 'Out of Stock', dotClassName: 'bg-destructive', textClassName: 'text-destructive' },
};

/**
 * Communicates availability without ever exposing an exact inventory
 * count — "Low Stock" is as specific as this gets, matching what the
 * backend already sends rather than a raw number.
 */
export function StockIndicator({ stock }: StockIndicatorProps) {
  const config = CONFIG[stock];

  return (
    <span className={cn('inline-flex items-center gap-2 text-body-sm font-medium', config.textClassName)}>
      <span className={cn('h-2 w-2 rounded-full', config.dotClassName)} aria-hidden="true" />
      {config.label}
    </span>
  );
}
