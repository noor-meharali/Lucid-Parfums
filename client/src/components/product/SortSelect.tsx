import { Select } from '@/components/form/Select';
import { SORT_OPTIONS } from '@/constants/product';
import type { ProductListParams } from '@/types/product';

interface SortSelectProps {
  value: NonNullable<ProductListParams['sort']>;
  onChange: (sort: NonNullable<ProductListParams['sort']>) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select
      aria-label="Sort products"
      value={value}
      onChange={(event) => onChange(event.target.value as NonNullable<ProductListParams['sort']>)}
      options={SORT_OPTIONS}
      className="h-10"
    />
  );
}
