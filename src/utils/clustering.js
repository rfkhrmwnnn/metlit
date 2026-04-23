/**
 * Simple rule-based clustering for student categorization
 */

import { calculateProgress, calculateAverage } from './calculations';
import { STATUS_THRESHOLDS, CLUSTER_LABELS } from './constants';

/**
 * Determine cluster label for a student based on progress and average score
 * @param {Object} student - Student object
 * @returns {{ label: string, color: string, bgColor: string, borderColor: string }}
 */
export function getClusterLabel(student) {
  const progress = calculateProgress(student);
  const average = calculateAverage(student);

  // High Performer: progress >= 75% AND average >= 75
  if (progress >= STATUS_THRESHOLDS.warning && average >= STATUS_THRESHOLDS.warning) {
    return {
      label: CLUSTER_LABELS.HIGH,
      color: 'text-success-400',
      bgColor: 'bg-success-500/15',
      borderColor: 'border-success-500/30',
      emoji: '🌟',
    };
  }

  // At Risk: progress < 50% AND average < 50
  if (progress < STATUS_THRESHOLDS.danger && average < STATUS_THRESHOLDS.danger) {
    return {
      label: CLUSTER_LABELS.AT_RISK,
      color: 'text-danger-400',
      bgColor: 'bg-danger-500/15',
      borderColor: 'border-danger-500/30',
      emoji: '⚠️',
    };
  }

  // Medium: everything else
  return {
    label: CLUSTER_LABELS.MEDIUM,
    color: 'text-warning-400',
    bgColor: 'bg-warning-500/15',
    borderColor: 'border-warning-500/30',
    emoji: '📊',
  };
}

/**
 * Get cluster distribution from students array
 * @param {Array} students - Array of student objects
 * @returns {Array} Array of { name, count, percentage, color }
 */
export function getClusterDistribution(students) {
  if (!students || students.length === 0) return [];

  const clusters = {
    [CLUSTER_LABELS.HIGH]: { count: 0, color: '#22c55e' },
    [CLUSTER_LABELS.MEDIUM]: { count: 0, color: '#f59e0b' },
    [CLUSTER_LABELS.AT_RISK]: { count: 0, color: '#ef4444' },
  };

  students.forEach(student => {
    const { label } = getClusterLabel(student);
    clusters[label].count++;
  });

  return Object.entries(clusters).map(([name, data]) => ({
    name,
    count: data.count,
    percentage: Math.round((data.count / students.length) * 100),
    color: data.color,
  }));
}
