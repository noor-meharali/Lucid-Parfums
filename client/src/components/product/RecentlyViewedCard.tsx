import { Link } from 'react-router-dom';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { productPath } from '@/constants/routes';
import { formatPrice } from '@/utils/formatPrice';
import type { RecentlyViewedItem } from '@/hooks/useRecentlyViewed';

interface RecentlyViewedCardProps {
  item: RecentlyViewedItem;
}

export function RecentlyViewedCard({ item }: RecentlyViewedCardProps) {
  return (
    <Link to={productPath(item.slug)} className="flex flex-col gap-2">
      <ResponsiveImage src={item.imageUrl} alt={item.imageAlt} aspectRatio="3/4" containerClassName="rounded-md" />
      <span className="text-label uppercase tracking-[0.08em] text-taupe">{item.category}</span>
      <span className="font-serif text-heading-sm text-espresso">{item.name}</span>
      <span className="text-body-sm text-espresso">
        {formatPrice(item.salePriceCents ?? item.priceCents)}
      </span>
    </Link>
  );
}
