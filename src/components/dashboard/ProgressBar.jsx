/**
 * ProgressBar — Animated progress bar with color coding
 */

import { getStatusColor } from '../../utils/calculations';

export default function ProgressBar({ value = 0, label, showPercentage = true, size = 'md', className = '' }) {
  const color = getStatusColor(value);
  const clampedValue = Math.min(100, Math.max(0, value));

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-surface-300 truncate max-w-[150px]">{label}</span>
          )}
          {showPercentage && (
            <span className={`text-xs font-bold ${color.text} ml-2`}>{clampedValue}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-surface-800 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} rounded-full transition-all duration-700 ease-out ${color.dot}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
