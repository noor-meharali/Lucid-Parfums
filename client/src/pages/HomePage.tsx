import { Hero } from '@/components/home/Hero';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { Benefits } from '@/components/home/Benefits';
import { BrandStory } from '@/components/home/BrandStory';
import { Testimonials } from '@/components/home/Testimonials';
import { Container } from '@/components/common/Container';
import { ProductSection } from '@/components/product/ProductSection';
import { useProducts } from '@/hooks/useProducts';
import { ROUTES } from '@/constants/routes';

const ROW_LIMIT = 4;

export function HomePage() {
  const featured = useProducts({ featured: true, limit: ROW_LIMIT, sort: 'newest' });
  const newArrivals = useProducts({ newArrival: true, limit: ROW_LIMIT, sort: 'newest' });
  const bestSellers = useProducts({ bestSeller: true, limit: ROW_LIMIT, sort: 'popularity' });

  return (
    <>
      <Hero />
      <CategoryTiles />

      <div className="bg-ivory py-20">
        <Container>
          <ProductSection
            eyebrow="Curated Edit"
            title="Featured"
            products={featured.products}
            isLoading={featured.isLoading}
            viewAllHref={ROUTES.SHOP}
          />
        </Container>
      </div>

      <Benefits />

      <div className="bg-ivory py-20">
        <Container>
          <ProductSection
            eyebrow="Just In"
            title="New Arrivals"
            products={newArrivals.products}
            isLoading={newArrivals.isLoading}
            viewAllHref={ROUTES.SHOP}
          />
        </Container>
      </div>

      <BrandStory />

      <div className="bg-cream py-20">
        <Container>
          <ProductSection
            eyebrow="Customer Favorites"
            title="Best Sellers"
            products={bestSellers.products}
            isLoading={bestSellers.isLoading}
            viewAllHref={ROUTES.SHOP}
          />
        </Container>
      </div>

      <Testimonials />
    </>
  );
}
