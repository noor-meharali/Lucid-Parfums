import { PackageSearch } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  onClearFilters?: () => void;
}

const SKELETON_COUNT = 8;

/**
 * The shared loading/error/empty/grid composition for every place
 * that lists products — Shop and all four collection pages fetch
 * through `useProducts` and hand the result straight to this,
 * instead of duplicating this state handling per page.
 */
export function ProductGrid({ products, isLoading, error, onRetry, onClearFilters }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState variant="server" description={error} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackageSearch className="h-8 w-8" />}
        title="No products found"
        description="Try adjusting your filters or search terms."
        action={onClearFilters ? { label: 'Clear filters', onClick: onClearFilters } : undefined}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
