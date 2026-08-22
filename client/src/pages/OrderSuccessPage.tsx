import { useParams, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { PageLoader } from '@/components/common/Spinner';
import { ErrorState } from '@/components/common/ErrorState';
import { BrandDivider } from '@/components/common/BrandDivider';
import { OrderDetailCard } from '@/components/order/OrderDetailCard';
import { buttonClasses } from '@/components/common/Button';
import { useOrder } from '@/hooks/useOrder';
import { ROUTES, orderDetailPath } from '@/constants/routes';

export function OrderSuccessPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { order, isLoading, error } = useOrder(orderNumber);

  if (isLoading) return <PageLoader label="Loading your order" />;

  if (error || !order) {
    return (
      <Container className="py-24">
        <ErrorState
          variant="notFound"
          title="We couldn't find that order"
          description="If you just placed an order, check your order history instead."
        />
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
        <h1 className="font-serif text-display-md text-espresso">Order Confirmed</h1>
        <BrandDivider />
        <p className="max-w-md text-body-sm text-taupe">
          Thank you — we've received your order and will begin preparing it shortly.
        </p>
      </div>

      <div className="mx-auto max-w-2xl rounded-lg border border-beige bg-ivory p-6 sm:p-8">
        <OrderDetailCard order={order} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to={ROUTES.SHOP} className={buttonClasses('outline', 'md')}>
          Continue Shopping
        </Link>
        <Link to={orderDetailPath(order.orderNumber)} className={buttonClasses('primary', 'md')}>
          View Order
        </Link>
      </div>
    </Container>
  );
}
