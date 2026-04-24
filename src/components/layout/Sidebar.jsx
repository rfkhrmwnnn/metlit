/**
 * Sidebar — Side navigation with page links
 */

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 7a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5zM4 14a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3z" />
      </svg>
    ),
  },
  {
    id: 'students',
    label: 'Mahasiswa',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function Sidebar({ activePage, onNavigate, isAdminAuth, onLogout }) {
  return (
    <>
      {/* Desktop sidebar — hidden on mobile (BottomNav handles mobile) */}
      <aside
        className="hidden lg:flex flex-col w-64 min-h-screen sticky top-0 border-r"
        style={{
          background: 'rgba(251, 253, 255, 0.95)',
          borderColor: 'rgba(164, 181, 205, 0.38)',
        }}
      >
        {/* Branding */}
        <div className="px-6 pt-7 pb-6 border-b" style={{ borderColor: 'rgba(164, 181, 205, 0.3)' }}>
          <h1 className="text-xl font-black text-surface-100 leading-snug tracking-tight">
            Tugas Literatur<br />Review
          </h1>
          <span className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.22em] mt-1.5 block">
            Monitoring Studio
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5 space-y-1">
          {NAV_ITEMS.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-primary-500/10 text-primary-700'
                    : 'text-surface-300 hover:text-surface-100 hover:bg-surface-800/40'
                  }
                `}
              >
                <span className={`transition-colors ${isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-200'}`}>
                  {item.icon}
                </span>
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Administrator section */}
        <div className="px-4 pb-6 pt-4 border-t" style={{ borderColor: 'rgba(164, 181, 205, 0.3)' }}>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-surface-900/40">
            <div className="w-8 h-8 rounded-full bg-surface-600/50 flex items-center justify-center text-[11px] font-black text-surface-300 shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-surface-200 truncate">Administrator</p>
              <p className="text-[10px] text-surface-500 truncate">Main Account</p>
            </div>
            {isAdminAuth && (
              <button
                onClick={onLogout}
                title="Keluar"
                className="p-1.5 rounded-lg text-surface-400 hover:text-danger-500 hover:bg-danger-500/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
