import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CalendarClock, 
  Calendar, 
  Clock, 
  Video, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  ExternalLink, 
  Building2, 
  User, 
  BookOpen, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function InterviewsView() {
  const { 
    jobs, 
    setIsInterviewModalOpen, 
    setInterviewTargetJobId, 
    handleDeleteInterview,
    handleCleanDuplicates,
    duplicatesCount,
    setActiveTab 
  } = useApp();

  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const now = new Date();

  // Directly extract all interview items from the jobs list
  const interviewsList = React.useMemo(() => {
    const list = [];
    (jobs || []).forEach(job => {
      if (job.interviews && Array.isArray(job.interviews)) {
        job.interviews.forEach(int => {
          list.push({
            ...int,
            jobId: job.id,
            company: job.company,
            role: job.role,
            logo: job.logo,
            jobStatus: job.status
          });
        });
      }
    });
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [jobs]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Interview Schedule & Preparation
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Track interview dates, meeting links, rounds, and preparation checklists
          </p>
        </div>

        <button
          onClick={() => {
            setInterviewTargetJobId(null);
            setIsInterviewModalOpen(true);
          }}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs md:text-sm font-bold shadow-md shadow-indigo-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Interview</span>
        </button>
      </div>

      {/* Duplicates Notification */}
      {duplicatesCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Found <strong>{duplicatesCount}</strong> duplicate applications. Clean them up to remove duplicate Microsoft interviews?
            </span>
          </div>
          <button
            onClick={handleCleanDuplicates}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-xl font-bold transition shrink-0 self-start sm:self-auto shadow-sm"
          >
            Clean Duplicates Now
          </button>
        </div>
      )}

      {/* Unified Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500">
        <span className="font-bold text-slate-800 text-sm">
          Scheduled Interviews ({interviewsList.length})
        </span>
        <span className="text-slate-400">All Scheduled Rounds</span>
      </div>

      {/* Interview Cards List */}
      {interviewsList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <CalendarClock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No interviews scheduled</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            When you receive an interview invitation from a recruiter, log it here to prepare effectively!
          </p>
          <button
            onClick={() => {
              setInterviewTargetJobId(null);
              setIsInterviewModalOpen(true);
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule First Interview</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {interviewsList.map((int, idx) => {
            const intDate = new Date(int.date);
            const isPast = intDate < now;
            const daysDiff = Math.ceil((intDate - now) / (1000 * 60 * 60 * 24));
            
            let timeLabel = "";
            if (daysDiff === 0) timeLabel = "Today!";
            else if (daysDiff === 1) timeLabel = "Tomorrow";
            else if (daysDiff > 1) timeLabel = `In ${daysDiff} days`;
            else timeLabel = "Past Round";

            return (
              <div
                key={`${int.jobId || ''}-${int.id || ''}-${idx}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Delete */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                        isPast ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {timeLabel}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {intDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {intDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteInterview(int.jobId, int.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition"
                      title="Delete scheduled interview"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Company & Role */}
                  <div className="flex items-start gap-3 mt-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-indigo-700 text-sm overflow-hidden shrink-0">
                      {int.logo ? (
                        <img src={int.logo} alt={int.company} className="w-full h-full object-cover" />
                      ) : (
                        int.company.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{int.round}</h3>
                      <p className="text-xs text-slate-600 font-semibold">{int.company} · {int.role}</p>
                      {int.interviewer && (
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{int.interviewer}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Prep Checklist */}
                  <div className="mt-4 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Interview Readiness Checklist</span>
                    </p>
                    <div className="space-y-1.5 text-xs">
                      {[
                        `Review resume & key projects at ${int.company}`,
                        "Research company products and recent news",
                        "Prepare 3 insightful questions for the interviewer"
                      ].map((item, idx) => {
                        const checkKey = `${int.id}_${idx}`;
                        const isDone = !!checkedItems[checkKey];
                        return (
                          <div 
                            key={idx} 
                            onClick={() => toggleCheck(checkKey)}
                            className="flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-slate-900"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                            )}
                            <span className={isDone ? 'line-through text-slate-400' : ''}>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Prep Notes */}
                  {int.prepNotes && (
                    <div className="mt-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/50 text-xs text-amber-900">
                      <strong className="block text-[11px] uppercase tracking-wider text-amber-800 mb-0.5">Interview Focus Notes:</strong>
                      {int.prepNotes}
                    </div>
                  )}
                </div>

                {/* Footer Join Button */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Status: {int.status || 'Scheduled'}</span>
                  
                  {int.meetLink ? (
                    <a
                      href={int.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Launch Video Call</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No meeting link added</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
