/**
 * Calculation utilities for student monitoring
 * Pure functions — no side effects
 */

import { TASK_KEYS, TOTAL_TASKS, STATUS_THRESHOLDS } from './constants';

/**
 * Count the number of submitted (non-null) tasks for a student
 * @param {Object} student - Student object with tasks
 * @returns {number} Count of submitted tasks
 */
export function getSubmittedCount(student) {
  if (!student?.tasks) return 0;
  return TASK_KEYS.reduce((count, key) => {
    return count + (student.tasks[key] !== null && student.tasks[key] !== undefined ? 1 : 0);
  }, 0);
}

/**
 * Calculate progress percentage (how many tasks submitted out of total)
 * @param {Object} student - Student object with tasks
 * @returns {number} Progress percentage (0-100)
 */
export function calculateProgress(student) {
  const submitted = getSubmittedCount(student);
  return Math.round((submitted / TOTAL_TASKS) * 100);
}

/**
 * Calculate average score from submitted tasks only
 * @param {Object} student - Student object with tasks
 * @returns {number} Average score (0-100), or 0 if no tasks submitted
 */
export function calculateAverage(student) {
  if (!student?.tasks) return 0;

  const scores = TASK_KEYS
    .map(key => student.tasks[key])
    .filter(val => val !== null && val !== undefined);

  if (scores.length === 0) return 0;

  const sum = scores.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / scores.length) * 10) / 10; // 1 decimal place
}

/**
 * Get Tailwind CSS color classes based on a numeric value
 * @param {number} value - Value to evaluate (0-100)
 * @returns {{ bg: string, text: string, border: string, dot: string }} Color class set
 */
export function getStatusColor(value) {
  if (value < STATUS_THRESHOLDS.danger) {
    return {
      bg: 'bg-danger-500/15',
      text: 'text-danger-400',
      border: 'border-danger-500',
      dot: 'bg-danger-500',
      label: 'Rendah',
    };
  }
  if (value < STATUS_THRESHOLDS.warning) {
    return {
      bg: 'bg-warning-500/15',
      text: 'text-warning-400',
      border: 'border-warning-500',
      dot: 'bg-warning-500',
      label: 'Sedang',
    };
  }
  return {
    bg: 'bg-success-500/15',
    text: 'text-success-400',
    border: 'border-success-500',
    dot: 'bg-success-500',
    label: 'Baik',
  };
}

/**
 * Get cell background color for a single score value
 * @param {number|null} score - Task score
 * @returns {string} Tailwind class string
 */
export function getCellColor(score) {
  if (score === null || score === undefined) return 'bg-surface-800/50 text-surface-500';
  if (score < STATUS_THRESHOLDS.danger) return 'bg-danger-500/10 text-danger-400';
  if (score < STATUS_THRESHOLDS.warning) return 'bg-warning-500/10 text-warning-400';
  return 'bg-success-500/10 text-success-400';
}

/**
 * Filter students based on filter type and search term
 * @param {Array} students - Array of student objects
 * @param {string} filter - Filter type: 'all', 'at_risk', 'done'
 * @param {string} searchTerm - Search string to match against name
 * @returns {Array} Filtered student array
 */
export function filterStudents(students, filter = 'all', searchTerm = '') {
  let result = [...students];

  // Apply search filter
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    result = result.filter(s => s.name.toLowerCase().includes(term));
  }

  // Apply status filter
  switch (filter) {
    case 'at_risk':
      result = result.filter(s => calculateProgress(s) < STATUS_THRESHOLDS.danger);
      break;
    case 'done':
      result = result.filter(s => calculateProgress(s) === 100);
      break;
    case 'all':
    default:
      break;
  }

  return result;
}

/**
 * Generate summary statistics from students array
 * @param {Array} students - Array of student objects
 * @returns {Object} Summary stats
 */
export function generateStats(students) {
  if (!students || students.length === 0) {
    return {
      totalStudents: 0,
      averageProgress: 0,
      averageScore: 0,
      atRiskCount: 0,
      completedCount: 0,
      atRiskPercentage: 0,
    };
  }

  const progresses = students.map(calculateProgress);
  const averages = students.map(calculateAverage);

  const totalStudents = students.length;
  const averageProgress = Math.round(progresses.reduce((a, b) => a + b, 0) / totalStudents);
  const averageScore = Math.round((averages.reduce((a, b) => a + b, 0) / totalStudents) * 10) / 10;
  const atRiskCount = progresses.filter(p => p < STATUS_THRESHOLDS.danger).length;
  const completedCount = progresses.filter(p => p === 100).length;

  return {
    totalStudents,
    averageProgress,
    averageScore,
    atRiskCount,
    completedCount,
    atRiskPercentage: Math.round((atRiskCount / totalStudents) * 100),
  };
}
