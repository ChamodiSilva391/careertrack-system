import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Flame, CheckCircle, Database, RefreshCw, Key, ShieldCheck, AlertCircle } from 'lucide-react';
import { getFirebaseCredentials } from '../firebase/config';

export default function FirebaseModal() {
  const { isFirebaseModalOpen, setIsFirebaseModalOpen, firebaseActive, setFirebaseActive, refreshJobs } = useApp();

  const existingConfig = getFirebaseCredentials() || {};

  const [config, setConfig] = useState({
    apiKey: existingConfig.apiKey || '',
    authDomain: existingConfig.authDomain || '',
    projectId: existingConfig.projectId || '',
    storageBucket: existingConfig.storageBucket || '',
    messagingSenderId: existingConfig.messagingSenderId || '',
    appId: existingConfig.appId || ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  if (!isFirebaseModalOpen) return null;

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (!config.apiKey || !config.projectId) {
      alert("Please provide at least apiKey and projectId.");
      return;
    }

    try {
      localStorage.setItem("careertrack_firebase_config", JSON.stringify(config));
      setStatusMessage("Firebase configuration saved! Reloading application to connect to Firestore...");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      alert("Failed to save config: " + err.message);
    }
  };

  const handleClearConfig = () => {
    if (confirm("Disconnect Firebase and switch back to Local Offline Demo mode?")) {
      localStorage.removeItem("careertrack_firebase_config");
      setStatusMessage("Disconnected. Switching to Local Demo mode...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${firebaseActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Firebase Cloud Configuration</h2>
              <p className="text-xs text-slate-500">Connect Google Firebase Firestore database or use local cache</p>
            </div>
          </div>
          <button
            onClick={() => setIsFirebaseModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Current Status Box */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            firebaseActive 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {firebaseActive ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <p className="font-bold">
                {firebaseActive ? 'Firebase Firestore Cloud Database Connected' : 'Running in Offline / Local Demo Mode'}
              </p>
              <p className="mt-0.5 opacity-90">
                {firebaseActive
                  ? 'All job additions, status updates, and interviews sync directly with your live Google Cloud Firestore.'
                  : 'The application is running safely with local storage & pre-seeded Career Fair demo data. You can paste your Firebase credentials below to enable live cloud sync.'}
              </p>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-semibold text-indigo-700 animate-fade-in">
              {statusMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSaveConfig} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Firebase API Key *
              </label>
              <input
                type="text"
                required
                placeholder="AIzaSy..."
                value={config.apiKey}
                onChange={e => setConfig({ ...config, apiKey: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Project ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="careertrack-demo-123"
                  value={config.projectId}
                  onChange={e => setConfig({ ...config, projectId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Auth Domain
                </label>
                <input
                  type="text"
                  placeholder="careertrack.firebaseapp.com"
                  value={config.authDomain}
                  onChange={e => setConfig({ ...config, authDomain: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Storage Bucket
                </label>
                <input
                  type="text"
                  placeholder="careertrack.appspot.com"
                  value={config.storageBucket}
                  onChange={e => setConfig({ ...config, storageBucket: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  App ID
                </label>
                <input
                  type="text"
                  placeholder="1:1234567890:web:abcdef..."
                  value={config.appId}
                  onChange={e => setConfig({ ...config, appId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition font-mono"
                />
              </div>
            </div>

            {/* Quick Helper Notes */}
            <div className="pt-2 text-[11px] text-slate-500">
              💡 <strong>How to get this:</strong> Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Firebase Console</a> &gt; Project Settings &gt; General &gt; Your apps &gt; SDK setup and configuration.
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {firebaseActive ? (
                <button
                  type="button"
                  onClick={handleClearConfig}
                  className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  Disconnect Firebase
                </button>
              ) : (
                <span className="text-xs text-slate-400">Offline Fallback Active</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFirebaseModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition"
                >
                  Save & Connect Firebase
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
