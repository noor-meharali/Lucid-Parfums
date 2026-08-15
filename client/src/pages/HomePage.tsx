import { Hero } from '@/components/home/Hero';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { Benefits } from '@/components/home/Benefits';
import { BrandStory } from '@/components/home/BrandStory';
import { Testimonials } from '@/components/home/Testimonials';
import { Container } from '@/components/common/Container';
import { ProductSection } from '@/components/product/ProductSection';
import { mockProducts } from '@/data/mockProducts';
import { ROUTES } from '@/constants/routes';

const featuredProducts = mockProducts.filter((product) => product.badges?.includes('featured'));
const newArrivals = mockProducts.filter((product) => product.badges?.includes('new'));
const bestSellers = mockProducts.filter((product) => product.badges?.includes('bestseller'));

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoryTiles />

      <div className="bg-ivory py-20">
        <Container>
          <ProductSection
            eyebrow="Curated Edit"
            title="Featured"
            products={featuredProducts}
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
            products={newArrivals}
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
            products={bestSellers}
            viewAllHref={ROUTES.SHOP}
          />
        </Container>
      </div>

      <Testimonials />
    </>
  );
}
