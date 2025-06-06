import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/App.scss'; 
import './assets/styles/main.scss';
import { AuthProvider } from './services/auth.mock';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);