import { Minus, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

interface QuantityControlProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityControl({ quantity, onChange, min = 1, max = 99, className }: QuantityControlProps) {
  return (
    <div className={cn('inline-flex items-center rounded-pill border border-beige', className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="flex h-8 w-8 items-center justify-center text-espresso transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:text-taupe/50 disabled:hover:bg-transparent"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span className="w-6 text-center text-body-sm text-espresso" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="flex h-8 w-8 items-center justify-center text-espresso transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:text-taupe/50 disabled:hover:bg-transparent"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
