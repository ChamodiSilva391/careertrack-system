import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  ArrowRight, 
  Kanban, 
  CalendarClock, 
  BarChart3, 
  LogIn, 
  UserPlus
} from 'lucide-react';

export default function LandingPage() {
  const { setIsAuthModalOpen, setAuthMode } = useAuth();

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col justify-between text-white font-sans selection:bg-indigo-500 selection:text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=80')`
      }}
    >
      {/* Full Page Dark Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] z-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">CareerTrack</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleOpenLogin}
              className="px-4 py-2 text-xs font-bold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              onClick={handleOpenSignup}
              className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Center Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold mb-6 backdrop-blur-md shadow-inner">
          <span>Smart Job Application & Interview Management Platform</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-3xl">
          Track Every Application. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            Ace Every Interview.
          </span> <br />
          Land Your Dream Job.
        </h1>

        {/* Simple Description */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
          The modern platform for job seekers to manage application stages, schedule technical interviews, and monitor career progress in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <button
            onClick={handleOpenSignup}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/40 transition flex items-center justify-center gap-2 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={handleOpenLogin}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-xl text-sm font-bold backdrop-blur-md transition flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Account</span>
          </button>
        </div>

        {/* Quick Sign In Prompt */}
        <p className="mt-4 text-xs text-slate-400">
          New to CareerTrack?{' '}
          <button onClick={handleOpenSignup} className="text-indigo-400 font-bold hover:underline">
            Create an account
          </button>
        </p>

        {/* 3 Simple Frosted Glass Feature Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left">
          
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-lg flex items-center gap-3 hover:bg-white/15 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Kanban Pipeline</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">5 stages from Wishlist to Offer</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-lg flex items-center gap-3 hover:bg-white/15 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Interview Hub</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Meet links, rounds & checklists</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-lg flex items-center gap-3 hover:bg-white/15 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Live Analytics</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Conversion rate charts & insights</p>
            </div>
          </div>

        </div>

      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md py-4 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2026 CareerTrack · Smart Job Application Management System</p>
        </div>
      </footer>

    </div>
  );
}
