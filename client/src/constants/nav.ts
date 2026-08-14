import { ROUTES } from '@/constants/routes';

export interface NavLinkItem {
  label: string;
  to: string;
}

export const PRIMARY_NAV_LINKS: NavLinkItem[] = [
  { label: 'Shop', to: ROUTES.SHOP },
  { label: 'Men', to: ROUTES.MEN },
  { label: 'Women', to: ROUTES.WOMEN },
  { label: 'Unisex', to: ROUTES.UNISEX },
  { label: 'Fragrance', to: ROUTES.FRAGRANCE },
  { label: 'About', to: ROUTES.ABOUT },
];

export const FOOTER_SHOP_LINKS: NavLinkItem[] = [
  { label: 'Men', to: ROUTES.MEN },
  { label: 'Women', to: ROUTES.WOMEN },
  { label: 'Unisex', to: ROUTES.UNISEX },
  { label: 'Fragrance', to: ROUTES.FRAGRANCE },
  { label: 'New Arrivals', to: ROUTES.SHOP },
  { label: 'Best Sellers', to: ROUTES.SHOP },
];
