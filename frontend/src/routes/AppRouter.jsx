import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy loaded pages
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));

const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));

// Career Pages
const CompanyMatch = lazy(() => import('../features/career/pages/CompanyMatch'));
const SkillGap = lazy(() => import('../features/career/pages/SkillGap'));
const LearningRoadmap = lazy(() => import('../features/career/pages/LearningRoadmap'));
const RecommendedProjects = lazy(() => import('../features/career/pages/RecommendedProjects'));
const InterviewPreparation = lazy(() => import('../features/career/pages/InterviewPreparation'));
const LiveJobs = lazy(() => import('../features/career/pages/LiveJobs'));
const ApplicationTracker = lazy(() => import('../features/career/pages/ApplicationTracker'));
const AIRecruiter = lazy(() => import('../features/career/pages/AIRecruiter'));

// Simple loading fallback
const PageLoader = () => (
  <div className="flex h-full w-full items-center justify-center p-8">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      // Career Routes
      {
        path: 'career/match',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CompanyMatch />
          </Suspense>
        ),
      },
      {
        path: 'career/skill-gap',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SkillGap />
          </Suspense>
        ),
      },
      {
        path: 'career/roadmap',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LearningRoadmap />
          </Suspense>
        ),
      },
      {
        path: 'career/projects',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RecommendedProjects />
          </Suspense>
        ),
      },
      {
        path: 'career/interview',
        element: (
          <Suspense fallback={<PageLoader />}>
            <InterviewPreparation />
          </Suspense>
        ),
      },
      {
        path: 'career/jobs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LiveJobs />
          </Suspense>
        ),
      },
      {
        path: 'career/tracker',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ApplicationTracker />
          </Suspense>
        ),
      },
      {
        path: 'career/recruiter',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AIRecruiter />
          </Suspense>
        ),
      },
      // Other routes (profile, resume, etc) will go here
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
