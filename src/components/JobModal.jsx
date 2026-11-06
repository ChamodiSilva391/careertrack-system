import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Building2, Briefcase, MapPin, DollarSign, Link, User, Mail, Tag, ChevronDown, ChevronUp, Calendar, Sparkles } from 'lucide-react';
import { APPLICATION_STATUSES, JOB_TYPES } from '../data/mockData';

export default function JobModal() {
  const { isJobModalOpen, setIsJobModalOpen, editingJob, handleAddJob, handleUpdateJob } = useApp();

  const [showAdvanced, setShowAdvanced] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    type: 'Full-Time',
    location: '',
    salary: '',
    link: '',
    contactPerson: '',
    contactEmail: '',
    notes: '',
    tags: '',
    appliedDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editingJob) {
      const hasAdvancedData = Boolean(
        editingJob.location ||
        editingJob.salary ||
        editingJob.link ||
        editingJob.contactPerson ||
        editingJob.contactEmail ||
        editingJob.notes ||
        (Array.isArray(editingJob.tags) && editingJob.tags.length > 0) ||
        editingJob.tags
      );

      setShowAdvanced(hasAdvancedData);

      setFormData({
        company: editingJob.company || '',
        role: editingJob.role || '',
        status: editingJob.status || 'Applied',
        type: editingJob.type || 'Full-Time',
        location: editingJob.location || '',
        salary: editingJob.salary || '',
        link: editingJob.link || '',
        contactPerson: editingJob.contactPerson || '',
        contactEmail: editingJob.contactEmail || '',
        notes: editingJob.notes || '',
        tags: Array.isArray(editingJob.tags) ? editingJob.tags.join(', ') : (editingJob.tags || ''),
        appliedDate: editingJob.appliedDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setShowAdvanced(false);
      setFormData({
        company: '',
        role: '',
        status: 'Applied',
        type: 'Full-Time',
        location: '',
        salary: '',
        link: '',
        contactPerson: '',
        contactEmail: '',
        notes: '',
        tags: '',
        appliedDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [editingJob, isJobModalOpen]);

  if (!isJobModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) {
      alert("Please enter Company Name and Role!");
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };

    if (editingJob && editingJob.id) {
      handleUpdateJob(editingJob.id, payload);
    } else {
      handleAddJob(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {editingJob && editingJob.id ? 'Edit Application' : 'Add New Job Application'}
            </h2>
            <p className="text-xs text-slate-500">
              Only <span className="font-semibold text-indigo-600">Company</span> and <span className="font-semibold text-indigo-600">Role</span> are required
            </p>
          </div>
          <button
            onClick={() => setIsJobModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Essential Required Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Company (Required) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Google, WSO2, Dialog"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition font-medium"
                />
              </div>
            </div>

            {/* Role (Required) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Job Title / Role <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition font-medium"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-semibold text-slate-800"
              >
                {APPLICATION_STATUSES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Job Type
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-medium text-slate-800"
              >
                {JOB_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Applied Date */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Applied Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={formData.appliedDate}
                  onChange={e => setFormData({ ...formData, appliedDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition text-slate-700"
                />
              </div>
            </div>

          </div>

          {/* Collapsible Toggle for Optional Details */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition group text-left"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-700">
                  {showAdvanced ? 'Hide Optional Details' : 'Add More Details (Salary, Location, Link, Recruiter...)'}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  Optional
                </span>
              </div>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
              )}
            </button>
          </div>

          {/* Optional Details Accordion Content */}
          {showAdvanced && (
            <div className="space-y-4 pt-2 border-t border-slate-100 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Colombo, Remote, Hybrid"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Salary / Compensation
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. LKR 250,000 / mo or $80k"
                      value={formData.salary}
                      onChange={e => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Job Link */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Job Posting URL
                  </label>
                  <div className="relative">
                    <Link className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/jobs/..."
                      value={formData.link}
                      onChange={e => setFormData({ ...formData, link: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Recruiter / Contact Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. John Doe (HR / Recruiter)"
                      value={formData.contactPerson}
                      onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Recruiter Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="recruiter@company.com"
                      value={formData.contactEmail}
                      onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Skills / Tags */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Skills / Tech Stack (comma separated)
                  </label>
                  <div className="relative">
                    <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, Spring Boot"
                      value={formData.tags}
                      onChange={e => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Application Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Notes & Preparation Details
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Referral details, technical test topics, specific questions asked..."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition"
                  />
                </div>

              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsJobModalOpen(false)}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-200 transition"
            >
              {editingJob && editingJob.id ? 'Save Changes' : 'Save Application'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
