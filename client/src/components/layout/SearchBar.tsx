import { useState } from 'react';
import { Loader2, SearchX } from 'lucide-react';
import { Input } from '@/components/form/Input';

interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
  isLoading?: boolean;
  autoFocus?: boolean;
}

/**
 * Reusable search UI. Not wired to the product catalog yet — that
 * connects once the search API exists. For now it demonstrates the
 * input, clear, loading, and empty-state architecture the connected
 * version will reuse unchanged.
 */
export function SearchBar({ variant = 'desktop', isLoading = false, autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <div className={variant === 'desktop' ? 'w-full max-w-sm' : 'w-full'}>
      <div className="relative">
        <Input
          type="search"
          aria-label="Search fragrances"
          placeholder="Search fragrances…"
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery('')}
        />
        {isLoading && (
          <Loader2
            className="pointer-events-none absolute right-11 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-taupe"
            aria-hidden="true"
          />
        )}
      </div>
      {query.length > 0 && (
        <div className="mt-3 flex items-center gap-2 rounded-md border border-beige bg-cream px-4 py-3 text-body-sm text-taupe">
          <SearchX className="h-4 w-4 shrink-0" aria-hidden="true" />
          Search will connect to the catalog in an upcoming part.
        </div>
      )}
    </div>
  );
}
