/**
 * StatCard — Premium statistics display component
 */

export default function StatCard({ title, value, subValue, icon, trend, colorClass = 'primary' }) {
  const gradients = {
    primary: 'from-primary-500/18 to-primary-600/5',
    success: 'from-success-500/18 to-success-600/5',
    warning: 'from-warning-500/18 to-warning-600/5',
    danger: 'from-danger-500/18 to-danger-600/5',
  };

  const iconBg = {
    primary: 'from-primary-500/20 to-primary-600/10 border-primary-500/20 text-primary-600',
    success: 'from-success-500/20 to-success-600/10 border-success-500/20 text-success-600',
    warning: 'from-warning-500/20 to-warning-600/10 border-warning-500/20 text-warning-600',
    danger: 'from-danger-500/20 to-danger-600/10 border-danger-500/20 text-danger-600',
  };

  const accentLine = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-400',
    success: 'bg-gradient-to-r from-success-500 to-success-400',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-400',
    danger: 'bg-gradient-to-r from-danger-500 to-danger-400',
  };

  return (
    <div className="glass-card group p-5 rounded-3xl relative overflow-hidden">
      {/* Accent top line */}
      <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-b-full ${accentLine[colorClass]} opacity-60 group-hover:opacity-100 transition-opacity`} />

      {/* Background glow orb */}
      <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br ${gradients[colorClass]} blur-2xl group-hover:opacity-150 transition-opacity`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${iconBg[colorClass]} border shadow-inner flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
            {icon}
          </div>
          {trend && (
            <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${trend.positive ? 'bg-success-500/12 text-success-600' : 'bg-danger-500/12 text-danger-600'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </div>
          )}
        </div>

        <div>
          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-[0.2em] mb-1.5">{title}</p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-3xl font-black text-surface-100 tracking-tight tabular-nums animate-scale-up">
              {value}
            </h4>
            {subValue && (
              <span className="text-xs font-medium text-surface-500">{subValue}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
