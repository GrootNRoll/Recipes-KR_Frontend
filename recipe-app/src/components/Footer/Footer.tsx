import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section contacts">
          <h3>Контакты</h3>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <span>+7 (999) 123-45-67</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>support@recipes.ru</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>г. Москва, ул. Примерная, д. 1</span>
          </div>
        </div>

        <div className="footer-section social">
          <h3>Мы в соцсетях</h3>
          <div className="social-links">
            <Link to="/404" className="social-link">
              <i className="fab fa-telegram"></i>
              <span>Telegram</span>
            </Link>
            <Link to="/404" className="social-link">
              <i className="fab fa-vk"></i>
              <span>VKontakte</span>
            </Link>
            <Link to="/404" className="social-link">
              <i className="fab fa-discord"></i>
              <span>Discord</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Recipe App. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer; 