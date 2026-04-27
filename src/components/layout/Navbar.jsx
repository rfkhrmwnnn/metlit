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
          className="hidden lg:hidden p-2 rounded-xl text-surface-400 hover:text-surface-100 hover:bg-primary-500/10 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30 cursor-pointer transition-transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/35">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-surface-100 leading-none">
              Tugas <span className="text-primary-gradient">Metopen</span>
            </h1>
            <span className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.2em] mt-0.5 block">Monitoring Studio</span>
          </div>
        </div>
      </div>

      {/* Right: Info */}
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-xs font-medium text-surface-400">
            <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-500/8 border border-success-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
          <span className="text-[10px] font-bold text-success-600 uppercase tracking-wider">Live</span>
        </div>
      </div>
    </header>
  );
}
