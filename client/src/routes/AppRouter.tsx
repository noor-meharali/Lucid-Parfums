import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { AccountPage } from '@/pages/AccountPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';

import { ROUTES } from '@/constants/routes';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.SHOP, element: <ShopPage /> },
      { path: ROUTES.MEN, element: <CategoryPage title="Men" /> },
      { path: ROUTES.WOMEN, element: <CategoryPage title="Women" /> },
      { path: ROUTES.UNISEX, element: <CategoryPage title="Unisex" /> },
      { path: ROUTES.FRAGRANCE, element: <CategoryPage title="Fragrance" /> },
      { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
      { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
      { path: ROUTES.ACCOUNT, element: <AccountPage /> },
      { path: ROUTES.ORDERS, element: <OrdersPage /> },
      { path: ROUTES.WISHLIST, element: <WishlistPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: ROUTES.ADMIN,
    element: <AdminLayout />,
    children: [{ index: true, element: <AdminDashboardPage /> }],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
