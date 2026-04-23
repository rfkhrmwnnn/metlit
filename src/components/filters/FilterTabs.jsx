/**
 * FilterTabs — Filter buttons for student status
 */

import { FILTER_OPTIONS } from '../../utils/constants';

const TABS = [
  { key: FILTER_OPTIONS.ALL, label: 'Semua', icon: '📋' },
  { key: FILTER_OPTIONS.AT_RISK, label: 'Bermasalah', icon: '⚠️' },
  { key: FILTER_OPTIONS.DONE, label: 'Selesai', icon: '✅' },
];

export default function FilterTabs({ activeFilter, onFilterChange, counts = {} }) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-white/75 rounded-xl border border-surface-700/80">
      {TABS.map(tab => {
        const isActive = activeFilter === tab.key;
        const count = counts[tab.key];

        return (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`
              flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
              transition-all duration-200
              ${isActive
                ? 'bg-primary-500/15 text-primary-700 shadow-sm border border-primary-400/20'
                : 'text-surface-400 hover:text-surface-200 hover:bg-primary-500/10'
              }
            `}
          >
            <span className="text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
            {count !== undefined && (
              <span className={`
                px-1.5 py-0.5 rounded-full text-[10px] font-bold
                ${isActive ? 'bg-primary-500/20 text-primary-700' : 'bg-surface-800 text-surface-400'}
              `}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
