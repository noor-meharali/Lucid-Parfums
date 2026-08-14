import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, User, Heart } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { IconButton } from '@/components/common/IconButton';
import { Modal } from '@/components/common/Modal';
import { SearchBar } from '@/components/layout/SearchBar';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartIcon } from '@/components/cart/CartIcon';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ROUTES } from '@/constants/routes';
import { PRIMARY_NAV_LINKS } from '@/constants/nav';
import { cn } from '@/utils/cn';
import type { CartLineItem } from '@/types/cart';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-1 text-body-sm tracking-wide text-espresso/80 transition-colors duration-200 hover:text-espresso',
    'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:after:scale-x-100',
    isActive && 'text-espresso after:scale-x-100',
  );

export function Header() {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartLineItem[]>([]);

  function updateQuantity(id: string, quantity: number) {
    setCartItems((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }

  function removeItem(id: string) {
    setCartItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-beige bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <IconButton
          label="Open menu"
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </IconButton>

        <Logo className="lg:mr-2" />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <NavLink to={ROUTES.HOME} end className={navLinkClass}>
            Home
          </NavLink>
          {PRIMARY_NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <IconButton label="Search" onClick={() => setIsSearchOpen(true)} className="hidden sm:inline-flex">
            <Search className="h-5 w-5" aria-hidden="true" />
          </IconButton>
          <IconButton label="Account" className="hidden sm:inline-flex" onClick={() => navigate(ROUTES.ACCOUNT)}>
            <User className="h-5 w-5" aria-hidden="true" />
          </IconButton>
          <IconButton label="Wishlist" className="hidden sm:inline-flex" onClick={() => navigate(ROUTES.WISHLIST)}>
            <Heart className="h-5 w-5" aria-hidden="true" />
          </IconButton>
          <CartIcon count={cartItems.length} onClick={() => setIsCartOpen(true)} />
        </div>
      </div>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search">
        <SearchBar variant="desktop" autoFocus />
      </Modal>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
      />
    </header>
  );
}
