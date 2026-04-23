/**
 * StatCard — Premium statistics display component
 */

export default function StatCard({ title, value, subValue, icon, trend, colorClass = 'primary' }) {
  const colors = {
    primary: 'from-primary-500/20 to-primary-600/5 text-primary-600 border-primary-500/25',
    success: 'from-success-500/20 to-success-600/5 text-success-600 border-success-500/25',
    warning: 'from-warning-500/20 to-warning-600/5 text-warning-600 border-warning-500/25',
    danger: 'from-danger-500/20 to-danger-600/5 text-danger-600 border-danger-500/25',
  };

  const iconColors = {
    primary: 'text-primary-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    danger: 'text-danger-600',
  };

  return (
    <div className="glass-card group p-5 rounded-3xl relative overflow-hidden">
      {/* Background Accent */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br ${colors[colorClass]} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${colors[colorClass]} border shadow-inner flex items-center justify-center transition-transform group-hover:scale-110`}>
            <span className={iconColors[colorClass]}>{icon}</span>
          </div>
          {trend && (
            <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${trend.positive ? 'bg-success-500/12 text-success-600' : 'bg-danger-500/12 text-danger-600'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </div>
          )}
        </div>

        <div>
          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-[0.2em] mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-3xl font-black text-surface-100 tracking-tight animate-scale-up">
              {value}
            </h4>
            {subValue && (
              <span className="text-xs font-medium text-surface-400">{subValue}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
