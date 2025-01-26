import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { SignUpView } from 'src/sections/auth';
import { RoutePaths } from '../enum/paths';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const StudentsPage = lazy(() => import('src/pages/students'));
// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [{ path: RoutePaths.STUDENTS.slice(1), element: <StudentsPage /> }],
    },
    {
      path: RoutePaths.SIGN_IN.slice(1),
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: RoutePaths.ROOT,
      element: <Navigate to={RoutePaths.STUDENTS} replace />,
    },
    {
      path: RoutePaths.SIGN_UP.slice(1),
      element: (
        <AuthLayout>
          <SignUpView />
        </AuthLayout>
      ),
    },
    {
      path: RoutePaths.NOT_FOUND.slice(1),
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to={RoutePaths.NOT_FOUND} replace />,
    },
  ]);
}
