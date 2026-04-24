/**
 * Admin Page — Dedicated interface for updating student submission status
 * Checklist-style grid: students × meetings (P1-P16)
 */

import { useState } from 'react';
import { TASK_KEYS } from '../utils/constants';
import { calculateProgress, getSubmittedCount } from '../utils/calculations';

const P1_TO_P16 = TASK_KEYS.filter(k => k !== 'final');

export default function Admin({ students, onUpdateTask, onResetData, onLogout }) {
  const [editingStudent, setEditingStudent] = useState(null);

  const handleToggleTask = (studentId, taskKey, currentValue) => {
    if (currentValue !== null && currentValue !== undefined) {
      onUpdateTask(studentId, taskKey, null);
    } else {
      onUpdateTask(studentId, taskKey, 100);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Page header bar */}
      <div className="flex items-center justify-between">
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

      {/* Page Title */}
      <div className="animate-fade-in">
        <h2 className="text-3xl font-black text-surface-100 tracking-tight">
          Admin <span className="text-primary-gradient">Panel</span>
        </h2>
        <p className="text-sm text-surface-500 mt-1">Kelola pengumpulan tugas pertemuan 1-16.</p>
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
                <th className="px-5 text-center w-20">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                const submitted = getSubmittedCount(student);
                const progress = calculateProgress(student);
                const isAtRisk = progress < 50;
                const initials = student.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const isEditing = editingStudent === student.id;

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

                    {/* 16 task circles — clickable */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-1 justify-center flex-wrap">
                        {P1_TO_P16.map(key => {
                          const val = student.tasks[key];
                          const done = val !== null && val !== undefined;
                          return (
                            <button
                              key={key}
                              onClick={() => handleToggleTask(student.id, key, val)}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all active:scale-90 ${
                                done
                                  ? 'bg-primary-500 border-primary-500 hover:bg-primary-600'
                                  : 'bg-transparent border-surface-600/50 hover:border-primary-400/60'
                              }`}
                              title={`P${P1_TO_P16.indexOf(key) + 1}: ${done ? 'Sudah — klik untuk hapus' : 'Belum — klik untuk set'}`}
                            >
                              {done && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className={`text-[11px] font-bold uppercase tracking-wide ${isAtRisk ? 'text-danger-600' : progress < 75 ? 'text-warning-600' : 'text-success-600'}`}>
                          {isAtRisk ? 'AT RISK' : progress < 75 ? 'MEDIUM' : 'HIGH'}
                        </span>
                        <span className="text-xs text-surface-400 tabular-nums">
                          {submitted}/16 ({progress}%)
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={() => setEditingStudent(isEditing ? null : student.id)}
                        className="p-2 rounded-xl text-surface-400 hover:text-primary-600 hover:bg-primary-500/10 transition-all duration-200 active:scale-90"
                        title="Edit mahasiswa"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-surface-500 py-2">
        <span>Total {students.length} mahasiswa terdaftar</span>
        <button
          onClick={() => { if (window.confirm('⚠️ Reset semua data?')) onResetData(); }}
          className="px-3 py-1.5 rounded-lg text-surface-500 hover:text-danger-500 hover:bg-danger-500/10 transition-all border border-transparent hover:border-danger-500/20 text-[11px] font-medium"
        >
          Reset Data
        </button>
      </div>
    </div>
  );
}
