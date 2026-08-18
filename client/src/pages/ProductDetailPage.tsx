import { useParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { PageLoader } from '@/components/common/Spinner';
import { ErrorState } from '@/components/common/ErrorState';
import { Button } from '@/components/common/Button';
import { Breadcrumbs } from '@/components/product/Breadcrumbs';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfoPanel } from '@/components/product/ProductInfoPanel';
import { FragranceNotesSection } from '@/components/product/FragranceNotesSection';
import { IngredientsSection } from '@/components/product/IngredientsSection';
import { PurchaseAssurance } from '@/components/product/PurchaseAssurance';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { RecentlyViewedSection } from '@/components/product/RecentlyViewedSection';
import { ProductSection } from '@/components/product/ProductSection';
import { useProduct } from '@/hooks/useProduct';
import { useProductSeo } from '@/hooks/useProductSeo';
import { useRelatedProducts } from '@/hooks/useRelatedProducts';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useToast } from '@/context/ToastContext';
import { ROUTES } from '@/constants/routes';
import { GENDER_LABELS, GENDER_ROUTES } from '@/constants/product';
import { formatPrice } from '@/utils/formatPrice';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, isLoading, error } = useProduct(slug);
  const { products: related, isLoading: isLoadingRelated } = useRelatedProducts(slug);
  const { showToast } = useToast();

  useProductSeo(product);

  const recentlyViewed = useRecentlyViewed(
    product
      ? {
          slug: product.slug,
          name: product.name,
          imageUrl: product.imageUrl,
          imageAlt: product.imageAlt,
          category: product.category,
          priceCents: product.priceCents,
          salePriceCents: product.salePriceCents,
        }
      : undefined,
  );

  if (isLoading) return <PageLoader label="Loading product" />;

  if (error === 'not-found' || !product) {
    return (
      <Container className="py-24">
        <ErrorState variant="notFound" title="Product not found" description="This product may have been removed or the link is incorrect." />
      </Container>
    );
  }

  if (error === 'server') {
    return (
      <Container className="py-24">
        <ErrorState variant="server" onRetry={() => window.location.reload()} />
      </Container>
    );
  }

  const genderLabel = GENDER_LABELS[product.gender];

  return (
    <Container className="py-8 pb-28 sm:py-12 sm:pb-12">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: genderLabel, to: GENDER_ROUTES[product.gender] },
          { label: product.category },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images.length > 0 ? product.images : [product.imageUrl]} alt={product.imageAlt} />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductInfoPanel product={product} />
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-16">
        <section>
          <h2 className="font-serif text-heading-lg text-espresso">Description</h2>
          <span className="mt-3 mb-6 block h-px w-16 bg-gold" aria-hidden="true" />
          <div className="flex flex-col gap-4">
            {product.description.split('\n').filter(Boolean).map((paragraph, index) => (
              <p key={index} className="max-w-2xl text-body-md leading-relaxed text-espresso">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <FragranceNotesSection
          topNotes={product.topNotes}
          heartNotes={product.heartNotes}
          baseNotes={product.baseNotes}
        />

        <IngredientsSection ingredients={product.ingredients} />

        <PurchaseAssurance />

        <ReviewsSection productId={product.id} />

        <ProductSection
          eyebrow="You Might Also Like"
          title="Related Products"
          products={related}
          isLoading={isLoadingRelated}
        />

        <RecentlyViewedSection items={recentlyViewed} />
      </div>

      {/* Mobile sticky purchase bar. Sticks within this page's own
          content only (see the outer Container above), so it scrolls
          away naturally right before the footer rather than covering it. */}
      <div className="sticky bottom-0 -mx-4 mt-10 flex items-center justify-between gap-4 border-t border-beige bg-ivory/95 px-4 py-3 backdrop-blur sm:hidden">
        <span className="font-serif text-heading-sm text-espresso">
          {formatPrice(product.salePriceCents ?? product.priceCents)}
        </span>
        <Button
          variant="primary"
          size="md"
          disabled={product.stock === 'outOfStock'}
          onClick={() => showToast('info', 'Cart is coming in an upcoming part.')}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Add to Cart
        </Button>
      </div>
    </Container>
  );
}
