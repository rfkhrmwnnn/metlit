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
          className="fixed inset-0 bg-surface-50/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-40
          w-64 backdrop-blur-2xl border-r
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:w-60
          ${isOpen ? 'translate-x-0 shadow-2xl shadow-primary-500/10' : '-translate-x-full'}
        `}
        style={{
          background: 'rgba(251, 253, 255, 0.88)',
          borderColor: 'rgba(164, 181, 205, 0.38)',
        }}
      >
        <div className="flex flex-col h-full py-6">
          {/* Navigation Group */}
          <div className="px-4 mb-4">
            <p className="text-[10px] font-bold text-surface-500 uppercase tracking-[0.22em] px-3 mb-3">
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
                        ? 'bg-primary-500/10 text-primary-700 border border-primary-400/20'
                        : 'text-surface-300 hover:text-surface-100 hover:bg-primary-500/6 border border-transparent'
                      }
                    `}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className="absolute left-0 top-2.5 bottom-2.5 w-[3px] bg-gradient-to-b from-primary-500 to-primary-400 rounded-full" />
                    )}

                    <span className={`transition-colors duration-300 ${isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-200'}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide">{item.label}</span>
                    
                    {isActive && (
                      <div className="ml-auto">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_6px_rgba(47,143,255,0.6)]" />
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
          <div className="px-5">
            <div className="p-4 rounded-2xl border"
              style={{
                background: 'linear-gradient(145deg, rgba(246, 248, 252, 0.9), rgba(237, 242, 248, 0.7))',
                borderColor: 'rgba(164, 181, 205, 0.35)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(14,168,155,0.6)] animate-pulse" />
                <span className="text-[10px] font-bold text-surface-500 uppercase tracking-widest">v1.0.4</span>
              </div>
              <p className="text-[11px] font-medium text-surface-400 leading-relaxed">
                Platform Monitoring Tugas Mahasiswa <span className="text-primary-600 font-bold">Metlit</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
