import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ThemeSwitch from './ThemeSwitch';
import useTheme from './hooks/useTheme';
import { TfiWrite } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import  Dropdown  from 'react-bootstrap/Dropdown';
import { FaFeatherAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from './hooks/useAuth';
import LoginPage from './pages/Login/LoginPage';


function AppNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { theme } = useTheme();
  const {auth,setAuth}=useAuth()  // const {acccessToken,setAuth}=useAuth()
 const navigate=useNavigate();
 const PF = "http://localhost:5000/images/"

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const handleLogout = async() => {
    try{
      
      const response = await axios.post('/api/users/logout',{withCredentials: true});
      setAuth(null);
      navigate('/login');  toast.success('Logged out successfully');
  }catch(error)
{ 
  console.log('failed:', error.message);
} 

  };

  const handleProfile = () => {
    navigate(`/my-profile`);
  };


  return (
    <Navbar sticky="top" bg={theme === 'dark' ? 'dark' : 'light'} variant={theme === 'dark' ? 'dark' : 'light'} className='navbar'>
      <Container>
        <Navbar.Brand href="/">
          <FaFeatherAlt className="icon" /> HepsiBlog
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
          <Nav.Link href="/">Ana Sayfa</Nav.Link>
          {auth ? (<Nav.Link href="#profile">Kullanıcılar</Nav.Link> ):(<Nav.Link href="/login">Giriş Yapın</Nav.Link>)}
          {auth ? (<Nav.Link href="#pricing">Konuşma Odaları</Nav.Link>):(<Nav.Link href="/register">Kayıt Olun</Nav.Link>)}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/write">
              <TfiWrite
                style={{
                  fontSize: 30,
                  paddingRight: 10,
                }}
              />
              Post Oluştur
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
{auth ? ( <Dropdown show={showDropdown} onToggle={handleDropdownToggle} onClose={handleDropdownClose} className='mr-3'>
        <Dropdown.Toggle  variant={theme === 'dark' ? 'dark' : 'light'} id="dropdown-basic" style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            image={auth?.profilePic ?  (PF+auth.profilePic):
              ('https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png')
            }
            className=""
            size="large"
            shape="circle"
          />
        </Dropdown.Toggle >
        <Dropdown.Menu>
          {/* Add dropdown menu items here */}
          <Dropdown.Item onClick={handleProfile}>Profilim</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Çıkış</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>):(<></>)}
      

      <ThemeSwitch />
    </Navbar>
  );
}

export default AppNav;
