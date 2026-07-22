import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy loaded pages
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));

const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'));

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
      // Other routes (profile, resume, career, etc) will go here
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
