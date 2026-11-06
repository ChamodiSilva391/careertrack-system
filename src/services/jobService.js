import { db, isConfigured } from "../firebase/config";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { INITIAL_JOBS } from "../data/mockData";

// Helper for local storage key per user
const getStorageKey = (userId) => `careertrack_jobs_${userId || 'guest'}`;

// Get local stored jobs for a specific user
export const getLocalJobs = (userId) => {
  if (!userId) return [];
  const localData = localStorage.getItem(getStorageKey(userId));
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.error("Failed to parse local jobs", e);
    }
  }
  return [];
};

// Save local jobs for a specific user
export const saveLocalJobs = (userId, jobs) => {
  if (!userId) return;
  localStorage.setItem(getStorageKey(userId), JSON.stringify(jobs));
};

// Fetch All Jobs for a specific user
export const fetchJobs = async (userId) => {
  if (!userId) return [];

  if (isConfigured && db) {
    try {
      const userJobsCol = collection(db, "users", userId, "jobs");
      const snapshot = await getDocs(userJobsCol);
      if (!snapshot.empty) {
        const jobsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        saveLocalJobs(userId, jobsList);
        return jobsList;
      } else {
        // New user has 0 jobs initially
        return getLocalJobs(userId);
      }
    } catch (err) {
      console.warn("Firestore fetch failed, falling back to user local cache:", err);
      return getLocalJobs(userId);
    }
  }

  return getLocalJobs(userId);
};

// Create New Job for a specific user
export const createJob = async (userId, jobData) => {
  const newId = "job-" + Date.now();
  const newJob = {
    ...jobData,
    id: newId,
    userId: userId,
    appliedDate: jobData.appliedDate || new Date().toISOString().split("T")[0],
    interviews: jobData.interviews || [],
    tags: Array.isArray(jobData.tags) ? jobData.tags : (jobData.tags || "").split(",").map(t => t.trim()).filter(Boolean),
    createdAt: new Date().toISOString()
  };

  if (isConfigured && db && userId) {
    try {
      await setDoc(doc(db, "users", userId, "jobs", newId), newJob);
    } catch (err) {
      console.error("Firestore create job failed:", err);
    }
  }

  // Update user's local cache
  const current = getLocalJobs(userId);
  const updated = [newJob, ...current];
  saveLocalJobs(userId, updated);
  return newJob;
};

// Update Job for a specific user
export const updateJob = async (userId, jobId, updatedFields) => {
  if (isConfigured && db && userId) {
    try {
      const jobRef = doc(db, "users", userId, "jobs", jobId);
      await setDoc(jobRef, updatedFields, { merge: true });
    } catch (err) {
      console.error("Firestore update job failed:", err);
    }
  }

  const current = getLocalJobs(userId);
  const updated = current.map(j => j.id === jobId ? { ...j, ...updatedFields } : j);
  saveLocalJobs(userId, updated);
  return updated.find(j => j.id === jobId);
};

// Delete Job for a specific user
export const deleteJob = async (userId, jobId) => {
  if (isConfigured && db && userId) {
    try {
      await deleteDoc(doc(db, "users", userId, "jobs", jobId));
    } catch (err) {
      console.error("Firestore delete job failed:", err);
    }
  }

  const current = getLocalJobs(userId);
  const updated = current.filter(j => j.id !== jobId);
  saveLocalJobs(userId, updated);
  return jobId;
};

// Add Interview to a Job
export const addInterviewToJob = async (userId, jobId, interviewData) => {
  const current = getLocalJobs(userId);
  const job = current.find(j => j.id === jobId);
  if (!job) return null;

  const newInterview = {
    id: "int-" + Date.now(),
    date: interviewData.date,
    round: interviewData.round || "Interview Round",
    interviewer: interviewData.interviewer || "",
    meetLink: interviewData.meetLink || "",
    status: interviewData.status || "Upcoming",
    prepNotes: interviewData.prepNotes || ""
  };

  const updatedInterviews = [...(job.interviews || []), newInterview];
  // Auto switch status to Interviewing if currently Applied or Wishlist
  const updatedStatus = (job.status === "Applied" || job.status === "Wishlist") ? "Interviewing" : job.status;

  return await updateJob(userId, jobId, {
    interviews: updatedInterviews,
    status: updatedStatus
  });
};

// Delete Interview from a Job
export const removeInterviewFromJob = async (userId, jobId, interviewId) => {
  const current = getLocalJobs(userId);
  const job = current.find(j => j.id === jobId);
  if (!job) return null;

  const updatedInterviews = (job.interviews || []).filter(i => i.id !== interviewId);
  return await updateJob(userId, jobId, { interviews: updatedInterviews });
};

// Load Sample Template Jobs (Optional for a user who wants sample jobs)
export const loadSampleJobs = async (userId) => {
  if (!userId) return [];
  const seeded = INITIAL_JOBS.map((j, i) => ({
    ...j,
    id: `job-${Date.now()}-${i}`,
    userId
  }));

  saveLocalJobs(userId, seeded);

  if (isConfigured && db) {
    try {
      for (const job of seeded) {
        await setDoc(doc(db, "users", userId, "jobs", job.id), job);
      }
    } catch (e) {
      console.error("Firestore seed error", e);
    }
  }
  return seeded;
};
