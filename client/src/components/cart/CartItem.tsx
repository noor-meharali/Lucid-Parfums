import { X } from 'lucide-react';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { QuantityControl } from '@/components/cart/QuantityControl';
import { IconButton } from '@/components/common/IconButton';
import { formatPrice } from '@/utils/formatPrice';
import type { CartLineItem } from '@/types/cart';

interface CartItemProps {
  item: CartLineItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-3 py-4">
      <ResponsiveImage
        src={item.imageUrl}
        alt={item.imageAlt}
        aspectRatio="3/4"
        containerClassName="w-20 shrink-0 rounded-sm"
      />
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-body-sm font-medium text-espresso">{item.name}</p>
            {item.variant && <p className="text-body-sm text-taupe">{item.variant}</p>}
          </div>
          <IconButton label={`Remove ${item.name}`} onClick={() => onRemove(item.id)} className="h-7 w-7 shrink-0">
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </IconButton>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <QuantityControl quantity={item.quantity} onChange={(qty) => onQuantityChange(item.id, qty)} />
          <span className="text-body-sm font-medium text-espresso">
            {formatPrice(item.unitPriceCents * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
