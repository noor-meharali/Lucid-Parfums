import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { buttonClasses } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Spinner } from '@/components/common/Spinner';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { ROUTES } from '@/constants/routes';

export function CartPage() {
  const { items, subtotalCents, isLoading, updateItem, removeItem, clearCart } = useCart();
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

  async function handleClear() {
    try {
      await clearCart();
    } catch (error) {
      showToast('error', error instanceof Error ? error.message : 'Could not clear cart.');
    }
  }

  if (isLoading) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-16">
        <Spinner className="h-6 w-6" />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Your bag is empty"
          description="Fragrances you add will appear here."
          action={{ label: 'Continue Shopping', onClick: () => navigate(ROUTES.SHOP) }}
        />
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="font-serif text-display-md text-espresso">Your Bag</h1>
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 text-body-sm text-taupe transition-colors hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear bag
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-beige border-y border-beige">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
          ))}
        </div>

        <div className="h-fit rounded-md border border-beige">
          <CartSummary subtotalCents={subtotalCents} onCheckout={() => navigate(ROUTES.CHECKOUT)} />
        </div>
      </div>

      <Link to={ROUTES.SHOP} className={buttonClasses('outline', 'md', 'mt-10')}>
        Continue Shopping
      </Link>
    </Container>
  );
}
