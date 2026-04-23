/**
 * ViewToggle — Switch between table and card view
 */

import { VIEW_MODES } from '../../utils/constants';

export default function ViewToggle({ activeView, onViewChange }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/75 rounded-xl border border-surface-700/80">
      <button
        onClick={() => onViewChange(VIEW_MODES.TABLE)}
        className={`
          p-2 rounded-lg transition-all duration-200
          ${activeView === VIEW_MODES.TABLE
            ? 'bg-primary-500/15 text-primary-700 border border-primary-400/20'
            : 'text-surface-500 hover:text-surface-200 hover:bg-primary-500/10'
          }
        `}
        title="Tampilan Tabel"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button
        onClick={() => onViewChange(VIEW_MODES.CARD)}
        className={`
          p-2 rounded-lg transition-all duration-200
          ${activeView === VIEW_MODES.CARD
            ? 'bg-primary-500/15 text-primary-700 border border-primary-400/20'
            : 'text-surface-500 hover:text-surface-200 hover:bg-primary-500/10'
          }
        `}
        title="Tampilan Kartu"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
    </div>
  );
}
