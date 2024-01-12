
import './App.scss';
import RegisterPage from './pages/Register/components/RegisterPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import { Routes, Route,Navigate } from 'react-router-dom'
import AppNav from './AppNav';
import Layout from './pages/Layout.js';
import Home from './pages/Home/Home.jsx';
import RequireAuth from './RequireAuth.js';
import RequireAdmin from './RequireAdmin.js';
import AdminPage from './pages/Admin/AdminPage.jsx';
import useTheme from './hooks/useTheme.js';
import { ToastContainer } from 'react-toastify';
import Write from './pages/Write Post/Write.jsx';
import SinglePost from './pages/Single Post/SinglePost.jsx';
import MyProfile from './pages/My Profile/MyProfile.jsx';
import useAuth from './hooks/useAuth.js';
import SingleUsrPosts from './pages/Single User Posts/SingleUsrPosts.jsx'



function App() {
  const { theme } = useTheme();
  const { auth } = useAuth();

  return (

    <div value={{ theme }}>
      <div className={theme}>
      <Routes>   
        
          <Route path='/' element={<Home  />} />
          <Route path='/login' element={auth? <Navigate to="/"  /> :<LoginPage /> } />
          <Route path='/register'  element={auth?  <Navigate to="/"  /> :<RegisterPage /> } />
          <Route path='/post/:id'  element={<SinglePost />} />
          <Route path='/posts/:username'  element={<SingleUsrPosts />} />
  
          <Route element={<RequireAuth />}>
              <Route path='write'   element={<Write />}  />
              <Route path="/my-profile"  element={<MyProfile />}  />
          </Route>

          <Route element={<RequireAdmin/>}>
                <Route path="/admin-page"  element={<AdminPage />}  />
          </Route>

                
      </Routes>
  
        <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'}/>
      </div>
    </div>

  );
}

export default App;
