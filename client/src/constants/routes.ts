/**
 * Centralized route path constants.
 * Import these instead of hardcoding path strings across the app.
 */
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  MEN: '/men',
  WOMEN: '/women',
  UNISEX: '/unisex',
  FRAGRANCE: '/fragrance',
  ABOUT: '/about',
  PRODUCT_DETAIL: '/product/:slug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:orderNumber',
  ORDER_SUCCESS: '/order-success/:orderNumber',
  WISHLIST: '/wishlist',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ADMIN: '/admin',
} as const;

export const productPath = (slug: string): string => `/product/${slug}`;
export const orderDetailPath = (orderNumber: string): string => `/orders/${orderNumber}`;
export const orderSuccessPath = (orderNumber: string): string => `/order-success/${orderNumber}`;
