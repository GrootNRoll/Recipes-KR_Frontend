import React, { useState } from 'react';
import { useAuth } from '../../services/auth.mock';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

const ProfilePage: React.FC = () => {
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (!user) {return};
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }
    
    if (newPassword.length < 8 || newPassword.length > 63) {
      setPasswordError('Пароль должен быть от 8 до 63 символов');
      return;
    }
    
    if (changePassword(user.email, currentPassword, newPassword)) {
      setShowChangePassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Пароль успешно изменен!');
    } else {
      setPasswordError('Неверный текущий пароль');
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }
  console.log('Profile user:', user); 

  console.log('ProfilePage render', user); //
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-avatar">
          <span>{user.email.charAt(0).toUpperCase()}</span>
        </div>
        
        <div className="profile-email">{user.email}</div>
        
        <div className="profile-actions">
          <button 
            className="change-password-btn"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Сменить пароль
          </button>
          
          {showChangePassword && (
            <form className="password-form" onSubmit={handleChangePassword}>
              <input
                type="password"
                placeholder="Текущий пароль"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Подтвердите новый пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
              <div className="form-actions">
                <button type="submit" className="submit-btn">Сохранить</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordError('');
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          )}
          
          <button 
            className="logout-btn"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="modal-content">
            <p>Вы уверены, что хотите выйти?</p>
            <div className="modal-actions">
              <button 
                className="confirm-btn"
                onClick={handleLogout}
              >
                Да, выйти
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;