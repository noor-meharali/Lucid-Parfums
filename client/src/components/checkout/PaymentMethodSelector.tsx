import { Radio } from '@/components/form/Radio';
import type { PaymentMethod } from '@/types/order';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

/**
 * Online payment is shown — the architecture supports it — but not
 * selectable yet: no payment gateway is integrated, and marking an
 * order "paid" without one actually collecting payment would be
 * exactly the kind of faked success this part's spec forbids.
 */
export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3 rounded-md border border-beige p-4 has-[:checked]:border-espresso">
        <Radio name="paymentMethod" checked={selected === 'cod'} onChange={() => onSelect('cod')} label="" />
        <span className="text-body-sm font-medium text-espresso">Cash on Delivery</span>
      </label>
      <label className="flex cursor-not-allowed items-center justify-between gap-3 rounded-md border border-beige p-4 opacity-50">
        <span className="flex items-center gap-3">
          <Radio name="paymentMethod" checked={false} disabled onChange={() => {}} label="" />
          <span className="text-body-sm font-medium text-espresso">Online Payment</span>
        </span>
        <span className="text-label uppercase tracking-[0.06em] text-taupe">Coming soon</span>
      </label>
    </div>
  );
}
