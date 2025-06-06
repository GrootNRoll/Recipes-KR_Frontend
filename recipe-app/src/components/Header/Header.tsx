import React, { useState } from 'react';
import { useAuth } from '../../services/auth.mock';
import AuthModal from '../AuthModal/AuthModal';
import './Header.scss';
import { useNavigate, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <Link to="/" className="logo-container">
        <img src="/images/logo.jpeg" alt="Логотип" className="logo" />
      </Link>
      
      <div className="social-links">
        <Link to="/404" className="social-link" title="Telegram">
          <i className="fab fa-telegram"></i>
        </Link>
        <Link to="/404" className="social-link" title="VK">
          <i className="fab fa-vk"></i>
        </Link>
        <Link to="/404" className="social-link" title="Discord">
          <i className="fab fa-discord"></i>
        </Link>
      </div>

      <div className="auth-container">
        {user ? (
          <div 
            className="user-avatar"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt="Аватар" />
            ) : (
              <span>{user.email.charAt(0).toUpperCase()}</span>
            )}
          </div>
        ) : (
          <button 
            className="login-button"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Вход
          </button>
        )}
      </div>
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={() => {
            setIsAuthModalOpen(false);
            // navigate('/profile'); // можно добавить автопереход
          }}
        />
      )}
    </header>
  );
};

export default Header;