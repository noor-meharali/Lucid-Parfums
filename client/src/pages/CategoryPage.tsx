import { PagePlaceholder } from '@/components/common/PagePlaceholder';

interface CategoryPageProps {
  title: string;
}

/**
 * Shared placeholder for the four top-level category routes
 * (/men, /women, /unisex, /fragrance) so each route has a real
 * component without duplicating near-identical page files.
 */
export function CategoryPage({ title }: CategoryPageProps) {
  return (
    <PagePlaceholder
      title={title}
      description="Category browsing and product grids will be built in the Shop & Products part."
    />
  );
}
