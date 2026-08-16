import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/common/Skeleton';
import type { Product } from '@/types/product';

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  products: Product[];
  isLoading?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
}

/**
 * A titled row of products with an optional "View all" link — the
 * shared shape behind Featured, New Arrivals, and Best Sellers.
 * Category listing pages can reuse this once they need the same
 * heading + grid pattern.
 */
export function ProductSection({
  eyebrow,
  title,
  products,
  isLoading = false,
  viewAllHref,
  viewAllLabel = 'View all',
}: ProductSectionProps) {
  if (!isLoading && products.length === 0) return null;

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-label uppercase tracking-[0.2em] text-taupe">{eyebrow}</span>
          <h2 className="mt-1 font-serif text-heading-lg text-espresso">{title}</h2>
        </div>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="group inline-flex items-center gap-1.5 text-body-sm font-medium text-espresso transition-colors hover:text-gold"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
