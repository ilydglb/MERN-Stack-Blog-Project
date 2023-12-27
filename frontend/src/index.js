import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import App from './App';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from './context/ThemeProvider.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
      <AppNav></AppNav>
      <div className='App'>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        </div>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

