import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  Clock, 
  CalendarCheck, 
  Award, 
  XCircle, 
  ArrowUpRight, 
  Plus, 
  Video, 
  Calendar, 
  Building2, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { APPLICATION_STATUSES } from '../data/mockData';

export default function DashboardView() {
  const { 
    jobs, 
    stats, 
    upcomingInterviews, 
    setActiveTab, 
    setIsJobModalOpen, 
    setEditingJob,
    setIsInterviewModalOpen,
    setInterviewTargetJobId,
    handleStatusChange
  } = useApp();

  const totalInterviewsCount = React.useMemo(() => {
    let count = 0;
    (jobs || []).forEach(j => {
      if (j.interviews && Array.isArray(j.interviews)) {
        count += j.interviews.length;
      }
    });
    return count;
  }, [jobs]);

  const nextInterview = upcomingInterviews[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Smart Job Application Tracker
          </h1>
          <p className="mt-2 text-indigo-100 text-sm md:text-base leading-relaxed">
            Manage your applications, track multi-round technical interviews, and monitor your career pipeline with live cloud synchronization.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setEditingJob(null);
                setIsJobModalOpen(true);
              }}
              className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-bold rounded-xl text-xs md:text-sm shadow-md transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Track New Application</span>
            </button>

            <button
              onClick={() => setActiveTab('board')}
              className="px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/40 text-white font-medium rounded-xl text-xs md:text-sm border border-white/10 backdrop-blur-sm transition flex items-center gap-2"
            >
              <span>Pipeline Board</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Applications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{stats.total}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
            <span>Applications logged</span>
          </div>
        </div>

        {/* Pending / Active */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-blue-600 mt-2">{stats.totalActive}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
            <span>{stats.applied} Applied · {stats.interviewing} Interviewing</span>
          </div>
        </div>

        {/* Interviews Scheduled */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Interviews</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">{totalInterviewsCount}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
            <span>{totalInterviewsCount} rounds scheduled</span>
          </div>
        </div>

        {/* Offers Accepted */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Offers</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2">{stats.offered}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 font-semibold">
            <span>Offer Rate: {stats.offerRate}%</span>
          </div>
        </div>

        {/* Rejections */}
        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Rejected</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">{stats.rejected}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
            <span>Review feedback</span>
          </div>
        </div>

      </div>

      {/* Next Upcoming Interview Alert Card */}
      {nextInterview && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-5 rounded-2xl bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Next Upcoming Interview
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(nextInterview.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {nextInterview.company} – {nextInterview.round}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Role: <span className="font-semibold text-slate-700">{nextInterview.role}</span> {nextInterview.interviewer && `· Interviewer: ${nextInterview.interviewer}`}
              </p>
              {nextInterview.prepNotes && (
                <p className="text-xs text-amber-800 bg-amber-50/80 rounded-lg p-2 mt-2 border border-amber-200/50">
                  <strong>Prep Tip:</strong> {nextInterview.prepNotes}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {nextInterview.meetLink && (
              <a
                href={nextInterview.meetLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Video className="w-4 h-4" />
                <span>Join Meeting</span>
              </a>
            )}
            <button
              onClick={() => setActiveTab('interviews')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <span>All Interviews</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Split Grid: Recent Applications & Pipeline Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Applications (2 spans) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Applications</h2>
              <p className="text-xs text-slate-500">Track and update application status in real-time</p>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View all ({jobs.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2.5" />
              <p className="text-sm font-bold text-slate-700">No applications added yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Start tracking your personal job search by adding your first application.
              </p>
              <button
                onClick={() => {
                  setEditingJob(null);
                  setIsJobModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Application</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {jobs.slice(0, 5).map((job) => {
                const statusCfg = APPLICATION_STATUSES.find(s => s.id === job.status) || APPLICATION_STATUSES[0];
                return (
                  <div key={job.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 rounded-xl px-2 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-indigo-700 text-sm overflow-hidden shrink-0">
                        {job.logo ? (
                          <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                        ) : (
                          job.company.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{job.role}</span>
                          <span className="text-xs text-slate-500">at {job.company}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {job.location}
                            </span>
                          )}
                          {job.salary && (
                            <span className="flex items-center gap-1 font-medium text-slate-700">
                              <DollarSign className="w-3 h-3 text-slate-400" />
                              {job.salary}
                            </span>
                          )}
                          <span className="text-slate-400">
                            Applied: {job.appliedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {/* Status Dropdown */}
                      <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(job.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer transition ${statusCfg.color}`}
                      >
                        {APPLICATION_STATUSES.map(s => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => {
                          setInterviewTargetJobId(job.id);
                          setIsInterviewModalOpen(true);
                        }}
                        title="Schedule Interview"
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      >
                        <CalendarCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Funnel & Architecture */}
        <div className="space-y-6">
          
          {/* Quick Funnel Progress */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Application Pipeline Conversion</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Applications Sent</span>
                  <span className="font-bold text-slate-900">{stats.total - stats.wishlist} / {stats.total}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, ((stats.total - stats.wishlist) / Math.max(stats.total, 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Interview Conversion Rate</span>
                  <span className="font-bold text-amber-600">{stats.interviewRate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, stats.interviewRate)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Offer Conversion Rate</span>
                  <span className="font-bold text-emerald-600">{stats.offerRate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, stats.offerRate)}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('analytics')}
              className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition"
            >
              View Detailed Analytics Charts →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
