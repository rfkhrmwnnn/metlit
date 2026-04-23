/**
 * Admin Page — Dedicated interface for updating student submission status
 * Checklist-style grid: students × meetings (P1-P16 + Final)
 */

import { useState, useMemo } from 'react';
import { TASK_KEYS, TASK_LABELS } from '../utils/constants';
import { calculateProgress, getStatusColor } from '../utils/calculations';
import SearchBar from '../components/filters/SearchBar';

export default function Admin({ students, onUpdateTask, onToggleStatus, onResetData, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null); // null = show all

  // Filtered students
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return students;
    const term = searchTerm.toLowerCase();
    return students.filter(s => s.name.toLowerCase().includes(term));
  }, [students, searchTerm]);

  // Stats for the selected meeting
  const meetingStats = useMemo(() => {
    if (!selectedMeeting) return null;
    const sudah = students.filter(s => s.tasks[selectedMeeting] !== null && s.tasks[selectedMeeting] !== undefined).length;
    return { sudah, belum: students.length - sudah, total: students.length };
  }, [students, selectedMeeting]);

  // Overall stats per meeting
  const overallStats = useMemo(() => {
    return TASK_KEYS.map(key => {
      const sudah = students.filter(s => s.tasks[key] !== null && s.tasks[key] !== undefined).length;
      return { key, sudah, belum: students.length - sudah };
    });
  }, [students]);

  // Toggle: jika sudah ada nilai → set null, jika null → set 100 (default "sudah")
  const handleToggleTask = (studentId, taskKey, currentValue) => {
    if (currentValue !== null && currentValue !== undefined) {
      onUpdateTask(studentId, taskKey, null); // Set ke belum
    } else {
      onUpdateTask(studentId, taskKey, 100); // Set ke sudah (default 100)
    }
  };

  // Bulk set all students for a meeting
  const handleBulkSet = (taskKey, value) => {
    const label = value !== null ? 'Sudah' : 'Belum';
    if (window.confirm(`⚠️ Set semua mahasiswa ke "${label}" untuk ${TASK_LABELS[taskKey]}?`)) {
      students.forEach(s => {
        onUpdateTask(s.id, taskKey, value);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-surface-100 tracking-tight">
              Admin <span className="text-primary-600">Panel</span>
            </h2>
            <p className="text-xs font-medium text-surface-400 mt-1 uppercase tracking-wider">Update status pengumpulan tugas per pertemuan</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-surface-500 uppercase tracking-widest mr-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-success-500/20 border border-success-500/50 shadow-[0_0_8px_rgba(16,185,129,0.2)]"></span> Sudah
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-surface-700/50 border border-white/10"></span> Belum
            </span>
          </div>
          <button
            onClick={onLogout}
            className="px-5 py-2.5 rounded-2xl text-[11px] font-bold text-danger-600 bg-danger-500/10 border border-danger-500/25 hover:bg-danger-500/20 transition-all duration-300 flex items-center gap-2 active:scale-95 uppercase tracking-widest"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>
      </div>

      {/* Meeting Selector Pills */}
      <div className="glass-card rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-[0.2em]">Pilih Pertemuan</p>
          <button
            onClick={() => setSelectedMeeting(null)}
            className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest transition-all ${
              selectedMeeting === null
                ? 'bg-primary-500/15 text-primary-700 border border-primary-500/30 shadow-[0_0_15px_rgba(47,143,255,0.2)]'
                : 'text-surface-500 hover:text-surface-300'
            }`}
          >
            Tampilkan Semua
          </button>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {overallStats.map(stat => {
            const isActive = selectedMeeting === stat.key;
            const completionPct = Math.round((stat.sudah / students.length) * 100) || 0;

            return (
              <button
                key={stat.key}
                onClick={() => setSelectedMeeting(stat.key)}
                className={`
                  relative flex flex-col items-center gap-1 px-4 py-3 rounded-2xl text-xs font-bold
                  transition-all duration-300 min-w-[64px] overflow-hidden group
                  ${isActive
                    ? 'bg-primary-500/15 text-primary-700 ring-1 ring-primary-500/30 shadow-lg shadow-primary-500/10'
                    : 'bg-white/65 text-surface-400 border border-surface-700/70 hover:bg-white hover:text-surface-200'
                  }
                `}
              >
                {/* Progress fill background */}
                <div
                  className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out ${
                    completionPct === 100 ? 'bg-success-500/10' : 'bg-primary-500/10'
                  }`}
                  style={{ height: `${completionPct}%` }}
                />
                <span className="relative z-10 transition-transform group-hover:scale-110">{TASK_LABELS[stat.key]}</span>
                <span className="relative z-10 text-[9px] font-black opacity-60 tracking-widest">{stat.sudah}/{students.length}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats bar for selected meeting */}
      {selectedMeeting && meetingStats && (
        <div className="glass-card rounded-3xl p-6 animate-scale-up border-primary-500/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                <span className="text-xl font-black text-primary-600">{TASK_LABELS[selectedMeeting]}</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-surface-100 tracking-tight">{TASK_LABELS[selectedMeeting]} Overview</h3>
                <span className="text-xs font-medium text-surface-500">
                  <span className="text-success-600 font-bold">{meetingStats.sudah}</span> dari {meetingStats.total} mahasiswa sudah mengumpulkan
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleBulkSet(selectedMeeting, 100)}
                className="px-4 py-2 rounded-xl text-[10px] font-bold bg-success-500/10 text-success-600 border border-success-500/25 hover:bg-success-500/20 transition-all uppercase tracking-widest active:scale-95"
              >
                Set Semua Sudah
              </button>
              <button
                onClick={() => handleBulkSet(selectedMeeting, null)}
                className="px-4 py-2 rounded-xl text-[10px] font-bold bg-danger-500/10 text-danger-600 border border-danger-500/25 hover:bg-danger-500/20 transition-all uppercase tracking-widest active:scale-95"
              >
                Set Semua Belum
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-3 bg-surface-800 rounded-full overflow-hidden shadow-inner p-0.5 border border-surface-700/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-success-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(47,143,255,0.35)]"
              style={{ width: `${Math.round((meetingStats.sudah / meetingStats.total) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Search */}
      <div className="w-full sm:w-80 animate-fade-in">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Cari nama mahasiswa..." />
      </div>

      {/* Checklist Grid */}
      <div className="table-container shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-surface-700/70 bg-surface-900/70">
                <th className="sticky left-0 z-20 bg-surface-950/90 backdrop-blur-md px-4 text-center border-r border-surface-700/70 w-12">
                  No
                </th>
                <th className="sticky left-[48px] z-20 bg-surface-950/90 backdrop-blur-md px-6 border-r border-surface-700/70 min-w-[200px] text-left">
                  Nama Mahasiswa
                </th>
                <th className="px-4 text-center border-r border-surface-700/70 min-w-[100px]">
                  Status
                </th>
                {(selectedMeeting ? [selectedMeeting] : TASK_KEYS).map(key => (
                  <th key={key} className="px-2 text-center min-w-[64px]">
                    {TASK_LABELS[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, idx) => {
                const tasksToShow = selectedMeeting ? [selectedMeeting] : TASK_KEYS;

                return (
                  <tr
                    key={student.id}
                    className="border-b border-surface-700/70 hover:bg-primary-500/[0.04] transition-colors duration-200"
                  >
                    <td className="sticky left-0 z-10 bg-surface-950/85 backdrop-blur-md px-4 text-center text-xs text-surface-500 font-bold border-r border-surface-700/70">
                      {idx + 1}
                    </td>
                    <td className="sticky left-[48px] z-10 bg-surface-950/85 backdrop-blur-md px-6 border-r border-surface-700/70">
                      <p className="text-sm font-bold text-surface-100 tracking-tight">{student.name}</p>
                    </td>
                    {/* Status Progress */}
                    <td className="px-4 py-3 text-center border-r border-surface-700/70">
                      <div className="flex flex-col items-center gap-1.5 min-w-[70px]">
                        <span className={`text-[11px] font-black tracking-tight ${getStatusColor(calculateProgress(student)).text}`}>
                          {calculateProgress(student)}%
                        </span>
                        <div className="w-full h-1 bg-surface-700/80 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${getStatusColor(calculateProgress(student)).dot} shadow-[0_0_8px_currentColor]`}
                            style={{ width: `${calculateProgress(student)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    {/* Per-meeting checkboxes */}
                    {tasksToShow.map(key => {
                      const val = student.tasks[key];
                      const hasValue = val !== null && val !== undefined;

                      return (
                        <td key={key} className="px-2 text-center">
                          <button
                            onClick={() => handleToggleTask(student.id, key, val)}
                            className={`
                              w-10 h-10 rounded-2xl flex items-center justify-center text-base
                              transition-all duration-300 cursor-pointer active:scale-90
                              ${hasValue
                                ? 'bg-primary-500/15 text-primary-700 border border-primary-500/25 hover:bg-primary-500/25 shadow-lg shadow-primary-500/10'
                                : 'bg-white/65 text-surface-500 border border-surface-700/70 hover:bg-white hover:text-surface-300'
                              }
                            `}
                            title={`${TASK_LABELS[key]}: ${hasValue ? `Sudah (${val})` : 'Belum'} — Klik untuk toggle`}
                          >
                            <span className="transition-transform group-hover:scale-125">
                              {hasValue ? '✓' : '·'}
                            </span>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary footer */}
      <div className="glass-card rounded-3xl p-5 border-surface-700/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em]">
            <p className="text-surface-400">
              Total Mahasiswa: <span className="text-surface-100 ml-1">{students.length}</span>
            </p>
            <div className="w-1 h-1 rounded-full bg-surface-700" />
            <p className="text-success-500/80">
              Sudah (100%): <span className="text-success-600 ml-1">{students.filter(s => calculateProgress(s) === 100).length}</span>
            </p>
            <div className="w-1 h-1 rounded-full bg-surface-700" />
            <p className="text-danger-500/80">
              Belum (100%): <span className="text-danger-600 ml-1">{students.filter(s => calculateProgress(s) < 100).length}</span>
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('⚠️ Reset semua data?')) onResetData();
            }}
            className="px-4 py-2 rounded-xl text-[10px] font-bold text-surface-500 hover:text-danger-400 hover:bg-danger-500/10 transition-all uppercase tracking-widest border border-transparent hover:border-danger-500/20"
          >
            Reset Master Data
          </button>
        </div>
      </div>
    </div>
  );
}
