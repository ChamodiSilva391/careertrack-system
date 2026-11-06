import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  CalendarPlus, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Layers, 
  LayoutList, 
  LayoutGrid,
  Tag,
  Building2,
  Mail,
  User,
  Sparkles
} from 'lucide-react';
import { APPLICATION_STATUSES, JOB_TYPES } from '../data/mockData';

export default function JobsView() {
  const { 
    filteredJobs, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    typeFilter, 
    setTypeFilter,
    setIsJobModalOpen, 
    setEditingJob,
    setIsInterviewModalOpen,
    setInterviewTargetJobId,
    handleDeleteJob,
    handleStatusChange,
    handleCleanDuplicates,
    duplicatesCount
  } = useApp();

  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const handleEdit = (job) => {
    setEditingJob(job);
    setIsJobModalOpen(true);
  };

  const handleAddInterview = (jobId) => {
    setInterviewTargetJobId(jobId);
    setIsInterviewModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Job Applications
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Search, filter, edit, and organize all your job opportunities
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
          <span>Add Application</span>
        </button>
      </div>

      {/* Duplicate applications alert */}
      {duplicatesCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Found <strong>{duplicatesCount}</strong> duplicate applications from multiple clicks. Clean up to keep 1 copy of each?
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by company, role, tag, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-700 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {APPLICATION_STATUSES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-700 cursor-pointer"
          >
            <option value="All">All Types</option>
            {JOB_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              title="Table View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Results Count & active filter reset */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredJobs.length}</strong> applications</span>
        {(statusFilter !== 'All' || typeFilter !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setStatusFilter('All');
              setTypeFilter('All');
              setSearchQuery('');
            }}
            className="text-indigo-600 hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Applications Content: Table or Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No applications found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Try adjusting your search criteria or add your first job application.
          </p>
          <button
            onClick={() => {
              setEditingJob(null);
              setIsJobModalOpen(true);
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job Application</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Company & Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Type & Location</th>
                  <th className="py-3 px-4">Salary</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Interviews</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredJobs.map((job) => {
                  const statusCfg = APPLICATION_STATUSES.find(s => s.id === job.status) || APPLICATION_STATUSES[0];
                  return (
                    <tr key={job.id} className="hover:bg-slate-50/60 transition group">
                      
                      {/* Company & Role */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-indigo-700 overflow-hidden shrink-0">
                            {job.logo ? (
                              <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                            ) : (
                              job.company.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition flex items-center gap-1.5">
                              <span>{job.role}</span>
                              {job.link && (
                                <a href={job.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600">
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            <div className="text-slate-500 font-medium">{job.company}</div>
                            {job.tags && job.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {job.tags.slice(0, 3).map((tag, i) => (
                                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer transition ${statusCfg.color}`}
                        >
                          {APPLICATION_STATUSES.map(s => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </select>
                      </td>

                      {/* Type & Location */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800">{job.type || 'Full-Time'}</div>
                        <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{job.location || 'Remote'}</span>
                        </div>
                      </td>

                      {/* Salary */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-700">
                        {job.salary || '—'}
                      </td>

                      {/* Applied Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                        {job.appliedDate}
                      </td>

                      {/* Interviews */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {job.interviews && job.interviews.length > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                            <span>{job.interviews.length} Round{job.interviews.length > 1 ? 's' : ''}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleAddInterview(job.id)}
                            title="Schedule Interview"
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          >
                            <CalendarPlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(job)}
                            title="Edit Job Details"
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            title="Delete Job"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      ) : (

        /* Grid Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => {
            const statusCfg = APPLICATION_STATUSES.find(s => s.id === job.status) || APPLICATION_STATUSES[0];
            return (
              <div 
                key={job.id} 
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-indigo-700 overflow-hidden shrink-0">
                        {job.logo ? (
                          <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                        ) : (
                          job.company.substring(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{job.role}</h3>
                        <p className="text-xs text-slate-500 font-medium">{job.company}</p>
                      </div>
                    </div>

                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${statusCfg.color}`}
                    >
                      {APPLICATION_STATUSES.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.location || 'Remote'} · {job.type || 'Full-Time'}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2 font-medium text-slate-800">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                    {job.contactPerson && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{job.contactPerson}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {job.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Notes Preview */}
                  {job.notes && (
                    <p className="mt-3 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 line-clamp-2">
                      {job.notes}
                    </p>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Applied: {job.appliedDate}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleAddInterview(job.id)}
                      className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      title="Schedule Interview"
                    >
                      <CalendarPlus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      title="Edit Job"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
