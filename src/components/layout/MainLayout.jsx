/**
 * MainLayout — Wraps Navbar + Sidebar + Content
 */

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout({ activePage, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-950">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex relative">
        <Sidebar
          activePage={activePage}
          onNavigate={onNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 sm:p-5 lg:p-7 overflow-x-hidden">
          <div className="max-w-[1500px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
