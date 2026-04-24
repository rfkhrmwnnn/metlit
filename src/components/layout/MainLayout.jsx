/**
 * MainLayout — Wraps Sidebar + Content + BottomNav (mobile)
 */

import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function MainLayout({ activePage, onNavigate, children, isAdminAuth, onAdminLogout }) {
  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Desktop sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isAdminAuth={isAdminAuth}
        onLogout={onAdminLogout}
      />

      {/* Main content area — extra bottom padding on mobile for BottomNav */}
      <main className="flex-1 min-h-screen p-5 lg:p-7 overflow-x-hidden pb-24 lg:pb-7">
        <div className="max-w-[1500px] mx-auto animate-fade-in">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <BottomNav activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}
