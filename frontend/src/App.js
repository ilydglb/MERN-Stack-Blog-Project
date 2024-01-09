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
import SinglePost from './pages/Single Post/SinglePost.jsx';
import MyProfile from './pages/My Profile/MyProfile.jsx';
import useAuth from './hooks/useAuth.js';

function App() {
  const { theme } = useTheme();
  const { auth } = useAuth();

  return (

    <div value={{ theme }}>
      <div className={theme}>
      
        <Routes>    
          <Route path='/' element={<Home  />} />

          <Route element={<RequireAuth />}>
          <Route path='write'   element={<Write />}  />
        </Route>

      
          <Route path="/my-profile" element={auth ? <MyProfile /> : <LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register'  element={<RegisterPage />} />
          <Route path='/post/:id'  element={<SinglePost />} />
          
        </Routes>
  
        <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'}/>
      </div>
    </div>

  );
}

export default App;
