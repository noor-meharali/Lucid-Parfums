import { RecentlyViewedCard } from '@/components/product/RecentlyViewedCard';
import type { RecentlyViewedItem } from '@/hooks/useRecentlyViewed';

interface RecentlyViewedSectionProps {
  items: RecentlyViewedItem[];
}

export function RecentlyViewedSection({ items }: RecentlyViewedSectionProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <span className="text-label uppercase tracking-[0.2em] text-taupe">Your History</span>
      <h2 className="mt-1 mb-8 font-serif text-heading-lg text-espresso">Recently Viewed</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <RecentlyViewedCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
