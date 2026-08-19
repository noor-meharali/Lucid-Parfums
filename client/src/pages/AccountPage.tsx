import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Package, Heart, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ProfileForm } from '@/components/auth/ProfileForm';
import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ROUTES } from '@/constants/routes';

export function AccountPage() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!user) return null; // ProtectedRoute guarantees this page only renders when signed in.

  async function handleLogout() {
    await logout();
    showToast('info', 'Signed out.');
    navigate(ROUTES.HOME);
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-label uppercase tracking-[0.2em] text-taupe">Account</span>
          <h1 className="mt-1 font-serif text-display-md text-espresso">Hello, {user.firstName}</h1>
          <p className="mt-1 text-body-sm text-taupe">{user.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign Out
        </Button>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link to={ROUTES.ORDERS}>
          <Card interactive className="flex items-center gap-3">
            <Package className="h-5 w-5 text-gold" aria-hidden="true" />
            <span className="text-body-sm font-medium text-espresso">Order History</span>
          </Card>
        </Link>
        <Link to={ROUTES.WISHLIST}>
          <Card interactive className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-gold" aria-hidden="true" />
            <span className="text-body-sm font-medium text-espresso">Wishlist</span>
          </Card>
        </Link>
        {user.role === 'admin' && (
          <Link to={ROUTES.ADMIN}>
            <Card interactive className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-gold" aria-hidden="true" />
              <span className="text-body-sm font-medium text-espresso">Admin Dashboard</span>
            </Card>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card padding="lg">
          <h2 className="mb-6 font-serif text-heading-md text-espresso">Profile Information</h2>
          <ProfileForm user={user} />
        </Card>
        <Card padding="lg">
          <h2 className="mb-6 font-serif text-heading-md text-espresso">Change Password</h2>
          <ChangePasswordForm />
        </Card>
      </div>
    </Container>
  );
}
