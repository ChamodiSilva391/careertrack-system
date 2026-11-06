import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronDown 
} from 'lucide-react';

export default function Navbar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    setIsJobModalOpen, 
    setEditingJob,
    exportToJSON,
    exportToCSV,
  } = useApp();

  const { currentUser, logout, setIsAuthModalOpen, setAuthMode } = useAuth();

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleOpenAdd = () => {
    setEditingJob(null);
    setIsJobModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">CareerTrack</span>
              <p className="text-xs text-slate-500 hidden sm:block">Smart Job Application Management</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-md mx-2 hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Export Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                title="Export Applications"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span className="hidden md:inline">Export</span>
              </button>

              {showExportMenu && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in"
                  onClick={() => setShowExportMenu(false)}
                >
                  <button
                    onClick={exportToCSV}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Export to CSV (Excel)</span>
                  </button>
                  <button
                    onClick={exportToJSON}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <FileCode className="w-4 h-4 text-indigo-600" />
                    <span>Export to JSON</span>
                  </button>
                </div>
              )}
            </div>

            {/* Add Application Button */}
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-indigo-100 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Job</span>
            </button>

            {/* User Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl hover:bg-slate-100 border border-slate-200 transition"
                >
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-7 h-7 rounded-lg object-cover border border-slate-200" 
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      {(currentUser.displayName || currentUser.email || 'U').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-700 hidden sm:inline max-w-[120px] truncate">
                    {currentUser.displayName || currentUser.email}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="p-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentUser.displayName || 'User'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 mt-1 font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleOpenLogin}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={handleOpenSignup}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
