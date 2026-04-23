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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-surface-50/35 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-40
          w-64 bg-white/80 backdrop-blur-xl border-r border-surface-700/70
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:w-60
          ${isOpen ? 'translate-x-0 shadow-2xl shadow-primary-500/15' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full py-6">
          {/* Navigation Group */}
          <div className="px-4 mb-4">
            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-[0.2em] px-3 mb-4">
              Main Menu
            </p>
            <nav className="space-y-1">
              {NAV_ITEMS.map(item => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                      transition-all duration-300 group relative overflow-hidden
                      ${isActive
                        ? 'bg-primary-500/12 text-primary-700 border border-primary-400/25'
                        : 'text-surface-300 hover:text-surface-100 hover:bg-primary-500/8'
                      }
                    `}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-primary-500 rounded-full" />
                    )}

                    <span className={`transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-200'}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide">{item.label}</span>
                    
                    {isActive && (
                      <div className="ml-auto">
                        <div className="w-1 h-1 rounded-full bg-primary-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom Branding / Info */}
          <div className="px-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-surface-900 to-white border border-surface-700/70 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_var(--color-accent-500)]" />
                <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">v1.0.4</span>
              </div>
              <p className="text-[11px] font-medium text-surface-300 leading-relaxed">
                Platform Monitoring Tugas Mahasiswa <span className="text-primary-600 font-bold">Metlit</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
