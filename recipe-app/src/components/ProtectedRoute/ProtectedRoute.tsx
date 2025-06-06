import React, { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/auth.mock';
import AuthModal from '../AuthModal/AuthModal';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;