/**
 * Application-wide constants
 * Centralized configuration for the monitoring system
 */

// Task keys — P1 through P16 + Final
export const TASK_KEYS = [
  'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8',
  'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16',
  'final'
];

// Total number of tasks (16 pertemuan + 1 final)
export const TOTAL_TASKS = TASK_KEYS.length; // 17

// Task display labels for UI
export const TASK_LABELS = {
  p1: 'P1', p2: 'P2', p3: 'P3', p4: 'P4',
  p5: 'P5', p6: 'P6', p7: 'P7', p8: 'P8',
  p9: 'P9', p10: 'P10', p11: 'P11', p12: 'P12',
  p13: 'P13', p14: 'P14', p15: 'P15', p16: 'P16',
  final: 'Final'
};

// Status thresholds for color coding
export const STATUS_THRESHOLDS = {
  danger: 50,   // < 50% = red (At Risk)
  warning: 75,  // 50-75% = yellow (Medium)
  // > 75% = green (High Performer)
};

// Cluster labels for student categorization
export const CLUSTER_LABELS = {
  HIGH: 'High Performer',
  MEDIUM: 'Medium',
  AT_RISK: 'At Risk',
};

// localStorage key for data persistence
export const STORAGE_KEY = 'tugas_metlit_students';
export const STORAGE_PREFS_KEY = 'tugas_metlit_preferences';

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  AT_RISK: 'at_risk',
  DONE: 'done',
};

// View modes
export const VIEW_MODES = {
  TABLE: 'table',
  CARD: 'card',
};

// Maximum score value
export const MAX_SCORE = 100;
export const MIN_SCORE = 0;
