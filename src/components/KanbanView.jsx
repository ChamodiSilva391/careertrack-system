import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  CalendarClock,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { APPLICATION_STATUSES } from '../data/mockData';

const STAGE_ORDER = ["Wishlist", "Applied", "Interviewing", "Offered", "Rejected"];

export default function KanbanView() {
  const { 
    jobs, 
    handleStatusChange, 
    setIsJobModalOpen, 
    setEditingJob,
    setIsInterviewModalOpen,
    setInterviewTargetJobId 
  } = useApp();

  const handleMoveStage = (jobId, currentStatus, direction) => {
    const currentIndex = STAGE_ORDER.indexOf(currentStatus);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < STAGE_ORDER.length) {
      handleStatusChange(jobId, STAGE_ORDER[newIndex]);
    }
  };

  const handleAddNewInStage = (status) => {
    setEditingJob({ status });
    setIsJobModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Application Pipeline Board
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Visual stage-by-stage tracking of all your active opportunities
          </p>
        </div>

        <button
          onClick={() => {
            setEditingJob(null);
            setIsJobModalOpen(true);
          }}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs md:text-sm font-bold shadow-md shadow-indigo-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start pb-6 overflow-x-auto">
        {STAGE_ORDER.map((stage) => {
          const stageConfig = APPLICATION_STATUSES.find(s => s.id === stage) || APPLICATION_STATUSES[0];
          const stageJobs = jobs.filter(j => j.status === stage);
          const stageIndex = STAGE_ORDER.indexOf(stage);

          return (
            <div 
              key={stage} 
              className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/80 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    stage === 'Wishlist' ? 'bg-slate-400' :
                    stage === 'Applied' ? 'bg-blue-500' :
                    stage === 'Interviewing' ? 'bg-amber-500' :
                    stage === 'Offered' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`} />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    {stageConfig.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm">
                    {stageJobs.length}
                  </span>
                  <button
                    onClick={() => handleAddNewInStage(stage)}
                    title={`Add new job in ${stage}`}
                    className="p-1 hover:bg-white rounded-lg text-slate-500 hover:text-indigo-600 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cards List */}
              <div className="space-y-3 mt-3 flex-1">
                {stageJobs.length === 0 ? (
                  <div className="p-4 text-center border border-dashed border-slate-300 rounded-xl bg-white/40 text-slate-400 text-xs">
                    No jobs in this stage
                  </div>
                ) : (
                  stageJobs.map((job) => {
                    return (
                      <div
                        key={job.id}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-2.5 relative group"
                      >
                        {/* Company & Role */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-indigo-700 text-xs overflow-hidden shrink-0">
                              {job.logo ? (
                                <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                              ) : (
                                job.company.substring(0, 2).toUpperCase()
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">{job.role}</h4>
                              <p className="text-[11px] text-slate-500 font-medium">{job.company}</p>
                            </div>
                          </div>

                          {job.link && (
                            <a 
                              href={job.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-slate-300 hover:text-indigo-600 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Location / Salary */}
                        <div className="text-[11px] text-slate-500 space-y-0.5">
                          {job.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </div>
                          )}
                          {job.salary && (
                            <div className="flex items-center gap-1 font-semibold text-slate-700">
                              <DollarSign className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{job.salary}</span>
                            </div>
                          )}
                        </div>

                        {/* Interview Alert Pill */}
                        {job.interviews && job.interviews.length > 0 && (
                          <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold flex items-center gap-1.5">
                            <CalendarClock className="w-3 h-3 text-amber-600 shrink-0" />
                            <span className="truncate">{job.interviews[0].round}</span>
                          </div>
                        )}

                        {/* Stage Mover Buttons */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            disabled={stageIndex === 0}
                            onClick={() => handleMoveStage(job.id, stage, 'prev')}
                            title={stageIndex > 0 ? `Move back to ${STAGE_ORDER[stageIndex - 1]}` : ''}
                            className={`p-1 rounded-md transition ${stageIndex === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingJob(job);
                                setIsJobModalOpen(true);
                              }}
                              className="text-[10px] font-semibold text-slate-500 hover:text-indigo-600 hover:underline px-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setInterviewTargetJobId(job.id);
                                setIsInterviewModalOpen(true);
                              }}
                              className="text-[10px] font-semibold text-amber-600 hover:underline px-1"
                            >
                              + Interview
                            </button>
                          </div>

                          <button
                            disabled={stageIndex === STAGE_ORDER.length - 1}
                            onClick={() => handleMoveStage(job.id, stage, 'next')}
                            title={stageIndex < STAGE_ORDER.length - 1 ? `Advance to ${STAGE_ORDER[stageIndex + 1]}` : ''}
                            className={`p-1 rounded-md transition ${stageIndex === STAGE_ORDER.length - 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
