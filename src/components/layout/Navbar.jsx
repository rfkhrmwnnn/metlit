/**
 * Navbar — Top navigation bar
 */

import { useState } from 'react';

export default function Navbar({ onToggleSidebar }) {
  const [currentDate] = useState(new Date());

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(currentDate);

  return (
    <header className="sticky top-0 z-50 glass-nav h-16 px-4 lg:px-7 flex items-center justify-between">
      {/* Left: Branding */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-surface-400 hover:text-surface-100 hover:bg-primary-500/10 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group cursor-pointer transition-transform hover:scale-105">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-surface-100 leading-none">
              Tugas <span className="text-primary-400">Metlit</span>
            </h1>
            <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-[0.18em] mt-0.5 block">Monitoring Studio</span>
          </div>
        </div>
      </div>

      {/* Right: Info */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-2 text-xs font-semibold text-surface-300">
            <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002-2z" />
            </svg>
            {formattedDate}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-success-500/25 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          <span className="text-[10px] font-bold text-success-600 uppercase tracking-wider">System Live</span>
        </div>
      </div>
    </header>
  );
}
