import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <img 
          src="/okak.webp" 
          alt="404 Not Found" 
          className="not-found-image"
        />
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Страница не найдена</p>
        <Link to="/" className="not-found-link">Вернуться на главную</Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 