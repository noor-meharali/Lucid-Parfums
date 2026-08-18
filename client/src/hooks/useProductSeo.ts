import { useEffect } from 'react';
import { APP_NAME } from '@/constants/config';
import type { Product } from '@/types/product';

const JSON_LD_ID = 'product-jsonld';

function upsertMetaDescription(content: string): void {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertJsonLd(product: Product): void {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) existing.remove();

  const availability =
    product.stock === 'outOfStock'
      ? 'https://schema.org/OutOfStock'
      : 'https://schema.org/InStock';

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = JSON_LD_ID;
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.length > 0 ? product.images : [product.imageUrl],
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    aggregateRating:
      product.reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: ((product.salePriceCents ?? product.priceCents) / 100).toFixed(2),
      availability,
    },
  });
  document.head.appendChild(script);
}

/**
 * Sets the document title, meta description, and injects Product
 * JSON-LD structured data for the current product. This is a
 * client-rendered SPA, so this covers what's achievable without
 * server-side rendering — real production SEO would add SSR/
 * prerendering on top so crawlers see this without executing JS.
 */
export function useProductSeo(product: Product | null): void {
  useEffect(() => {
    if (!product) return;

    const previousTitle = document.title;
    document.title = `${product.name} | ${APP_NAME}`;
    upsertMetaDescription(product.description.slice(0, 155));
    upsertJsonLd(product);

    return () => {
      document.title = previousTitle;
      document.getElementById(JSON_LD_ID)?.remove();
    };
  }, [product]);
}
