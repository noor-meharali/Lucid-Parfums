import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import { Drawer } from '@/components/common/Drawer';
import { ProductFilterPanel, type ProductFilterValues } from '@/components/product/ProductFilterPanel';
import { SortSelect } from '@/components/product/SortSelect';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Pagination } from '@/components/product/Pagination';
import { useProducts } from '@/hooks/useProducts';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { DEFAULT_PAGE_SIZE } from '@/constants/product';
import type { FragranceFamily, ProductGender, ProductListParams } from '@/types/product';

function parseParams(searchParams: URLSearchParams): ProductListParams & { page: number } {
  const page = Number(searchParams.get('page') ?? '1');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: DEFAULT_PAGE_SIZE,
    gender: (searchParams.get('gender') as ProductGender | null) ?? undefined,
    fragranceFamily: (searchParams.get('fragranceFamily') as FragranceFamily | null) ?? undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    inStock: searchParams.get('inStock') === 'true',
    search: searchParams.get('search') ?? undefined,
    sort: (searchParams.get('sort') as ProductListParams['sort']) ?? 'newest',
  };
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const debouncedSearch = useDebouncedValue(searchInput);

  const params = useMemo(() => parseParams(searchParams), [searchParams]);

  // Sync the debounced search text into the URL once typing settles.
  useMemo(() => {
    if (debouncedSearch === (searchParams.get('search') ?? '')) return;
    const next = new URLSearchParams(searchParams);
    if (debouncedSearch) next.set('search', debouncedSearch);
    else next.delete('search');
    next.delete('page');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { products, pagination, isLoading, error } = useProducts(params);

  function updateFilters(patch: Partial<ProductFilterValues>) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined || value === false) next.delete(key);
      else next.set(key, String(value));
    }
    next.delete('page');
    setSearchParams(next);
  }

  function updateSort(sort: NonNullable<ProductListParams['sort']>) {
    const next = new URLSearchParams(searchParams);
    next.set('sort', sort);
    next.delete('page');
    setSearchParams(next);
  }

  function updatePage(page: number) {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearFilters() {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  }

  const filterValues: ProductFilterValues = {
    gender: params.gender,
    fragranceFamily: params.fragranceFamily,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    inStock: params.inStock ?? false,
  };

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-2">
        <span className="text-label uppercase tracking-[0.2em] text-taupe">The Collection</span>
        <h1 className="font-serif text-display-md text-espresso">Shop</h1>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          aria-label="Search fragrances"
          placeholder="Search fragrances…"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onClear={() => setSearchInput('')}
          className="sm:max-w-xs"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md" className="lg:hidden" onClick={() => setIsFilterDrawerOpen(true)}>
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
          </Button>
          <SortSelect value={params.sort ?? 'newest'} onChange={updateSort} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <ProductFilterPanel values={filterValues} onChange={updateFilters} onClear={clearFilters} />
        </aside>

        <div className="flex flex-col gap-8">
          <p className="text-body-sm text-taupe" aria-live="polite">
            {isLoading ? 'Loading…' : `${pagination?.total ?? 0} product${pagination?.total === 1 ? '' : 's'}`}
          </p>

          <ProductGrid products={products} isLoading={isLoading} error={error} onClearFilters={clearFilters} />

          {pagination && (
            <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={updatePage} />
          )}
        </div>
      </div>

      <Drawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)} title="Filters" side="left">
        <div className="p-5">
          <ProductFilterPanel
            values={filterValues}
            onChange={updateFilters}
            onClear={() => {
              clearFilters();
              setIsFilterDrawerOpen(false);
            }}
          />
        </div>
      </Drawer>
    </Container>
  );
}
