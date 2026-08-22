import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { TableSkeleton } from '@/components/common/Skeleton';
import { Pagination } from '@/components/product/Pagination';
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/order/OrderStatusBadge';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice } from '@/utils/formatPrice';
import { ROUTES, orderDetailPath } from '@/constants/routes';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function OrdersPage() {
  const [page, setPage] = useState(1);
  const { orders, pagination, isLoading, error } = useOrders(page);
  const navigate = useNavigate();

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="mb-8 font-serif text-display-md text-espresso">Your Orders</h1>

      {isLoading ? (
        <TableSkeleton rows={4} columns={4} />
      ) : error ? (
        <ErrorState variant="server" description={error} />
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<PackageSearch className="h-8 w-8" />}
          title="No orders yet"
          description="Orders you place will show up here."
          action={{ label: 'Shop the Collection', onClick: () => navigate(ROUTES.SHOP) }}
        />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col divide-y divide-beige border-y border-beige">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={orderDetailPath(order.orderNumber)}
                className="flex flex-col gap-2 py-5 transition-colors hover:bg-cream sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-body-sm font-medium text-espresso">{order.orderNumber}</p>
                  <p className="text-body-sm text-taupe">
                    {formatDate(order.createdAt)} · {order.items.length} item{order.items.length === 1 ? '' : 's'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <OrderStatusBadge status={order.orderStatus} />
                  <PaymentStatusBadge status={order.paymentStatus} />
                  <span className="text-body-sm font-medium text-espresso">{formatPrice(order.totalCents)}</span>
                </div>
              </Link>
            ))}
          </div>
          {pagination && (
            <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
          )}
        </div>
      )}
    </Container>
  );
}
