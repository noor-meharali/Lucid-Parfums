import { Button } from '@/components/common/Button';
import { formatPrice } from '@/utils/formatPrice';

interface CartSummaryProps {
  subtotalCents: number;
  shippingCents?: number;
  onCheckout?: () => void;
}

/**
 * Visual price summary block. Shipping and totals are placeholders
 * until checkout logic exists — the checkout button is not wired up.
 */
export function CartSummary({ subtotalCents, shippingCents, onCheckout }: CartSummaryProps) {
  const shippingLabel = shippingCents === undefined ? 'Calculated at checkout' : formatPrice(shippingCents);
  const total = subtotalCents + (shippingCents ?? 0);

  return (
    <div className="flex flex-col gap-3 border-t border-beige px-5 py-5">
      <div className="flex items-center justify-between text-body-sm text-taupe">
        <span>Subtotal</span>
        <span className="text-espresso">{formatPrice(subtotalCents)}</span>
      </div>
      <div className="flex items-center justify-between text-body-sm text-taupe">
        <span>Shipping</span>
        <span className="text-espresso">{shippingLabel}</span>
      </div>
      <div className="flex items-center justify-between border-t border-beige pt-3 text-body-md font-medium text-espresso">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Button variant="primary" onClick={onCheckout} className="mt-1 w-full">
        Checkout
      </Button>
    </div>
  );
}
