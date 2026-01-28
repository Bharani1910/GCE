import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NotificationList from './components/NotificationList';
import NotificationComposer from './components/NotificationComposer';
import Analytics from './components/Analytics';
import Profile from './components/Profile';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
    <div className="space-y-6">
      <div className="text-9xl font-black text-slate-200">404</div>
      <h1 className="text-3xl font-bold text-slate-800">Framework Error</h1>
      <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
        The page you are looking for is either restricted or does not exist within the GCE Erode Digital Framework.
      </p>
      <button 
        onClick={() => window.location.hash = '/'}
        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
      >
        Return to Dashboard
      </button>
    </div>
  </div>
);

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">GCE Erode Framework</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUpPage />} />
      
      <Route element={<Layout />}>
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/notifications" element={user ? <NotificationList /> : <Navigate to="/login" replace />} />
        <Route path="/create-notification" element={user ? <NotificationComposer /> : <Navigate to="/login" replace />} />
        <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;