import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Kanban, 
  CalendarClock, 
  BarChart3, 
  Settings,
  Flame,
  LogIn,
  LogOut,
  TrendingUp
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, stats, jobs } = useApp();
  const { currentUser, logout, setIsAuthModalOpen, setAuthMode } = useAuth();

  const interviewCount = React.useMemo(() => {
    let count = 0;
    (jobs || []).forEach(j => {
      if (j.interviews && Array.isArray(j.interviews)) {
        count += j.interviews.length;
      }
    });
    return count;
  }, [jobs]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'jobs', label: 'Job Applications', icon: Briefcase, badge: stats.total },
    { id: 'board', label: 'Kanban Pipeline', icon: Kanban, badge: null },
    { id: 'interviews', label: 'Interview Schedule', icon: CalendarClock, badge: interviewCount > 0 ? interviewCount : null, badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3, badge: null },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation Links */}
      <div className="p-4 space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm shadow-indigo-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && item.badge > 0 && (
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Career Momentum Box */}
        <div className="mt-8 p-3.5 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 rounded-2xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-700 font-bold text-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Application Momentum</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Organizing your pipeline increases interview response rates by up to 3x.
          </p>
          <div className="mt-2.5 pt-2 border-t border-indigo-100/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Interview Rate:</span>
            <span className="font-bold text-emerald-600">{stats.interviewRate}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Profile & Firebase Setup Cards */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        
        {/* User Profile Card */}
        {currentUser ? (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'User'} 
                  className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0" 
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {(currentUser.displayName || currentUser.email || 'U').substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {currentUser.displayName || 'Job Seeker'}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setAuthMode('login');
              setIsAuthModalOpen(true);
            }}
            className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Sign Up</span>
          </button>
        )}

      </div>

    </aside>
  );
}
