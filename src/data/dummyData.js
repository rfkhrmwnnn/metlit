/**
 * Initial student data seeded from data_tugas_metlit.xlsx
 * Status "Sudah"/"Belum" diambil langsung dari file Excel
 */

import { TASK_KEYS } from '../utils/constants';

// Data mahasiswa dari Excel: { name, nim, status }
const STUDENT_DATA = [
  { name: 'Ahnaf Endra E', nim: '43230188', status: 'Belum' },
  { name: 'Alif',          nim: '43230104', status: 'Belum' },
  { name: 'Anggun Riani',  nim: '43230194', status: 'Belum' },
  { name: 'Burhan',        nim: '43230103', status: 'Sudah' },
  { name: 'Dede',          nim: '43230112', status: 'Sudah' },
  { name: 'Dina',          nim: '43230115', status: 'Sudah' },
  { name: 'Jeri',          nim: '43230125', status: 'Belum' },
  { name: 'Fitri',         nim: '43230118', status: 'Belum' },
  { name: 'Faisal',        nim: '43230117', status: 'Sudah' },
  { name: 'Haikal',        nim: '43230122', status: 'Sudah' },
  { name: 'Saeful',        nim: '43230152', status: 'Belum' },
  { name: 'Sefti',         nim: '43230155', status: 'Belum' },
  { name: 'Susi',          nim: '43230161', status: 'Sudah' },
  { name: 'Salsa',         nim: '43230153', status: 'Belum' },
  { name: 'Shafa',         nim: '43230156', status: 'Belum' },
  { name: 'Risma',         nim: '43230144', status: 'Belum' },
  { name: 'Rifki',         nim: '43230143', status: 'Sudah' },
  { name: 'Rodhotul',      nim: '43230148', status: 'Belum' },
  { name: 'Rizki',         nim: '43230147', status: 'Belum' },
  { name: 'Farhan',        nim: '43230116', status: 'Belum' },
  { name: 'Sabila',        nim: '43230151', status: 'Belum' },
  { name: 'Dadan',         nim: '43230111', status: 'Belum' },
  { name: 'Faqih',         nim: '43230119', status: 'Sudah' },
  { name: 'Revan',         nim: '43230142', status: 'Belum' },
  { name: 'Faujiah',       nim: '43230120', status: 'Belum' },
  { name: 'Winah',         nim: '43230178', status: 'Belum' },
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
    nim: data.nim,
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
