import { Link } from 'react-router-dom';
import { buttonClasses } from '@/components/common/Button';
import { HeroIllustration } from '@/components/home/HeroIllustration';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants/routes';

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-beige bg-ivory">
      <Container className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="text-label uppercase tracking-[0.3em] text-taupe">New Season Collection</span>
          <h1 className="max-w-lg font-serif text-display-md text-espresso sm:text-display-lg">
            Fragrance, composed with restraint.
          </h1>
          <p className="max-w-md text-body-md text-taupe">
            Each Lucid Parfums scent is built around a single idea, worn close rather than
            projected loud. Discover the collection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link to={ROUTES.SHOP} className={buttonClasses('primary', 'lg')}>
              Shop the Collection
            </Link>
            <Link to={ROUTES.ABOUT} className={buttonClasses('outline', 'lg')}>
              Our Story
            </Link>
          </div>
        </div>

        <div className="mx-auto h-72 w-72 sm:h-96 sm:w-96 lg:h-[28rem] lg:w-[28rem]">
          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}
