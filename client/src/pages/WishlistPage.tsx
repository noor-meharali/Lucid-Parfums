import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { Spinner } from '@/components/common/Spinner';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { ROUTES } from '@/constants/routes';

export function WishlistPage() {
  const { products, isLoading } = useWishlist();
  const navigate = useNavigate();

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="mb-8 font-serif text-display-md text-espresso">Your Wishlist</h1>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner className="h-6 w-6" />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-8 w-8" />}
          title="Your wishlist is empty"
          description="Save fragrances you love to find them here later."
          action={{ label: 'Shop the Collection', onClick: () => navigate(ROUTES.SHOP) }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
