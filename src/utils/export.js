/**
 * Export Utility — Convert data to CSV for reports
 */

import { TASK_KEYS, TASK_LABELS } from './constants';
import { calculateProgress, calculateAverage } from './calculations';

/**
 * Generate CSV content from students array
 * @param {Array} students 
 * @returns {string} CSV string
 */
export function generateCSV(students) {
  // Headers
  const headers = [
    'No',
    'Nama',
    'NIM',
    ...TASK_KEYS.map(key => TASK_LABELS[key]),
    'Progress (%)',
    'Rata-rata Nilai'
  ];

  // Rows
  const rows = students.map((s, idx) => {
    return [
      idx + 1,
      `"${s.name}"`,
      `"${s.nim}"`,
      ...TASK_KEYS.map(key => s.tasks[key] !== null ? s.tasks[key] : '0'),
      calculateProgress(s),
      calculateAverage(s)
    ];
  });

  // Combine
  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

/**
 * Trigger browser download of CSV file
 * @param {string} csvContent 
 * @param {string} fileName 
 */
export function downloadCSV(csvContent, fileName = 'laporan_monitoring.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
