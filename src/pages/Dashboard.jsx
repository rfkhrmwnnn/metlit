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
  // Sort students by progress (ascending — worst first)
  const sortedByProgress = [...students]
    .map(s => ({ ...s, progress: calculateProgress(s), average: calculateAverage(s) }))
    .sort((a, b) => a.progress - b.progress);

  // At-risk students (< 50% progress)
  const atRiskStudents = sortedByProgress.filter(s => s.progress < 50);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h2 className="text-3xl font-black text-surface-100 tracking-tight">
          System <span className="text-primary-600">Dashboard</span>
        </h2>
        <p className="text-xs font-bold text-surface-400 mt-1 uppercase tracking-[0.2em]">Ringkasan monitoring pengumpulan tugas mahasiswa</p>
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
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-surface-200">Mahasiswa Bermasalah</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-danger-500/15 text-danger-600">
              {atRiskStudents.length} orang
            </span>
          </div>
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {atRiskStudents.length === 0 ? (
              <p className="text-sm text-surface-400 text-center py-4">Tidak ada mahasiswa bermasalah</p>
            ) : (
              atRiskStudents.map(student => {
                const cluster = getClusterLabel(student);
                return (
                  <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/65 border border-surface-700/70 hover:bg-white transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${cluster.bgColor} ${cluster.color}`}>
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-surface-200 truncate">{student.name}</p>
                        <Badge {...cluster} size="xs" />
                      </div>
                      <ProgressBar value={student.progress} size="sm" className="mt-1.5" />
                    </div>
                    <span className="text-xs font-bold text-danger-600">{student.progress}%</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* All Students Progress */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-surface-200 mb-4">Progress Semua Mahasiswa</h3>
          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {sortedByProgress.reverse().map(student => (
              <div key={student.id} className="flex items-center gap-3">
                <span className="text-xs text-surface-400 w-20 truncate">{student.name}</span>
                <div className="flex-1">
                  <ProgressBar value={student.progress} showPercentage={false} size="sm" />
                </div>
                <span className={`text-xs font-bold w-10 text-right ${student.progress < 50 ? 'text-danger-600' : student.progress < 75 ? 'text-warning-600' : 'text-success-600'}`}>
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
