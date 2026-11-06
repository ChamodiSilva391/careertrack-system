import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isConfigured } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const AuthContext = createContext();

const LOCAL_USER_KEY = "careertrack_current_user";

export const AuthProvider = ({ children }) => {
  // Check if there is an existing local session
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(LOCAL_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn("Error parsing stored user", e);
      }
    }
    // Default to null so visitor sees the Home / Landing Page first
    return null;
  });

  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Listen to Firebase auth state if configured
  useEffect(() => {
    if (isConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            displayName: user.displayName || user.email.split('@')[0],
            email: user.email,
            photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
            isDemo: false
          };
          setCurrentUser(userData);
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
        } else {
          // If no firebase user, fall back to stored user or null
          const stored = localStorage.getItem(LOCAL_USER_KEY);
          if (stored) {
            try {
              setCurrentUser(JSON.parse(stored));
            } catch (e) {
              setCurrentUser(null);
            }
          } else {
            setCurrentUser(null);
          }
        }
        setAuthLoading(false);
      });
      return unsubscribe;
    } else {
      setAuthLoading(false);
    }
  }, []);

  // Login with Email & Password
  const login = async (email, password) => {
    if (isConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      const userData = {
        uid: user.uid,
        displayName: user.displayName || email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        isDemo: false
      };
      setCurrentUser(userData);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return userData;
    } else {
      // Local demo mode mock login
      const userData = {
        uid: "local-" + Date.now(),
        displayName: email.split('@')[0],
        email: email,
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        isDemo: true
      };
      setCurrentUser(userData);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return userData;
    }
  };

  // Sign up with Email & Password
  const signup = async (email, password, displayName) => {
    if (isConfigured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      const userData = {
        uid: cred.user.uid,
        displayName: displayName || email.split('@')[0],
        email: email,
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${displayName || email}`,
        isDemo: false
      };
      setCurrentUser(userData);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return userData;
    } else {
      // Local demo mode mock signup
      const userData = {
        uid: "local-" + Date.now(),
        displayName: displayName || email.split('@')[0],
        email: email,
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${displayName || email}`,
        isDemo: true
      };
      setCurrentUser(userData);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return userData;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    if (isConfigured && auth) {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const userData = {
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL,
        isDemo: false
      };
      setCurrentUser(userData);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return userData;
    } else {
      // Simulate Google login
      const userData = {
        uid: "google-demo-user",
        displayName: "Google Demo Candidate",
        email: "candidate@gmail.com",
        photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        isDemo: true
      };
      setCurrentUser(userData);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return userData;
    }
  };

  // Quick 1-Click Demo Login for Career Fair Recruiters
  const loginQuickDemo = () => {
    const demoUser = {
      uid: "demo-user-1",
      displayName: "Alex Silva (Job Seeker)",
      email: "alex.silva@careertrack.dev",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      isDemo: true
    };
    setCurrentUser(demoUser);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
    setIsAuthModalOpen(false);
  };

  // Logout
  const logout = async () => {
    if (isConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.warn("Firebase signout error", e);
      }
    }
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      authLoading,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode,
      login,
      signup,
      loginWithGoogle,
      loginQuickDemo,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
