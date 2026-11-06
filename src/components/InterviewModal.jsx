import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Video, User, BookOpen, Building2, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

const QUICK_ROUNDS = [
  'HR Screening',
  'Technical Interview',
  'Coding Assessment',
  'System Design',
  'Final / Managerial'
];

export default function InterviewModal() {
  const { 
    isInterviewModalOpen, 
    setIsInterviewModalOpen, 
    interviewTargetJobId, 
    jobs, 
    handleAddInterview 
  } = useApp();

  const [selectedJobId, setSelectedJobId] = useState(interviewTargetJobId || (jobs[0] ? jobs[0].id : ''));
  const [showOptional, setShowOptional] = useState(false);

  const [formData, setFormData] = useState({
    round: 'Technical Interview',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    interviewer: '',
    meetLink: '',
    prepNotes: ''
  });

  useEffect(() => {
    if (interviewTargetJobId) {
      setSelectedJobId(interviewTargetJobId);
    } else if (jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(jobs[0].id);
    }
  }, [interviewTargetJobId, jobs]);

  if (!isInterviewModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedJobId) {
      alert("Please select a job application to schedule this interview for!");
      return;
    }
    handleAddInterview(selectedJobId, formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Schedule Interview</h2>
            <p className="text-xs text-slate-500">Set interview date, round, and meeting reminder</p>
          </div>
          <button
            onClick={() => setIsInterviewModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Job Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Job Application <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                required
                value={selectedJobId}
                onChange={e => setSelectedJobId(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-semibold text-slate-800"
              >
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.company} — {job.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Round Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Interview Round <span className="text-rose-500">*</span>
            </label>
            
            {/* Quick 1-click round chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {QUICK_ROUNDS.map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFormData({ ...formData, round: preset })}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                    formData.round === preset
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <input
              type="text"
              required
              placeholder="Or type custom round name..."
              value={formData.round}
              onChange={e => setFormData({ ...formData, round: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-medium"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Interview Date & Time <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                required
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Collapsible Toggle for Optional Details */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition group text-left"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-700">
                  {showOptional ? 'Hide Optional Details' : 'Add Meeting Link & Prep Notes'}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  Optional
                </span>
              </div>
              {showOptional ? (
                <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              )}
            </button>
          </div>

          {/* Optional Content */}
          {showOptional && (
            <div className="space-y-3 pt-2 border-t border-slate-100 animate-fade-in">
              {/* Meeting Link */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Meeting Link (Google Meet / Zoom / Teams)
                </label>
                <div className="relative">
                  <Video className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={formData.meetLink}
                    onChange={e => setFormData({ ...formData, meetLink: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Interviewer */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Interviewer Name / Role
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Alex Chen (Staff Engineer)"
                    value={formData.interviewer}
                    onChange={e => setFormData({ ...formData, interviewer: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Prep Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Prep Notes & Key Topics
                </label>
                <textarea
                  rows="2"
                  placeholder="Topics to study, questions to ask..."
                  value={formData.prepNotes}
                  onChange={e => setFormData({ ...formData, prepNotes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInterviewModalOpen(false)}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-200 transition"
            >
              Confirm Schedule
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
