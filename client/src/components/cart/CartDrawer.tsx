import { ShoppingBag } from 'lucide-react';
import { Drawer } from '@/components/common/Drawer';
import { EmptyState } from '@/components/common/EmptyState';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import type { CartLineItem } from '@/types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartLineItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartDrawer({ isOpen, onClose, items, onQuantityChange, onRemove }: CartDrawerProps) {
  const subtotalCents = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Your bag" side="right">
      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Your bag is empty"
          description="Fragrances you add will appear here."
          action={{ label: 'Continue shopping', onClick: onClose }}
        />
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1 divide-y divide-beige overflow-y-auto px-5">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
            ))}
          </div>
          <CartSummary subtotalCents={subtotalCents} />
        </div>
      )}
    </Drawer>
  );
}
