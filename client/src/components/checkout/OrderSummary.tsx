import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { formatPrice } from '@/utils/formatPrice';
import type { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  subtotalCents: number;
  shippingCostCents: number | null;
}

export function OrderSummary({ items, subtotalCents, shippingCostCents }: OrderSummaryProps) {
  const totalCents = subtotalCents + (shippingCostCents ?? 0);

  return (
    <div className="flex flex-col gap-4 rounded-md border border-beige bg-cream p-5">
      <h2 className="font-serif text-heading-sm text-espresso">Order Summary</h2>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <ResponsiveImage src={item.imageUrl} alt={item.imageAlt} aspectRatio="1/1" containerClassName="w-14 rounded-sm" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-espresso text-[0.625rem] font-medium text-ivory">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-body-sm font-medium text-espresso">{item.name}</p>
              {item.selectedSize && <p className="text-body-sm text-taupe">{item.selectedSize}</p>}
            </div>
            <span className="shrink-0 text-body-sm text-espresso">{formatPrice(item.subtotalCents)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-beige pt-4 text-body-sm">
        <div className="flex items-center justify-between text-taupe">
          <span>Subtotal</span>
          <span className="text-espresso">{formatPrice(subtotalCents)}</span>
        </div>
        <div className="flex items-center justify-between text-taupe">
          <span>Shipping</span>
          <span className="text-espresso">
            {shippingCostCents === null ? 'Select a delivery method' : formatPrice(shippingCostCents)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-beige pt-3 text-body-md font-medium text-espresso">
          <span>Total</span>
          <span>{formatPrice(totalCents)}</span>
        </div>
      </div>
    </div>
  );
}
