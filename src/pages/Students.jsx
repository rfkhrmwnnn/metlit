/**
 * Students Page — Table/Card monitoring view with filters
 */

import { useState, useMemo } from 'react';
import { FILTER_OPTIONS, VIEW_MODES, STATUS_THRESHOLDS } from '../utils/constants';
import { filterStudents, calculateProgress } from '../utils/calculations';
import StudentTable from '../components/table/StudentTable';
import StudentCard from '../components/cards/StudentCard';
import SearchBar from '../components/filters/SearchBar';
import FilterTabs from '../components/filters/FilterTabs';
import ViewToggle from '../components/filters/ViewToggle';
import { generateCSV, downloadCSV } from '../utils/export';

export default function Students({ students, onUpdateTask, onDeleteStudent, onAddStudent, onResetData, onExportJSON }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(FILTER_OPTIONS.ALL);
  const [viewMode, setViewMode] = useState(VIEW_MODES.TABLE);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');

  // Filtered students
  const filteredStudents = useMemo(() => {
    return filterStudents(students, activeFilter, searchTerm);
  }, [students, activeFilter, searchTerm]);

  // Counts for filter tabs
  const filterCounts = useMemo(() => ({
    [FILTER_OPTIONS.ALL]: students.length,
    [FILTER_OPTIONS.AT_RISK]: students.filter(s => calculateProgress(s) < STATUS_THRESHOLDS.danger).length,
    [FILTER_OPTIONS.DONE]: students.filter(s => calculateProgress(s) === 100).length,
  }), [students]);

  const handleAddStudent = () => {
    if (newStudentName.trim()) {
      onAddStudent(newStudentName.trim());
      setNewStudentName('');
      setShowAddModal(false);
    }
  };

  const handleExport = () => {
    const json = onExportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tugas_metlit_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csv = generateCSV(students);
    downloadCSV(csv, `laporan_metlit_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleReset = () => {
    if (window.confirm('⚠️ Yakin ingin reset semua data ke data awal? Perubahan tidak bisa dikembalikan.')) {
      onResetData();
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-surface-100 tracking-tight">
            Data <span className="text-primary-gradient">Mahasiswa</span>
          </h2>
          <p className="text-sm text-surface-500 mt-1">Monitoring pengumpulan tugas metodologi penelitian.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExport}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-surface-300 bg-white/75 border border-surface-700/60 hover:bg-white hover:text-surface-200 transition-all"
            title="Export data ke JSON"
          >
            Export JSON
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-surface-300 bg-white/75 border border-surface-700/60 hover:bg-white hover:text-surface-200 transition-all"
            title="Export data ke CSV (Excel)"
          >
            Export CSV
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-surface-300 bg-white/75 border border-surface-700/60 hover:bg-danger-500/10 hover:text-danger-600 hover:border-danger-500/25 transition-all"
            title="Reset ke data awal"
          >
            Reset Data
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-accent-500 shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            + Tambah
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="w-full sm:w-64">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="overflow-x-auto w-full sm:w-auto">
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={filterCounts}
          />
        </div>
        <div className="sm:ml-auto">
          <ViewToggle activeView={viewMode} onViewChange={setViewMode} />
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-surface-400">
          Menampilkan <span className="font-semibold text-surface-300">{filteredStudents.length}</span> dari <span className="font-semibold text-surface-300">{students.length}</span> mahasiswa
        </p>
      </div>

      {/* Content: Table or Card View */}
      {viewMode === VIEW_MODES.TABLE ? (
        <StudentTable
          students={filteredStudents}
          onUpdateTask={onUpdateTask}
          onDelete={onDeleteStudent}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={onDeleteStudent}
            />
          ))}
          {filteredStudents.length === 0 && (
            <div className="col-span-full glass rounded-2xl p-12 text-center">
              <p className="text-surface-300 font-medium">Tidak ada mahasiswa ditemukan</p>
              <p className="text-surface-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 w-full max-w-md mx-4 animate-fade-in shadow-2xl border border-surface-700/70">
            <h3 className="text-lg font-semibold text-surface-100 mb-4">Tambah Mahasiswa Baru</h3>
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddStudent()}
              placeholder="Masukkan nama mahasiswa..."
              autoFocus
              className="w-full px-4 py-3 text-sm bg-white/80 border border-surface-700/80
                rounded-xl text-surface-200 placeholder-surface-400
                focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/50
                transition-all duration-200"
            />
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => { setShowAddModal(false); setNewStudentName(''); }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-surface-400 hover:text-surface-200 hover:bg-primary-500/10 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddStudent}
                disabled={!newStudentName.trim()}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
