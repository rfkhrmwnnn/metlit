/**
 * Dashboard Page — Analytics overview
 */

import DashboardSummary from '../components/dashboard/DashboardSummary';
import ProgressBar from '../components/dashboard/ProgressBar';
import { StudentProgressChart, ClusterPieChart } from '../components/charts/ProgressChart';
import { calculateProgress, calculateAverage } from '../utils/calculations';
import { getClusterLabel } from '../utils/clustering';
import Badge from '../components/common/Badge';

export default function Dashboard({ students }) {
  // Sort students by progress (ascending — worst first for at-risk)
  const sortedByProgress = [...students]
    .map(s => ({ ...s, progress: calculateProgress(s), average: calculateAverage(s) }))
    .sort((a, b) => a.progress - b.progress);

  // Descending order for "all students" progress list (best first)
  const sortedByProgressDesc = [...sortedByProgress].sort((a, b) => b.progress - a.progress);

  // At-risk students (< 50% progress)
  const atRiskStudents = sortedByProgress.filter(s => s.progress < 50);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-black text-surface-100 tracking-tight">
          System <span className="text-primary-gradient">Dashboard</span>
        </h2>
        <p className="text-[11px] font-bold text-surface-500 mt-1 uppercase tracking-[0.18em]">Ringkasan monitoring pengumpulan tugas mahasiswa</p>
      </div>

      {/* Stat Cards */}
      <DashboardSummary students={students} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <StudentProgressChart students={students} />
        </div>
        <div className="lg:col-span-2">
          <ClusterPieChart students={students} />
        </div>
      </div>

      {/* At Risk Students & Progress List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* At-Risk List */}
        <div className="glass rounded-2xl p-5 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-danger-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
              <h3 className="text-sm font-semibold text-surface-200">Mahasiswa Bermasalah</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-danger-500/12 text-danger-600 border border-danger-500/20">
              {atRiskStudents.length} orang
            </span>
          </div>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {atRiskStudents.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-success-500/10 flex items-center justify-center mb-3 border border-success-500/20">
                  <svg className="w-6 h-6 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-surface-300">Semua mahasiswa aman</p>
                <p className="text-xs text-surface-500 mt-0.5">Tidak ada yang bermasalah</p>
              </div>
            ) : (
              atRiskStudents.map(student => {
                const cluster = getClusterLabel(student);
                return (
                  <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-surface-700/60 hover:bg-white hover:border-danger-500/20 transition-all duration-200">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${cluster.bgColor} ${cluster.color}`}>
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-surface-200 truncate">{student.name}</p>
                        <Badge {...cluster} size="xs" />
                      </div>
                      <ProgressBar value={student.progress} size="sm" showPercentage={false} />
                    </div>
                    <span className="text-xs font-bold text-danger-600 shrink-0">{student.progress}%</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* All Students Progress */}
        <div className="glass rounded-2xl p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_6px_rgba(47,143,255,0.5)]" />
            <h3 className="text-sm font-semibold text-surface-200">Progress Semua Mahasiswa</h3>
          </div>
          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {sortedByProgressDesc.map(student => (
              <div key={student.id} className="flex items-center gap-3">
                <span className="text-xs text-surface-400 w-20 truncate shrink-0">{student.name}</span>
                <div className="flex-1">
                  <ProgressBar value={student.progress} showPercentage={false} size="sm" />
                </div>
                <span className={`text-xs font-bold w-10 text-right shrink-0 ${student.progress < 50 ? 'text-danger-600' : student.progress < 75 ? 'text-warning-600' : 'text-success-600'}`}>
                  {student.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
