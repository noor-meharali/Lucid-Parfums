import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

/**
 * Site-wide shell for all customer-facing pages: sticky header,
 * routed page content, and the footer.
 */
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
