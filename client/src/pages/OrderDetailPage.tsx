import { useParams } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { PageLoader } from '@/components/common/Spinner';
import { ErrorState } from '@/components/common/ErrorState';
import { Breadcrumbs } from '@/components/product/Breadcrumbs';
import { OrderDetailCard } from '@/components/order/OrderDetailCard';
import { useOrder } from '@/hooks/useOrder';
import { ROUTES } from '@/constants/routes';

export function OrderDetailPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { order, isLoading, error } = useOrder(orderNumber);

  if (isLoading) return <PageLoader label="Loading order" />;

  if (error === 'not-found' || !order) {
    return (
      <Container className="py-24">
        <ErrorState variant="notFound" title="Order not found" description="This order doesn't exist or doesn't belong to your account." />
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

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: 'Orders', to: ROUTES.ORDERS },
          { label: order.orderNumber },
        ]}
        className="mb-6"
      />
      <OrderDetailCard order={order} />
    </Container>
  );
}
