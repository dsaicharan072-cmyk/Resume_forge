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
        <Route path="/resume" element={<Placeholder title="Resume Management" />} />
        <Route path="/career" element={<Placeholder title="Career Intelligence" />} />
        <Route path="/jobs" element={<Placeholder title="Live Jobs Feed" />} />
        <Route path="/applications" element={<Placeholder title="Application Tracker" />} />
        <Route path="/settings" element={<Placeholder title="Account Settings" />} />
      </Route>
      
      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
