import { Outlet } from 'react-router-dom';

/**
 * Site-wide shell for all customer-facing pages.
 * The real header/footer and visual design system arrive in Part 2 —
 * this establishes the fixed location they will occupy.
 */
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
      <header id="site-header" />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer id="site-footer" />
    </div>
  );
}
