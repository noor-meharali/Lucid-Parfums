import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Every link must point at a real route; the final (current-page)
 * item is rendered as plain text, not a link. On very small screens
 * only the last two levels show, so the trail never wraps or overflows.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-body-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-taupe">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHiddenOnMobile = items.length > 2 && index < items.length - 2;

          return (
            <li key={`${item.label}-${index}`} className={cn('flex items-center gap-1.5', isHiddenOnMobile && 'hidden sm:flex')}>
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
              {item.to && !isLast ? (
                <Link to={item.to} className="transition-colors hover:text-espresso">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-espresso' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
