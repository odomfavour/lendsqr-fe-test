// src/routes/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../features/auth/pages/Login';
import UsersList from '../features/users/pages/UsersList';
import DashboardLayout from '../layouts/DashboardLayout';
import UserDetails from '../features/users/pages/UserDetails';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: 'users',
        element: <UsersList />,
      },
      {
        path: 'users/:id',
        element: <UserDetails />,
        // You could add a loader here to fetch user detail data
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
