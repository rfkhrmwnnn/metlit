/**
 * BottomNav — Mobile bottom navigation bar (visible on < lg screens)
 * Replaces hamburger menu for mobile devices
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
    label: 'Admin',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden bottom-nav-container">
      <div className="glass-nav border-t border-surface-700/40 px-2">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {NAV_ITEMS.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative flex flex-col items-center gap-1 px-6 py-2 rounded-2xl
                  transition-all duration-300 active:scale-90
                  ${isActive ? 'text-primary-600' : 'text-surface-400'}
                `}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-primary-500/10 rounded-2xl border border-primary-500/15" />
                )}
                <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className={`relative z-10 text-[10px] font-bold tracking-wide ${isActive ? 'text-primary-600' : 'text-surface-400'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
