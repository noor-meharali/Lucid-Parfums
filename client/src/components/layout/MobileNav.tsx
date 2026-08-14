import { NavLink, useNavigate } from 'react-router-dom';
import { User, Heart } from 'lucide-react';
import { Drawer } from '@/components/common/Drawer';
import { SearchBar } from '@/components/layout/SearchBar';
import { BrandDivider } from '@/components/common/BrandDivider';
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

  function go(path: string) {
    onClose();
    navigate(path);
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
            onClick={() => go(ROUTES.ACCOUNT)}
            className="flex items-center gap-3 py-2 text-body-md text-espresso"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            Account
          </button>
          <button
            type="button"
            onClick={() => go(ROUTES.WISHLIST)}
            className="flex items-center gap-3 py-2 text-body-md text-espresso"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Wishlist
          </button>
        </div>
      </div>
    </Drawer>
  );
}
