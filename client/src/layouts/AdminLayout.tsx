import { Outlet } from 'react-router-dom';

/**
 * Shell for the /admin section, kept separate from MainLayout since
 * the admin dashboard will have its own navigation and chrome.
 */
export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-offwhite text-charcoal">
      <aside id="admin-sidebar" />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
