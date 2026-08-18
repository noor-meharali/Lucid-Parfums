import { cn } from '@/utils/cn';
import type { ProductSize } from '@/types/product';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected: ProductSize | null;
  onChange: (size: ProductSize) => void;
}

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  if (sizes.length === 0) return null;

  return (
    <fieldset>
      <legend className="mb-2 text-body-sm font-medium text-espresso">
        Size{selected && <span className="ml-1.5 font-normal text-taupe">— {selected.label}</span>}
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
        {sizes.map((size) => {
          const isSelected = selected?.label === size.label;
          const isOutOfStock = size.stock <= 0;

          return (
            <button
              key={size.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isOutOfStock}
              onClick={() => onChange(size)}
              className={cn(
                'rounded-pill border px-4 py-2 text-body-sm transition-colors duration-200',
                isOutOfStock
                  ? 'cursor-not-allowed border-beige text-taupe/50 line-through'
                  : isSelected
                    ? 'border-espresso bg-espresso text-ivory'
                    : 'border-beige text-espresso hover:border-espresso',
              )}
            >
              {size.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
