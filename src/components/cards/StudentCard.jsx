/**
 * StudentCard — Card view alternative to table row
 */

import { calculateProgress, calculateAverage, getStatusColor } from '../../utils/calculations';
import { getClusterLabel } from '../../utils/clustering';
import { TASK_KEYS, TASK_LABELS, TOTAL_TASKS } from '../../utils/constants';
import Badge from '../common/Badge';
import ProgressBar from '../dashboard/ProgressBar';

export default function StudentCard({ student, onDelete }) {
  const progress = calculateProgress(student);
  const average = calculateAverage(student);
  const cluster = getClusterLabel(student);
  const progressColor = getStatusColor(progress);

  // Count submitted tasks
  const submittedCount = TASK_KEYS.filter(k => student.tasks[k] !== null && student.tasks[k] !== undefined).length;

  return (
    <div
      className={`
        glass-card rounded-3xl p-6 border-l-[6px]
        hover:-translate-y-1 hover:shadow-2xl transition-all duration-300
        ${progressColor.border}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${cluster.bgColor} ${cluster.color}`}>
            {student.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-surface-100">{student.name}</h3>
            <Badge {...cluster} size="xs" />
          </div>
        </div>
        <button
          onClick={() => onDelete(student.id)}
          className="p-1.5 rounded-lg text-surface-500 hover:text-danger-600 hover:bg-danger-500/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      <ProgressBar value={progress} label="Progress" size="md" />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center p-2 rounded-lg bg-white/70 border border-surface-700/70">
          <p className="text-[10px] text-surface-400 font-medium">Dikumpulkan</p>
          <p className="text-sm font-bold text-surface-200 mt-0.5">{submittedCount}/{TOTAL_TASKS}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/70 border border-surface-700/70">
          <p className="text-[10px] text-surface-400 font-medium">Rata-rata</p>
          <p className={`text-sm font-bold mt-0.5 ${getStatusColor(average).text}`}>{average || '—'}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-white/70 border border-surface-700/70">
          <p className="text-[10px] text-surface-400 font-medium">Progress</p>
          <p className={`text-sm font-bold mt-0.5 ${progressColor.text}`}>{progress}%</p>
        </div>
      </div>

      {/* Mini task grid */}
      <div className="mt-4">
        <p className="text-[10px] text-surface-400 font-medium mb-2">Tugas:</p>
        <div className="flex flex-wrap gap-1">
          {TASK_KEYS.map(key => {
            const score = student.tasks[key];
            const hasScore = score !== null && score !== undefined;
            const cellColor = hasScore
              ? (score < 50 ? 'bg-danger-500/30' : score < 75 ? 'bg-warning-500/30' : 'bg-success-500/30')
              : 'bg-surface-800/60';

            return (
              <div
                key={key}
                className={`w-6 h-6 rounded text-[9px] font-medium flex items-center justify-center ${cellColor}`}
                title={`${TASK_LABELS[key]}: ${hasScore ? score : 'Belum'}`}
              >
                {hasScore ? score : '·'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
