import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Primary default configuration for my-job-tracker-27d5b
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyClxNvjB_dh8t5ZZR0Hs9dTfNeOvEID0X4",
  authDomain: "my-job-tracker-27d5b.firebaseapp.com",
  projectId: "my-job-tracker-27d5b",
  storageBucket: "my-job-tracker-27d5b.firebasestorage.app",
  messagingSenderId: "183055793391",
  appId: "1:183055793391:web:10f7565b734c34129e2f1a"
};

// Check if custom credentials exist in localStorage or Vite env
const getFirebaseCredentials = () => {
  const storedConfig = localStorage.getItem("careertrack_firebase_config");
  if (storedConfig) {
    try {
      return JSON.parse(storedConfig);
    } catch (e) {
      console.warn("Invalid stored Firebase config", e);
    }
  }

  // Fallback to Vite env variables
  const envConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId
  };

  return envConfig;
};

let app = null;
let db = null;
let auth = null;
let isConfigured = false;

const config = getFirebaseCredentials();

if (config && config.apiKey && config.projectId) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    isConfigured = true;
    console.log("Firebase connected successfully to project:", config.projectId);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    isConfigured = false;
  }
}

export { app, db, auth, isConfigured, getFirebaseCredentials };
