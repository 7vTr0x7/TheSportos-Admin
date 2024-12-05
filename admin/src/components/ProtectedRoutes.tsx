import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    return <Navigate to="/auth/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
