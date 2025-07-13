import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.userName) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
