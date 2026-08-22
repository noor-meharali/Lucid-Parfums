import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@/components/common/Drawer';
import { EmptyState } from '@/components/common/EmptyState';
import { Spinner } from '@/components/common/Spinner';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { ROUTES } from '@/constants/routes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotalCents, isLoading, updateItem, removeItem } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function handleQuantityChange(itemId: string, quantity: number) {
    try {
      await updateItem(itemId, quantity);
    } catch (error) {
      showToast('error', error instanceof Error ? error.message : 'Could not update quantity.');
    }
  }

  async function handleRemove(itemId: string) {
    try {
      await removeItem(itemId);
    } catch (error) {
      showToast('error', error instanceof Error ? error.message : 'Could not remove item.');
    }
  }

  function handleCheckout() {
    onClose();
    navigate(ROUTES.CHECKOUT);
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Your Bag" side="right">
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-16">
          <Spinner className="h-6 w-6" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Your bag is empty"
          description="Fragrances you add will appear here."
          action={{ label: 'Continue shopping', onClick: () => { onClose(); navigate(ROUTES.SHOP); } }}
        />
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex-1 divide-y divide-beige overflow-y-auto px-5">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
            ))}
          </div>
          <CartSummary subtotalCents={subtotalCents} onCheckout={handleCheckout} />
        </div>
      )}
    </Drawer>
  );
}
