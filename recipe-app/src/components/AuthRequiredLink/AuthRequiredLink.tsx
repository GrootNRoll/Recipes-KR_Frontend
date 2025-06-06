import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import AuthModal from '../AuthModal/AuthModal';
import { useAuth } from '../../services/auth.mock';


interface AuthRequiredLinkProps {
  to: string;
  children: string;
}

const AuthRequiredLink: React.FC<AuthRequiredLinkProps> = ({ to, children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isActive = location.pathname === to;

  if (!user) {
    return (
      <>
        <button
          className={`protected-link${isActive ? ' active' : ''}`}
          onClick={() => setIsAuthModalOpen(true)}
        >
          {children}
        </button>

        {isAuthModalOpen && (
          <AuthModal 
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={() => {
              setIsAuthModalOpen(false);
            }}
          />
        )}
      </>
    );
  }

  return (
    <NavLink to={to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
      {children}
    </NavLink>
  );
};

export default AuthRequiredLink;