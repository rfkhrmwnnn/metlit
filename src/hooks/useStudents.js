/**
 * useStudents — Custom hook for student data management
 * Handles CRUD operations + localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEY } from '../utils/constants';
import { generateDummyData, createEmptyStudent } from '../data/dummyData';

/**
 * Load students from localStorage, or generate dummy data if none exists
 * @returns {Array} Student array
 */
function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load from localStorage:', err);
  }
  // Generate and return dummy data if nothing in storage
  return generateDummyData();
}

/**
 * Save students array to localStorage
 * @param {Array} students
 */
function saveToStorage(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export function useStudents() {
  const [students, setStudents] = useState(() => loadFromStorage());
  const [isLoading, setIsLoading] = useState(false);

  // Auto-save whenever students change
  useEffect(() => {
    saveToStorage(students);
  }, [students]);

  /**
   * Add a new student
   * @param {string} name - Student name
   */
  const addStudent = useCallback((name) => {
    if (!name || !name.trim()) return;

    setStudents(prev => {
      const maxId = prev.reduce((max, s) => Math.max(max, s.id), 0);
      const newStudent = createEmptyStudent(maxId + 1, name.trim());
      return [...prev, newStudent];
    });
  }, []);

  /**
   * Update a specific task score for a student
   * @param {number} studentId - Student ID
   * @param {string} taskKey - Task key (e.g., 'p1', 'final')
   * @param {number|null} value - New score value (0-100 or null)
   */
  const updateTask = useCallback((studentId, taskKey, value) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.id !== studentId) return student;
        return {
          ...student,
          tasks: { ...student.tasks, [taskKey]: value },
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  /**
   * Update student name
   * @param {number} studentId - Student ID
   * @param {string} name - New name
   */
  const updateStudentName = useCallback((studentId, name) => {
    if (!name || !name.trim()) return;

    setStudents(prev =>
      prev.map(student => {
        if (student.id !== studentId) return student;
        return {
          ...student,
          name: name.trim(),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  /**
   * Delete a student by ID
   * @param {number} studentId - Student ID
   */
  const deleteStudent = useCallback((studentId) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  }, []);

  /**
   * Import students data (replaces current data)
   * @param {Array} data - Array of student objects
   */
  const importStudents = useCallback((data) => {
    if (Array.isArray(data) && data.length > 0) {
      setStudents(data);
    }
  }, []);

  /**
   * Reset to dummy data
   */
  const resetData = useCallback(() => {
    const freshData = generateDummyData();
    setStudents(freshData);
  }, []);

  /**
   * Export students as JSON string
   * @returns {string} JSON string
   */
  const exportAsJSON = useCallback(() => {
    return JSON.stringify(students, null, 2);
  }, [students]);

  return {
    students,
    isLoading,
    addStudent,
    updateTask,
    updateStudentName,
    deleteStudent,
    importStudents,
    resetData,
    exportAsJSON,
  };
}
