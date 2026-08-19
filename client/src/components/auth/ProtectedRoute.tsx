import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/common/Spinner';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/constants/routes';
import type { Role } from '@/types/user';

interface ProtectedRouteProps {
  /** If set, the user's current role must match — not just be signed in. */
  role?: Role;
}

/**
 * Guards a route on the frontend for UX (redirecting guests to
 * /login, showing a clear "restricted" state for the wrong role).
 * This is not the real security boundary — every API this route's
 * page calls enforces its own authorization independently, exactly
 * as the backend middleware for it always has.
 */
export function ProtectedRoute({ role, children }: PropsWithChildren<ProtectedRouteProps>) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader label="Checking your session" />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return (
      <ErrorState
        variant="forbidden"
        title="Access restricted"
        description="You don't have permission to view this page."
        className="min-h-[50vh]"
      />
    );
  }

  return <>{children}</>;
}
