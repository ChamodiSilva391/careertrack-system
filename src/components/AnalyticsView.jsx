import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  Percent, 
  PieChart as PieIcon, 
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function AnalyticsView() {
  const { jobs, stats } = useApp();

  // Status Distribution Data for Pie Chart
  const statusData = [
    { name: 'Wishlist', value: stats.wishlist, color: '#94a3b8' },
    { name: 'Applied', value: stats.applied, color: '#3b82f6' },
    { name: 'Interviewing', value: stats.interviewing, color: '#f59e0b' },
    { name: 'Offered', value: stats.offered, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#f43f5e' },
  ].filter(d => d.value > 0);

  // Monthly Applications Data
  const monthlyMap = {};
  jobs.forEach(job => {
    if (job.appliedDate) {
      const month = job.appliedDate.substring(0, 7); // e.g., "2026-10"
      monthlyMap[month] = (monthlyMap[month] || 0) + 1;
    }
  });

  const monthlyData = Object.keys(monthlyMap).sort().map(month => {
    const [year, m] = month.split('-');
    const dateObj = new Date(parseInt(year), parseInt(m) - 1, 1);
    const label = dateObj.toLocaleString('default', { month: 'short', year: '2-digit' });
    return {
      month: label,
      count: monthlyMap[month]
    };
  });

  // Top Tags/Skills
  const tagCounts = {};
  jobs.forEach(job => {
    if (job.tags && Array.isArray(job.tags)) {
      job.tags.forEach(tag => {
        const clean = tag.trim();
        if (clean) tagCounts[clean] = (tagCounts[clean] || 0) + 1;
      });
    }
  });

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Application Analytics & Performance
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Visual insights on conversion metrics, monthly momentum, and application outcomes
        </p>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Interview Success</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{stats.interviewRate}%</p>
          <p className="text-xs text-slate-500 mt-1">Applications reaching interview stage</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Offer Conversion</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-600 mt-2">{stats.offerRate}%</p>
          <p className="text-xs text-slate-500 mt-1">Total offers received</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-blue-600 mt-2">{stats.totalActive}</p>
          <p className="text-xs text-slate-500 mt-1">Under active recruiter consideration</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Evaluated</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-indigo-600 mt-2">{stats.total}</p>
          <p className="text-xs text-slate-500 mt-1">Total track records in system</p>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Applications by Status (Donut Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Applications by Status</h3>
            </div>
            <span className="text-xs text-slate-400">Current Distribution</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name) => [`${val} jobs`, name]}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-slate-600 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Applications (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Monthly Applications Momentum</h3>
            </div>
            <span className="text-xs text-slate-400">Applications per Month</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px' }}
                  formatter={(val) => [`${val} Applications`, 'Volume']}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Conversion Funnel & Top Tech Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Application Funnel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Recruiting Funnel Conversion</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>1. Applied Applications</span>
                <span>{stats.total - stats.wishlist} (100%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>2. Reached Interview Stage</span>
                <span>{stats.interviewing + stats.offered} ({stats.interviewRate}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div 
                  className="bg-amber-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, stats.interviewRate)}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>3. Received Formal Job Offer</span>
                <span>{stats.offered} ({stats.offerRate}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div 
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, stats.offerRate)}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Demanded Tech Skills from Applications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Target Tech Stack Breakdown</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Technologies requested by the companies you applied to</p>

            <div className="flex flex-wrap gap-2">
              {topTags.map(([tag, count], i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <span>{tag}</span>
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px]">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <strong>Recruiter Insight:</strong> React, Go, Cloud, and TypeScript dominate your active applications.
          </div>
        </div>

      </div>

    </div>
  );
}
