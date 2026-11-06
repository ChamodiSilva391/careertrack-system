import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import JobsView from './components/JobsView';
import KanbanView from './components/KanbanView';
import InterviewsView from './components/InterviewsView';
import AnalyticsView from './components/AnalyticsView';
import JobModal from './components/JobModal';
import InterviewModal from './components/InterviewModal';
import FirebaseModal from './components/FirebaseModal';
import AuthModal from './components/AuthModal';
import { 
  LayoutDashboard, 
  Briefcase, 
  Kanban, 
  CalendarClock, 
  BarChart3,
  Loader2
} from 'lucide-react';

function DashboardLayout() {
  const { activeTab, setActiveTab, loading, upcomingInterviews, stats } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-fade-in">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-sm font-medium">Loading CareerTrack database...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'jobs' && <JobsView />}
              {activeTab === 'board' && <KanbanView />}
              {activeTab === 'interviews' && <InterviewsView />}
              {activeTab === 'analytics' && <AnalyticsView />}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 flex items-center justify-around py-2 px-1 shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition ${
            activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition relative ${
            activeTab === 'jobs' ? 'text-indigo-600' : 'text-slate-500'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Jobs</span>
          {stats.total > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-indigo-600"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('board')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition ${
            activeTab === 'board' ? 'text-indigo-600' : 'text-slate-500'
          }`}
        >
          <Kanban className="w-5 h-5" />
          <span>Board</span>
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition relative ${
            activeTab === 'interviews' ? 'text-indigo-600' : 'text-slate-500'
          }`}
        >
          <CalendarClock className="w-5 h-5" />
          <span>Interviews</span>
          {upcomingInterviews.length > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-semibold transition ${
            activeTab === 'analytics' ? 'text-indigo-600' : 'text-slate-500'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Analytics</span>
        </button>
      </nav>

      {/* Global Modals */}
      <JobModal />
      <InterviewModal />
      <FirebaseModal />
      <AuthModal />
    </div>
  );
}

function AppContent() {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-sm font-medium text-slate-500">Starting CareerTrack...</p>
      </div>
    );
  }

  // If user is not logged in, show the Landing / Home Page!
  if (!currentUser) {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  // If user is logged in, show the Dashboard Layout!
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
