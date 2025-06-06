import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthRequiredLink from '../AuthRequiredLink/AuthRequiredLink';
import './Navigation.scss';

const Navigation: React.FC = () => {
  return (
    <nav className="main-navigation">
      <NavLink to="/" end className="nav-link">
        Главная страница
      </NavLink>
      <AuthRequiredLink to="/new-recipe">Новый рецепт</AuthRequiredLink>
      <AuthRequiredLink to="/my-recipes">Мои рецепты</AuthRequiredLink>
    </nav>
  );
};

export default Navigation;