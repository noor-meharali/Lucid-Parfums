import { Star } from 'lucide-react';
import type { ReviewStats } from '@/types/review';

interface RatingDistributionProps {
  stats: ReviewStats;
}

export function RatingDistribution({ stats }: RatingDistributionProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
      <div className="flex flex-col items-center gap-1 sm:items-start">
        <span className="font-serif text-display-md text-espresso">{stats.average.toFixed(1)}</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={index < Math.round(stats.average) ? 'h-4 w-4 fill-gold text-gold' : 'h-4 w-4 text-beige'}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-body-sm text-taupe">
          {stats.count} review{stats.count === 1 ? '' : 's'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const count = stats.distribution[String(star) as keyof ReviewStats['distribution']];
          const percent = stats.count > 0 ? Math.round((count / stats.count) * 100) : 0;

          return (
            <div key={star} className="flex items-center gap-3 text-body-sm text-taupe">
              <span className="w-10 shrink-0">{star} star</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-beige">
                <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
