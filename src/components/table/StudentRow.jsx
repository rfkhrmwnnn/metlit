/**
 * StudentRow — Single row in the monitoring table
 */

import { TASK_KEYS } from '../../utils/constants';
import { calculateProgress, calculateAverage, getCellColor, getStatusColor } from '../../utils/calculations';
import { getClusterLabel } from '../../utils/clustering';
import InlineEdit from './InlineEdit';
import Badge from '../common/Badge';

export default function StudentRow({ student, index, onUpdateTask, onDelete }) {
  const progress = calculateProgress(student);
  const average = calculateAverage(student);
  const progressColor = getStatusColor(progress);
  const cluster = getClusterLabel(student);

  // Row highlight class based on progress
  const rowClass = progress < 50 ? 'row-danger-premium' : progress < 75 ? 'row-warning-premium' : 'row-success-premium';

  return (
    <tr
      className={`
        ${rowClass}
        border-b border-surface-700/70
        hover:bg-primary-500/[0.04] transition-colors duration-200
      `}
    >
      {/* Number */}
      <td className="sticky left-0 z-10 bg-surface-950/85 backdrop-blur-md px-4 text-center text-xs text-surface-500 font-bold border-r border-surface-700/70">
        {index + 1}
      </td>

      {/* Name */}
      <td className="sticky left-[48px] z-10 bg-surface-950/85 backdrop-blur-md px-4 border-r border-surface-700/70">
        <div className="flex items-center gap-3 py-1">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-lg ${cluster.bgColor} ${cluster.color} transition-transform hover:scale-110`}>
            {student.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-surface-100 truncate tracking-tight">{student.name}</p>
            <div className="mt-0.5 scale-90 origin-left">
              <Badge {...cluster} size="xs" />
            </div>
          </div>
        </div>
      </td>

      {/* Status / Progress */}
      <td className="px-3 py-2 text-center border-r border-surface-700/70">
        <div className="flex flex-col items-center gap-1.5 min-w-[70px]">
          <span className={`text-[11px] font-black tracking-tight ${progressColor.text}`}>
            {progress}%
          </span>
          <div className="w-full h-1 bg-surface-700/80 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${progressColor.dot} shadow-[0_0_8px_currentColor]`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </td>

      {/* Task scores P1-P16 + Final */}
      {TASK_KEYS.map(key => (
        <td key={key} className="px-1 text-center">
          <div className={`rounded-xl transition-all duration-300 ${getCellColor(student.tasks[key])} hover:scale-105`}>
            <InlineEdit
              value={student.tasks[key]}
              onSave={(val) => onUpdateTask(student.id, key, val)}
            />
          </div>
        </td>
      ))}

      {/* Average */}
      <td className="px-4 text-center">
        <span className={`text-sm font-black tracking-tight ${getStatusColor(average).text}`}>
          {average || '—'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 text-center">
        <button
          onClick={() => onDelete(student.id)}
          className="p-2 rounded-xl text-surface-500 hover:text-danger-400 hover:bg-danger-500/10 transition-all duration-300 active:scale-90"
          title="Hapus mahasiswa"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
