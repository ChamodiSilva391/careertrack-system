import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { 
  fetchJobs, 
  createJob, 
  updateJob, 
  deleteJob, 
  addInterviewToJob, 
  removeInterviewFromJob,
  loadSampleJobs
} from "../services/jobService";
import { isConfigured } from "../firebase/config";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, jobs, board, interviews, analytics

  // Modals state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [interviewTargetJobId, setInterviewTargetJobId] = useState(null);

  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [firebaseActive, setFirebaseActive] = useState(isConfigured);

  // Load jobs for current user
  const loadUserJobs = async () => {
    if (!userId) {
      setJobs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchJobs(userId);
      setJobs(data);
    } catch (err) {
      console.error("Error loading jobs for user:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserJobs();
  }, [userId]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.tags && job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus = statusFilter === "All" || job.status === statusFilter;
      const matchesType = typeFilter === "All" || job.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [jobs, searchQuery, statusFilter, typeFilter]);

  // Derived Stats
  const stats = useMemo(() => {
    const total = jobs.length;
    const wishlist = jobs.filter(j => j.status === "Wishlist").length;
    const applied = jobs.filter(j => j.status === "Applied").length;
    const interviewing = jobs.filter(j => j.status === "Interviewing").length;
    const offered = jobs.filter(j => j.status === "Offered").length;
    const rejected = jobs.filter(j => j.status === "Rejected").length;

    const totalActive = applied + interviewing;
    const interviewRate = (total - wishlist) > 0 ? Math.round(((interviewing + offered) / (total - wishlist)) * 100) : 0;
    const offerRate = (total - wishlist) > 0 ? Math.round((offered / (total - wishlist)) * 100) : 0;

    return {
      total,
      wishlist,
      applied,
      interviewing,
      offered,
      rejected,
      totalActive,
      interviewRate,
      offerRate
    };
  }, [jobs]);

  // All Interviews across user's jobs
  const allInterviews = useMemo(() => {
    const list = [];
    jobs.forEach(job => {
      if (job.interviews && job.interviews.length > 0) {
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

    // Sort by date upcoming
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [jobs]);

  // Upcoming Interviews (excluding completed ones or far past)
  const upcomingInterviews = useMemo(() => {
    const now = new Date();
    return allInterviews.filter(int => {
      if (int.status === 'Completed') return false;
      return new Date(int.date) >= new Date(now.getTime() - 24 * 60 * 60 * 1000);
    });
  }, [allInterviews]);

  // Actions
  const handleAddJob = async (jobData) => {
    if (!userId) return;
    const created = await createJob(userId, jobData);
    setJobs(prev => [created, ...prev]);
    setIsJobModalOpen(false);
  };

  const handleUpdateJob = async (jobId, updatedFields) => {
    if (!userId) return;
    const updated = await updateJob(userId, jobId, updatedFields);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updatedFields } : j));
    setIsJobModalOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = async (jobId) => {
    if (!userId) return;
    if (confirm("Are you sure you want to delete this job application?")) {
      await deleteJob(userId, jobId);
      setJobs(prev => prev.filter(j => j.id !== jobId));
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    if (!userId) return;
    await updateJob(userId, jobId, { status: newStatus });
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
  };

  const handleAddInterview = async (jobId, interviewData) => {
    if (!userId) return;
    const newInterview = {
      id: "int-" + Date.now(),
      date: interviewData.date,
      round: interviewData.round || "Interview Round",
      interviewer: interviewData.interviewer || "",
      meetLink: interviewData.meetLink || "",
      status: interviewData.status || "Upcoming",
      prepNotes: interviewData.prepNotes || ""
    };

    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const updatedInterviews = [...(job.interviews || []), newInterview];
        const updatedStatus = (job.status === "Applied" || job.status === "Wishlist") ? "Interviewing" : job.status;
        return { ...job, interviews: updatedInterviews, status: updatedStatus };
      }
      return job;
    }));

    setIsInterviewModalOpen(false);
    setInterviewTargetJobId(null);

    await addInterviewToJob(userId, jobId, interviewData);
  };

  const handleDeleteInterview = async (jobId, interviewId) => {
    if (!userId) return;

    // Smoothly remove interview from state without crashing or refreshing
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const filtered = (job.interviews || []).filter(i => i.id !== interviewId);
        return { ...job, interviews: filtered };
      }
      return job;
    }));

    try {
      await removeInterviewFromJob(userId, jobId, interviewId);
    } catch (err) {
      console.error("Failed to delete interview:", err);
    }
  };

  // Optional: load template jobs for this specific user
  const handleLoadSampleJobs = async () => {
    if (!userId) return;
    const samples = await loadSampleJobs(userId);
    setJobs(samples);
  };

  // Clean duplicate job applications
  const handleCleanDuplicates = async () => {
    if (!userId) return;
    const seen = new Set();
    const uniqueJobs = [];
    const duplicatesToRemove = [];

    for (const job of jobs) {
      const key = `${(job.company || "").toLowerCase().trim()}_${(job.role || "").toLowerCase().trim()}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueJobs.push(job);
      } else {
        duplicatesToRemove.push(job.id);
      }
    }

    if (duplicatesToRemove.length === 0) {
      alert("No duplicate applications found! Your list is already clean.");
      return;
    }

    setJobs(uniqueJobs);
    
    // Clean from Firestore & LocalStorage in background
    for (const id of duplicatesToRemove) {
      deleteJob(userId, id).catch(() => {});
    }
  };

  const duplicatesCount = useMemo(() => {
    const seen = new Set();
    let count = 0;
    for (const job of jobs) {
      const key = `${(job.company || "").toLowerCase().trim()}_${(job.role || "").toLowerCase().trim()}`;
      if (seen.has(key)) {
        count++;
      } else {
        seen.add(key);
      }
    }
    return count;
  }, [jobs]);

  // Export to JSON
  const exportToJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jobs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `careertrack_export_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Company", "Role", "Status", "Type", "Location", "Salary", "Applied Date", "Notes"];
    const rows = jobs.map(j => [
      `"${j.company || ""}"`,
      `"${j.role || ""}"`,
      `"${j.status || ""}"`,
      `"${j.type || ""}"`,
      `"${j.location || ""}"`,
      `"${j.salary || ""}"`,
      `"${j.appliedDate || ""}"`,
      `"${(j.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `careertrack_jobs_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <AppContext.Provider value={{
      jobs,
      filteredJobs,
      loading,
      stats,
      upcomingInterviews,
      allInterviews,
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      typeFilter,
      setTypeFilter,
      activeTab,
      setActiveTab,
      isJobModalOpen,
      setIsJobModalOpen,
      editingJob,
      setEditingJob,
      isInterviewModalOpen,
      setIsInterviewModalOpen,
      interviewTargetJobId,
      setInterviewTargetJobId,
      isFirebaseModalOpen,
      setIsFirebaseModalOpen,
      firebaseActive,
      setFirebaseActive,
      handleAddJob,
      handleUpdateJob,
      handleDeleteJob,
      handleStatusChange,
      handleAddInterview,
      handleDeleteInterview,
      handleLoadSampleJobs,
      handleCleanDuplicates,
      duplicatesCount,
      exportToJSON,
      exportToCSV,
      refreshJobs: loadUserJobs
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
