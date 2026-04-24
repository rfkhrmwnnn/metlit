/**
 * Dashboard Page — Data Mahasiswa overview with student task table
 */

import { useMemo } from 'react';
import { TASK_KEYS } from '../utils/constants';
import { calculateProgress, getSubmittedCount } from '../utils/calculations';

const P1_TO_P16 = TASK_KEYS.filter(k => k !== 'final');

function PageHeader() {
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date());

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2 text-sm text-surface-400">
        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="font-medium">{formattedDate}</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/30 transition-all" title="Refresh">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-500/8 border border-success-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
          <span className="text-[11px] font-bold text-success-600 uppercase tracking-wider">System Live</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ students }) {
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const atRiskCount = students.filter(s => calculateProgress(s) < 50).length;
    const tugasMasuk = students.reduce((sum, s) => sum + getSubmittedCount(s), 0);
    return { totalStudents, atRiskCount, tugasMasuk };
  }, [students]);

  return (
    <div className="space-y-6">
      <PageHeader />

      {/* Page Title */}
      <div className="animate-fade-in">
        <h2 className="text-3xl font-black text-surface-100 tracking-tight">
          Data <span className="text-primary-gradient">Mahasiswa</span>
        </h2>
        <p className="text-sm text-surface-500 mt-1">Status rekapitulasi tugas metodelogi penelitian.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {/* Total Mahasiswa */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
              </svg>
            </div>
            <svg className="w-4 h-4 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-surface-500 uppercase tracking-[0.18em] mb-1">Total Mahasiswa</p>
          <p className="text-3xl font-black text-surface-100">{stats.totalStudents}</p>
        </div>

        {/* System Live */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-success-500/10 border border-success-500/20 text-success-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <svg className="w-4 h-4 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-surface-500 uppercase tracking-[0.18em] mb-1">System Live</p>
          <p className="text-3xl font-black text-success-600">Active</p>
        </div>

        {/* Tugas Masuk */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <svg className="w-4 h-4 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-surface-500 uppercase tracking-[0.18em] mb-1">Tugas Masuk</p>
          <p className="text-3xl font-black text-surface-100">{stats.tugasMasuk}</p>
        </div>

        {/* At Risk */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-danger-500/10 border border-danger-500/20 text-danger-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <svg className="w-4 h-4 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-surface-500 uppercase tracking-[0.18em] mb-1">At Risk</p>
          <p className="text-3xl font-black text-danger-500">{stats.atRiskCount}</p>
        </div>
      </div>

      {/* Student Table */}
      <div className="table-container shadow-xl animate-slide-up">
        <div className="px-5 py-4 border-b border-surface-700/40">
          <h3 className="text-sm font-semibold text-surface-200">Daftar Mahasiswa &amp; Progres Mingguan (1-16)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-surface-700/50">
                <th className="px-5 text-left min-w-[200px]">Mahasiswa</th>
                <th className="px-3 text-center">Pertemuan 1 - 16 (Tugas)</th>
                <th className="px-5 text-right min-w-[160px]">Progres</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                const submitted = getSubmittedCount(student);
                const progress = calculateProgress(student);
                const isAtRisk = progress < 50;
                const initials = student.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

                return (
                  <tr
                    key={student.id}
                    className={`border-b border-surface-700/40 hover:bg-primary-500/[0.03] transition-colors ${isAtRisk ? 'row-danger-premium' : ''}`}
                  >
                    {/* Student info */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-danger-500/15 border border-danger-500/20 flex items-center justify-center text-xs font-black text-danger-600 shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-surface-100">{student.name}</p>
                          <p className="text-[11px] text-surface-500">{student.nim}</p>
                        </div>
                      </div>
                    </td>

                    {/* 16 task circles */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-1 justify-center flex-wrap">
                        {P1_TO_P16.map(key => {
                          const done = student.tasks[key] !== null && student.tasks[key] !== undefined;
                          return (
                            <div
                              key={key}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                done
                                  ? 'bg-primary-500 border-primary-500'
                                  : 'bg-transparent border-surface-600/50'
                              }`}
                            >
                              {done && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-[11px] font-bold text-danger-600 uppercase tracking-wide">
                          {isAtRisk ? 'AT RISK' : progress < 75 ? 'MEDIUM' : 'HIGH'}
                        </span>
                        <span className="text-xs text-surface-400 tabular-nums">
                          {submitted}/16 ({progress}%)
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
