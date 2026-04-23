/**
 * Badge — Reusable status/cluster badge component
 */

export default function Badge({ label, color, bgColor, borderColor, emoji, size = 'sm' }) {
  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium border
        ${sizeClasses[size]}
        ${color || 'text-surface-300'}
        ${bgColor || 'bg-surface-800/80'}
        ${borderColor || 'border-surface-600/40'}
      `}
    >
      {emoji && <span className="text-[10px]">{emoji}</span>}
      {label}
    </span>
  );
}
