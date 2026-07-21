import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Pages
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import ResumeUploadPage from './features/resume/pages/ResumeUploadPage';
import ResumeAnalysisPage from './features/resume/pages/ResumeAnalysisPage';

// Career Pages
import CompanyMatch from './features/career/pages/CompanyMatch';
import SkillGap from './features/career/pages/SkillGap';
import LearningRoadmap from './features/career/pages/LearningRoadmap';
import RecommendedProjects from './features/career/pages/RecommendedProjects';
import InterviewPreparation from './features/career/pages/InterviewPreparation';
import LiveJobs from './features/career/pages/LiveJobs';
import AIRecruiter from './features/career/pages/AIRecruiter';

import ApplicationTracker from './features/applications/pages/ApplicationTracker';

import SettingsPage from './features/settings/pages/SettingsPage';

import LandingPage from './features/marketing/pages/LandingPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Placeholder for other pages
const Placeholder = ({ title }) => (
  <div className="flex flex-col h-full items-center justify-center p-8 text-center bg-white dark:bg-zinc-900 border border-border rounded-xl">
    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
      {title.charAt(0)}
    </div>
    <h1 className="text-2xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground max-w-md">This feature module will be implemented in upcoming sprints. Stay tuned!</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      
      {/* Protected App Routes */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Resume Feature */}
        <Route path="/resume" element={<ResumeUploadPage />} />
        <Route path="/resume/analyze" element={<ResumeAnalysisPage />} />
        
        {/* Career Feature */}
        <Route path="/career" element={<CompanyMatch />} />
        <Route path="/career/skills" element={<SkillGap />} />
        <Route path="/career/roadmap" element={<LearningRoadmap />} />
        <Route path="/career/projects" element={<RecommendedProjects />} />
        <Route path="/career/interviews" element={<InterviewPreparation />} />
        <Route path="/career/recruiter" element={<AIRecruiter />} />
        <Route path="/jobs" element={<LiveJobs />} />
        
        {/* Applications Feature */}
        <Route path="/applications" element={<ApplicationTracker />} />
        
        {/* Settings Feature */}
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
