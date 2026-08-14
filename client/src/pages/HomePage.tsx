import { Link } from 'react-router-dom';
import { Truck, Leaf, RotateCcw } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { ConnectionStatus } from '@/components/common/ConnectionStatus';
import { BrandDivider } from '@/components/common/BrandDivider';
import { Button, buttonClasses } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import { ROUTES } from '@/constants/routes';
import { APP_NAME } from '@/constants/config';

const VALUE_CARDS = [
  { icon: Truck, title: 'Complimentary Shipping', description: 'On every order, no minimum.' },
  { icon: Leaf, title: 'Considered Packaging', description: 'Recyclable materials throughout.' },
  { icon: RotateCcw, title: '60-Day Returns', description: 'Try it at home, risk-free.' },
];

export function HomePage() {
  return (
    <>
      <Container className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
        <span className="text-label uppercase tracking-[0.3em] text-taupe">Eau de Parfum &amp; Beyond</span>
        <h1 className="font-serif text-display-md text-espresso sm:text-display-lg">{APP_NAME}</h1>
        <BrandDivider />
        <p className="max-w-md text-body-md text-taupe">
          The foundation is live — a design system built for a real fragrance house. The full
          storefront experience arrives in the parts ahead.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to={ROUTES.SHOP} className={buttonClasses('primary', 'md')}>
            Shop the Collection
          </Link>
          <Link to={ROUTES.ABOUT} className={buttonClasses('outline', 'md')}>
            Our Story
          </Link>
        </div>
        <ConnectionStatus />
      </Container>

      <div className="border-t border-beige bg-cream">
        <Container className="py-20">
          <div className="mb-10 flex flex-col items-center gap-2 text-center">
            <span className="text-label uppercase tracking-[0.2em] text-taupe">Design System Preview</span>
            <h2 className="font-serif text-heading-lg text-espresso">Foundation Components</h2>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="accent">Accent</Button>
          </div>

          <div className="mb-14 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="new">New</Badge>
            <Badge variant="bestseller">Bestseller</Badge>
            <Badge variant="sale">Sale</Badge>
            <Badge variant="featured">Featured</Badge>
            <Badge variant="lowStock">Low Stock</Badge>
            <Badge variant="outOfStock">Out of Stock</Badge>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {VALUE_CARDS.map(({ icon: Icon, title, description }) => (
              <Card key={title} interactive className="flex flex-col items-center gap-2 text-center">
                <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                <p className="text-body-sm font-medium text-espresso">{title}</p>
                <p className="text-body-sm text-taupe">{description}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
