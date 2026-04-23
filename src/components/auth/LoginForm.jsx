/**
 * LoginForm — Admin authentication gate
 * Simple credential check (no backend)
 */

import { useState } from 'react';

// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'adminmetlit';

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate brief loading for UX
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_authenticated', 'true');
        onLoginSuccess();
      } else {
        setError('Username atau password salah!');
        setPassword('');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="glass-card rounded-3xl p-10 shadow-[0_0_50px_rgba(47,143,255,0.15)] border border-surface-700/70 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary-500/10 blur-[50px] pointer-events-none" />
          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 shadow-[0_10px_30px_rgba(59,82,255,0.4)] transition-transform hover:scale-110 duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-surface-100 tracking-tight">Admin <span className="text-primary-600">Login</span></h2>
            <p className="text-xs font-bold text-surface-400 mt-2 uppercase tracking-[0.15em]">Sistem Panel Otentikasi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Username */}
            <div>
              <label htmlFor="admin-username" className="block text-[10px] font-black text-surface-400 uppercase tracking-[0.2em] mb-2 pl-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 group-focus-within:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    autoFocus
                    autoComplete="username"
                    className="w-full pl-12 pr-4 py-4 text-sm bg-white/85 border border-surface-700/70
                      rounded-2xl text-surface-100 placeholder-surface-500
                      focus:outline-none focus:border-primary-500/50
                      transition-all duration-300 shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="block text-[10px] font-black text-surface-400 uppercase tracking-[0.2em] mb-2 pl-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 group-focus-within:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    className="w-full pl-12 pr-4 py-4 text-sm bg-white/85 border border-surface-700/70
                      rounded-2xl text-surface-100 placeholder-surface-500
                      focus:outline-none focus:border-primary-500/50
                      transition-all duration-300 shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-danger-500/10 border border-danger-500/20 animate-fade-in">
                <svg className="w-4 h-4 text-danger-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-danger-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!username || !password || isLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white
                bg-gradient-to-r from-primary-600 to-primary-500
                hover:from-primary-500 hover:to-primary-400
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-primary-500/20
                transition-all duration-200 hover:-translate-y-0.5
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Memverifikasi...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Masuk ke Admin Panel
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p className="text-center text-[11px] text-surface-600 mt-4">
          Akses terbatas untuk admin
        </p>
      </div>
    </div>
  );
}
