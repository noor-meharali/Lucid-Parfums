import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ROUTES } from '@/constants/routes';

/**
 * Wraps an action (add to cart, add to wishlist) so a guest is sent
 * to sign in — with a clear reason and the page they were on
 * preserved for after — instead of the action silently failing or
 * pretending to work. Cart and wishlist are both server-side and
 * authenticated-only, so there is no guest fallback to fall back to.
 */
export function useRequireAuthAction() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  return useCallback(
    (action: () => void | Promise<void>) => {
      if (!isAuthenticated) {
        showToast('info', 'Please sign in to continue.');
        navigate(ROUTES.LOGIN, { state: { from: location.pathname } });
        return;
      }
      void action();
    },
    [isAuthenticated, navigate, location, showToast],
  );
}
