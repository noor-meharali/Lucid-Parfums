import { NavLink, useNavigate } from 'react-router-dom';
import { User, Heart, ShieldCheck, LogOut, LogIn } from 'lucide-react';
import { Drawer } from '@/components/common/Drawer';
import { SearchBar } from '@/components/layout/SearchBar';
import { BrandDivider } from '@/components/common/BrandDivider';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ROUTES } from '@/constants/routes';
import { PRIMARY_NAV_LINKS } from '@/constants/nav';
import { cn } from '@/utils/cn';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'block py-3 font-serif text-heading-sm transition-colors',
    isActive ? 'text-espresso' : 'text-espresso/70 hover:text-espresso',
  );

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();

  function go(path: string) {
    onClose();
    navigate(path);
  }

  async function handleLogout() {
    onClose();
    await logout();
    showToast('info', 'Signed out.');
    navigate(ROUTES.HOME);
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Menu" side="left">
      <div className="flex flex-col gap-6 px-5 py-6">
        <SearchBar variant="mobile" />

        <nav aria-label="Mobile" className="flex flex-col divide-y divide-beige">
          <NavLink to={ROUTES.HOME} end className={mobileLinkClass} onClick={onClose}>
            Home
          </NavLink>
          {PRIMARY_NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={mobileLinkClass} onClick={onClose}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <BrandDivider />

        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => go(isAuthenticated ? ROUTES.ACCOUNT : ROUTES.LOGIN)}
            className="flex items-center gap-3 py-2 text-body-md text-espresso"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            {isAuthenticated ? 'Account' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => go(ROUTES.WISHLIST)}
            className="flex items-center gap-3 py-2 text-body-md text-espresso"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Wishlist
          </button>
          {user?.role === 'admin' && (
            <button
              type="button"
              onClick={() => go(ROUTES.ADMIN)}
              className="flex items-center gap-3 py-2 text-body-md text-espresso"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Admin Dashboard
            </button>
          )}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 py-2 text-body-md text-espresso"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign Out
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go(ROUTES.REGISTER)}
              className="flex items-center gap-3 py-2 text-body-md text-espresso"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Create Account
            </button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
