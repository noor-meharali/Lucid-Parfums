import { Star } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';

interface Testimonial {
  quote: string;
  name: string;
  rating: number;
}

/**
 * Illustrative customer quotes for the storefront foundation — not
 * sourced from real reviews. Swap for real review data once a
 * reviews feature exists.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Ambre Noir lasted through a full workday and still got compliments at dinner. Not a single note felt like it was fighting for attention.',
    name: 'Amara K.',
    rating: 5,
  },
  {
    quote: 'The first fragrance house that felt made for someone who prefers quiet over statement. Jardin Blanc is exactly what it promises.',
    name: 'Priya S.',
    rating: 5,
  },
  {
    quote: 'Ordered Vétiver Fumé on a whim and now it is the only thing I reach for. The packaging alone made it feel worth the price.',
    name: 'Daniel R.',
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="bg-ivory py-20">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="text-label uppercase tracking-[0.2em] text-taupe">In Their Words</span>
          <h2 className="font-serif text-heading-lg text-espresso">What People Are Saying</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.name} padding="lg" className="flex flex-col gap-4">
              <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={
                      index < testimonial.rating ? 'h-3.5 w-3.5 fill-gold text-gold' : 'h-3.5 w-3.5 text-beige'
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-body-sm text-espresso/90">&ldquo;{testimonial.quote}&rdquo;</p>
              <span className="text-body-sm font-medium text-taupe">{testimonial.name}</span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
