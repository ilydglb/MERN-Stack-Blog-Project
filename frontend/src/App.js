import './App.scss';
import RegisterPage from './pages/Register/components/RegisterPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import { Routes, Route } from 'react-router-dom'
import AppNav from './AppNav';
import Layout from './pages/Layout.js';
import Home from './pages/Home/Home.jsx';
import RequireAuth from './RequireAuth.js';
import useTheme from './hooks/useTheme.js';
import { ToastContainer } from 'react-toastify';
import Write from './pages/Write Post/Write.jsx';

function App() {
  const { theme } = useTheme();
  return (

    <div value={{ theme }}>
      <div className={theme}>
      
        <Routes>    
          <Route path='/home' element={<Home  />} />
          <Route path='/create'  element={<Write />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register'  element={<RegisterPage />} />
        </Routes>
  
        <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'}/>
      </div>
    </div>

  );
}

export default App;
