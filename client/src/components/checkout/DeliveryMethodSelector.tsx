import { Radio } from '@/components/form/Radio';
import { formatPrice } from '@/utils/formatPrice';
import type { DeliveryMethod } from '@/types/deliveryMethod';

interface DeliveryMethodSelectorProps {
  methods: DeliveryMethod[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DeliveryMethodSelector({ methods, selectedId, onSelect }: DeliveryMethodSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      {methods.map((method) => (
        <label
          key={method.id}
          className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-beige p-4 has-[:checked]:border-espresso"
        >
          <div className="flex items-start gap-3">
            <Radio name="deliveryMethod" checked={selectedId === method.id} onChange={() => onSelect(method.id)} label="" className="mt-0.5" />
            <div className="text-body-sm text-espresso">
              <p className="font-medium">{method.name}</p>
              {method.estimatedDays && <p className="text-taupe">{method.estimatedDays}</p>}
              {method.description && <p className="text-taupe">{method.description}</p>}
            </div>
          </div>
          <span className="text-body-sm font-medium text-espresso">{formatPrice(method.priceCents)}</span>
        </label>
      ))}
    </div>
  );
}
