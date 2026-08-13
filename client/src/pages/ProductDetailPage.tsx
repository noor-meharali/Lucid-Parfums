import { useParams } from 'react-router-dom';
import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <PagePlaceholder
      title="Product"
      description={`Product details for "${slug}" will be built in the Shop & Products part.`}
    />
  );
}
