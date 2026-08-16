import { useState } from 'react';
import { Container } from '@/components/common/Container';
import { SortSelect } from '@/components/product/SortSelect';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Pagination } from '@/components/product/Pagination';
import { useProducts } from '@/hooks/useProducts';
import { DEFAULT_PAGE_SIZE } from '@/constants/product';
import type { ProductGender, ProductListParams } from '@/types/product';

interface CategoryPageProps {
  title: string;
  description: string;
  /** Omit for a collection that spans every gender (e.g. "Fragrance"). */
  gender?: ProductGender;
}

/**
 * Shared page for the four top-level collection routes (/men,
 * /women, /unisex, /fragrance). Each one just fetches through the
 * same `useProducts` hook with a different `gender` — no per-page
 * fetching logic to duplicate.
 */
export function CategoryPage({ title, description, gender }: CategoryPageProps) {
  const [sort, setSort] = useState<NonNullable<ProductListParams['sort']>>('newest');
  const [page, setPage] = useState(1);

  const { products, pagination, isLoading, error } = useProducts({
    gender,
    sort,
    page,
    limit: DEFAULT_PAGE_SIZE,
  });

  function handleSortChange(nextSort: NonNullable<ProductListParams['sort']>) {
    setSort(nextSort);
    setPage(1);
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-label uppercase tracking-[0.2em] text-taupe">Collection</span>
        <h1 className="font-serif text-display-md text-espresso">{title}</h1>
        <p className="max-w-xl text-body-sm text-taupe">{description}</p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <p className="text-body-sm text-taupe" aria-live="polite">
          {isLoading ? 'Loading…' : `${pagination?.total ?? 0} product${pagination?.total === 1 ? '' : 's'}`}
        </p>
        <SortSelect value={sort} onChange={handleSortChange} />
      </div>

      <div className="flex flex-col gap-8">
        <ProductGrid products={products} isLoading={isLoading} error={error} />
        {pagination && (
          <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
        )}
      </div>
    </Container>
  );
}
