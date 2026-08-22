import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { Badge, type BadgeVariant } from '@/components/common/Badge';
import { IconButton } from '@/components/common/IconButton';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRequireAuthAction } from '@/hooks/useRequireAuthAction';
import { useToast } from '@/context/ToastContext';
import { productPath } from '@/constants/routes';
import { formatPrice } from '@/utils/formatPrice';
import { cn } from '@/utils/cn';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const STOCK_BADGE: Record<Product['stock'], BadgeVariant | null> = {
  inStock: null,
  lowStock: 'lowStock',
  outOfStock: 'outOfStock',
};

const STOCK_LABEL: Record<Product['stock'], string> = {
  inStock: '',
  lowStock: 'Only a few left',
  outOfStock: 'Out of stock',
};

export function ProductCard({ product }: ProductCardProps) {
  const stockBadge = STOCK_BADGE[product.stock];
  const isOutOfStock = product.stock === 'outOfStock';
  const onSale = product.salePriceCents !== undefined;

  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isWishlisted, toggleProduct } = useWishlist();
  const requireAuthAction = useRequireAuthAction();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    // A sized product needs an explicit size choice — send the
    // customer to the product page rather than guessing one for them.
    if (product.sizes.length > 0) {
      navigate(productPath(product.slug));
      return;
    }

    requireAuthAction(async () => {
      setIsAdding(true);
      try {
        await addItem(product.id, 1);
        showToast('success', `${product.name} added to cart.`);
      } catch (error) {
        showToast('error', error instanceof Error ? error.message : 'Could not add to cart.');
      } finally {
        setIsAdding(false);
      }
    });
  }

  function handleToggleWishlist() {
    requireAuthAction(async () => {
      try {
        await toggleProduct(product.id);
      } catch (error) {
        showToast('error', error instanceof Error ? error.message : 'Could not update your wishlist.');
      }
    });
  }

  return (
    <div className="group relative flex flex-col">
      <div className="relative">
        <Link to={productPath(product.slug)} className="block" tabIndex={-1}>
          <ResponsiveImage
            src={product.imageUrl}
            alt={product.imageAlt}
            aspectRatio="3/4"
            containerClassName="rounded-md"
            className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges?.map((badge) => (
            <Badge key={badge} variant={badge}>
              {badge}
            </Badge>
          ))}
          {stockBadge && <Badge variant={stockBadge}>{STOCK_LABEL[product.stock]}</Badge>}
        </div>

        <IconButton
          label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={handleToggleWishlist}
          className="absolute right-2 top-2 bg-ivory/90 shadow-soft hover:bg-ivory"
        >
          <Heart
            className={cn('h-4 w-4', wishlisted ? 'fill-destructive text-destructive' : 'text-espresso')}
            aria-hidden="true"
          />
        </IconButton>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={cn(
            'absolute inset-x-2 bottom-2 flex h-10 items-center justify-center gap-2 rounded-pill bg-charcoal/90 text-body-sm text-ivory backdrop-blur-sm transition-opacity duration-200',
            'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100',
            'disabled:cursor-not-allowed disabled:opacity-0',
          )}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {product.sizes.length > 0 ? 'Select size' : 'Add to cart'}
        </button>
      </div>

      <Link to={productPath(product.slug)} className="mt-3 flex flex-col gap-1">
        <span className="text-label uppercase tracking-[0.08em] text-taupe">{product.category}</span>
        <span className="font-serif text-heading-sm text-espresso">{product.name}</span>
        <span className="flex items-center gap-1 text-body-sm text-taupe">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
          {product.rating.toFixed(1)}
          <span className="text-taupe/70">({product.reviewCount})</span>
        </span>
        <span className="flex items-center gap-2 text-body-md">
          {onSale ? (
            <>
              <span className="font-medium text-destructive">{formatPrice(product.salePriceCents!)}</span>
              <span className="text-taupe line-through">{formatPrice(product.priceCents)}</span>
            </>
          ) : (
            <span className="font-medium text-espresso">{formatPrice(product.priceCents)}</span>
          )}
        </span>
      </Link>
    </div>
  );
}
