import React from 'react';
import { BrowserRouter as Router, Outlet, RouteObject } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './services/auth.mock';
import Layout from './components/Layout/Layout';
import './assets/styles/main.scss';

// Теперь AppLayout принимает children
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>{children}</>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </AuthProvider>
  );
};

export default App;