// src/components/PrivateRoute.tsx
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('lendsqr-token');
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
