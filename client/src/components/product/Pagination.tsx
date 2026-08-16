import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/components/common/IconButton';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Deliberately simple — previous/next plus a page indicator — so it
 * stays usable at any viewport width rather than needing a separate
 * mobile layout for a row of numbered page buttons.
 */
export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4 pt-4">
      <IconButton
        label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="border border-beige disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </IconButton>
      <span className="text-body-sm text-taupe" aria-live="polite">
        Page {page} of {totalPages}
      </span>
      <IconButton
        label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="border border-beige disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </IconButton>
    </nav>
  );
}
