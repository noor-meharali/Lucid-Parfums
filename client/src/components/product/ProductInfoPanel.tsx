import { useState } from 'react';
import { Star, Heart, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { QuantityControl } from '@/components/cart/QuantityControl';
import { SizeSelector } from '@/components/product/SizeSelector';
import { StockIndicator } from '@/components/product/StockIndicator';
import { useToast } from '@/context/ToastContext';
import { GENDER_LABELS } from '@/constants/product';
import { formatPrice } from '@/utils/formatPrice';
import { cn } from '@/utils/cn';
import type { Product, ProductSize } from '@/types/product';

interface ProductInfoPanelProps {
  product: Product;
}

/**
 * The purchase column: pricing, stock, size/quantity selection, and
 * the add-to-cart/buy-now/wishlist actions. There is no cart store
 * yet (a later part), so these actions give honest feedback instead
 * of pretending an order or persistent cart exists — but the
 * interface (product, quantity, size in scope for every handler) is
 * exactly what a real cart integration will need.
 */
export function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  const { showToast } = useToast();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes.find((size) => size.stock > 0) ?? product.sizes[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isOutOfStock = product.stock === 'outOfStock' || (selectedSize ? selectedSize.stock <= 0 : false);
  const onSale = product.salePriceCents !== undefined;
  const discountPercent = onSale
    ? Math.round(((product.priceCents - product.salePriceCents!) / product.priceCents) * 100)
    : 0;
  const maxQuantity = Math.min(10, selectedSize?.stock ?? 10);

  function handlePurchaseAction(action: 'cart' | 'buy') {
    showToast('info', action === 'cart' ? 'Cart is coming in an upcoming part.' : 'Checkout is coming in an upcoming part.');
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-label uppercase tracking-[0.15em] text-taupe">
          {product.brand} · {GENDER_LABELS[product.gender]} · {product.category}
        </span>
        <h1 className="font-serif text-display-md text-espresso">{product.name}</h1>

        {product.reviewCount > 0 && (
          <a href="#reviews" className="inline-flex items-center gap-1.5 text-body-sm text-taupe hover:text-espresso">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
            {product.rating.toFixed(1)}
            <span className="underline underline-offset-2">
              {product.reviewCount} review{product.reviewCount === 1 ? '' : 's'}
            </span>
          </a>
        )}
      </div>

      <div className="flex items-center gap-3">
        {onSale ? (
          <>
            <span className="font-serif text-heading-lg text-destructive">
              {formatPrice(product.salePriceCents!)}
            </span>
            <span className="text-body-md text-taupe line-through">{formatPrice(product.priceCents)}</span>
            <span className="rounded-sm bg-destructive-soft px-2 py-0.5 text-label font-medium text-destructive">
              −{discountPercent}%
            </span>
          </>
        ) : (
          <span className="font-serif text-heading-lg text-espresso">{formatPrice(product.priceCents)}</span>
        )}
      </div>

      <StockIndicator stock={product.stock} />

      <p className="text-body-md text-taupe">
        {product.description.length > 180 ? `${product.description.slice(0, 180)}…` : product.description}
      </p>

      <SizeSelector sizes={product.sizes} selected={selectedSize} onChange={setSelectedSize} />

      <div className="flex items-center gap-4">
        <span className="text-body-sm font-medium text-espresso">Quantity</span>
        <QuantityControl quantity={quantity} onChange={setQuantity} max={Math.max(1, maxQuantity)} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={isOutOfStock}
          onClick={() => handlePurchaseAction('cart')}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Add to Cart
        </Button>
        <Button
          variant="dark"
          size="lg"
          className="flex-1"
          disabled={isOutOfStock}
          onClick={() => handlePurchaseAction('buy')}
        >
          <Zap className="h-4 w-4" aria-hidden="true" />
          Buy Now
        </Button>
        <Button
          variant="outline"
          size="lg"
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((prev) => !prev)}
          className="sm:w-14 sm:flex-none sm:px-0"
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-destructive text-destructive')} aria-hidden="true" />
          <span className="sm:hidden">{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
        </Button>
      </div>

      <p className="text-label text-taupe">SKU: {product.sku}</p>
    </div>
  );
}
