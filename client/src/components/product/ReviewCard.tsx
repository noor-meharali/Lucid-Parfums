import { Star, BadgeCheck } from 'lucide-react';
import type { Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex flex-col gap-2 border-b border-beige py-6 last:border-b-0">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={index < review.rating ? 'h-4 w-4 fill-gold text-gold' : 'h-4 w-4 text-beige'}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{review.rating} out of 5 stars</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-body-sm font-medium text-espresso">{review.authorName}</span>
        {review.verifiedPurchase && (
          <span className="inline-flex items-center gap-1 text-label uppercase tracking-[0.06em] text-success">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Verified Purchase
          </span>
        )}
        <span className="text-body-sm text-taupe">· {formatDate(review.createdAt)}</span>
      </div>
      <p className="text-body-md text-espresso">{review.comment}</p>
    </article>
  );
}
