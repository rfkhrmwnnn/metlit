/**
 * Initial student data seeded from data_tugas_metlit.xlsx
 * Status "Sudah"/"Belum" diambil langsung dari file Excel
 */

import { TASK_KEYS } from '../utils/constants';

// Data mahasiswa dari Excel: { nama, status }
const STUDENT_DATA = [
  { name: 'Alif',     status: 'Belum' },
  { name: 'Ahnaf',    status: 'Belum' },
  { name: 'Anggun',   status: 'Belum' },
  { name: 'Burhan',   status: 'Sudah' },
  { name: 'Dede',     status: 'Sudah' },
  { name: 'Dina',     status: 'Sudah' },
  { name: 'Jeri',     status: 'Belum' },
  { name: 'Fitri',    status: 'Belum' },
  { name: 'Faisal',   status: 'Sudah' },
  { name: 'Haikal',   status: 'Sudah' },
  { name: 'Saeful',   status: 'Belum' },
  { name: 'Sefti',    status: 'Belum' },
  { name: 'Susi',     status: 'Sudah' },
  { name: 'Salsa',    status: 'Belum' },
  { name: 'Shafa',    status: 'Belum' },
  { name: 'Risma',    status: 'Belum' },
  { name: 'Rifki',    status: 'Sudah' },
  { name: 'Rodhotul', status: 'Belum' },
  { name: 'Rizki',    status: 'Belum' },
  { name: 'Farhan',   status: 'Belum' },
  { name: 'Sabila',   status: 'Belum' },
  { name: 'Dadan',    status: 'Belum' },
  { name: 'Faqih',    status: 'Sudah' },
  { name: 'Revan',    status: 'Belum' },
  { name: 'Faujiah',  status: 'Belum' },
  { name: 'Winah',    status: 'Belum' },
];

/**
 * Create an empty tasks object (all null)
 * @returns {Object} Tasks with all keys set to null
 */
function createEmptyTasks() {
  const tasks = {};
  TASK_KEYS.forEach(key => { tasks[key] = null; });
  return tasks;
}

/**
 * Generate initial data set with student names + status from Excel
 * All scores are null — to be filled in by admin
 * @returns {Array} Array of student objects
 */
export function generateDummyData() {
  const now = new Date().toISOString();

  return STUDENT_DATA.map((data, index) => ({
    id: index + 1,
    name: data.name,
    nim: `2024${String(index + 1).padStart(3, '0')}`,
    status: data.status,  // "Sudah" atau "Belum" dari Excel
    tasks: createEmptyTasks(),
    createdAt: now,
    updatedAt: now,
  }));
}

/**
 * Create an empty student object
 * @param {number} id - Student ID
 * @param {string} name - Student name
 * @returns {Object} Empty student object
 */
export function createEmptyStudent(id, name) {
  const now = new Date().toISOString();
  const tasks = {};
  TASK_KEYS.forEach(key => { tasks[key] = null; });

  return {
    id,
    name,
    nim: '',
    status: 'Belum',
    tasks,
    createdAt: now,
    updatedAt: now,
  };
}
