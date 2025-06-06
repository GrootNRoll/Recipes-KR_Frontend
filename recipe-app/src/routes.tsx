import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Outlet } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/Home/Home'));
const RecipePage = lazy(() => import('./pages/Recipe/Recipe'));
const NewRecipePage = lazy(() => import('./pages/NewRecipe/NewRecipe'));
const MyRecipesPage = lazy(() => import('./pages/MyRecipes/MyRecipes'));
const ProfilePage = lazy(() => import('./pages/Profile/Profile'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        
        <Route path="/" element={<Layout><Outlet /></Layout>}>
          <Route index element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route 
            path="new-recipe" 
            element={
              <ProtectedRoute>
                <NewRecipePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="my-recipes" 
            element={
              <ProtectedRoute>
                <MyRecipesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;