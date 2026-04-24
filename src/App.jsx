/**
 * App.jsx — Root component
 * Orchestrates layout, routing, state management, and admin auth
 */

import { useState, useEffect, useCallback } from 'react';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Admin from './pages/Admin';
import LoginForm from './components/auth/LoginForm';
import { useStudents } from './hooks/useStudents';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const {
    students,
    addStudent,
    updateTask,
    deleteStudent,
    resetData,
    exportAsJSON,
  } = useStudents();

  const handleAdminLogin = useCallback(() => {
    setIsAdminAuth(true);
  }, []);

  const handleAdminLogout = useCallback(() => {
    localStorage.removeItem('admin_authenticated');
    setIsAdminAuth(false);
    setActivePage('dashboard');
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard students={students} />;
      case 'students':
        return (
          <Students
            students={students}
            onUpdateTask={updateTask}
            onDeleteStudent={deleteStudent}
            onAddStudent={addStudent}
            onResetData={resetData}
            onExportJSON={exportAsJSON}
          />
        );
      case 'admin':
        // Gate behind login
        if (!isAdminAuth) {
          return <LoginForm onLoginSuccess={handleAdminLogin} />;
        }
        return (
          <Admin
            students={students}
            onUpdateTask={updateTask}
            onResetData={resetData}
            onLogout={handleAdminLogout}
          />
        );
      default:
        return <Dashboard students={students} />;
    }
  };

  return (
    <MainLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </MainLayout>
  );
}
