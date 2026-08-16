import { GENDER_OPTIONS, FRAGRANCE_FAMILY_OPTIONS } from '@/constants/product';
import { Radio } from '@/components/form/Radio';
import { Select } from '@/components/form/Select';
import { Input } from '@/components/form/Input';
import { Checkbox } from '@/components/form/Checkbox';
import { Button } from '@/components/common/Button';
import type { FragranceFamily, ProductGender } from '@/types/product';

export interface ProductFilterValues {
  gender?: ProductGender;
  fragranceFamily?: FragranceFamily;
  minPrice?: number;
  maxPrice?: number;
  inStock: boolean;
}

interface ProductFilterPanelProps {
  values: ProductFilterValues;
  onChange: (patch: Partial<ProductFilterValues>) => void;
  onClear: () => void;
  showGenderFilter?: boolean;
}

/**
 * The filter form shared by the Shop page (desktop sidebar / mobile
 * drawer) and reusable anywhere else product filtering is needed.
 * Purely controlled — the caller owns state and URL syncing.
 */
export function ProductFilterPanel({ values, onChange, onClear, showGenderFilter = true }: ProductFilterPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      {showGenderFilter && (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 text-label uppercase tracking-[0.08em] text-taupe">Gender</legend>
          <Radio
            name="gender"
            label="All"
            checked={values.gender === undefined}
            onChange={() => onChange({ gender: undefined })}
          />
          {GENDER_OPTIONS.map((option) => (
            <Radio
              key={option.value}
              name="gender"
              label={option.label}
              checked={values.gender === option.value}
              onChange={() => onChange({ gender: option.value })}
            />
          ))}
        </fieldset>
      )}

      <Select
        label="Fragrance Family"
        placeholder="All families"
        value={values.fragranceFamily ?? ''}
        onChange={(event) =>
          onChange({ fragranceFamily: (event.target.value || undefined) as FragranceFamily | undefined })
        }
        options={FRAGRANCE_FAMILY_OPTIONS}
      />

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 text-label uppercase tracking-[0.08em] text-taupe">Price</legend>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            aria-label="Minimum price"
            placeholder="Min"
            min={0}
            value={values.minPrice ?? ''}
            onChange={(event) =>
              onChange({ minPrice: event.target.value ? Number(event.target.value) : undefined })
            }
          />
          <span className="text-taupe">–</span>
          <Input
            type="number"
            inputMode="numeric"
            aria-label="Maximum price"
            placeholder="Max"
            min={0}
            value={values.maxPrice ?? ''}
            onChange={(event) =>
              onChange({ maxPrice: event.target.value ? Number(event.target.value) : undefined })
            }
          />
        </div>
      </fieldset>

      <Checkbox
        label="In stock only"
        checked={values.inStock}
        onChange={(event) => onChange({ inStock: event.target.checked })}
      />

      <Button variant="ghost" size="sm" onClick={onClear} className="self-start">
        Clear filters
      </Button>
    </div>
  );
}
