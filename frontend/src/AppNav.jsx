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
 const navigate=useNavigate()

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
   // navigate(`/my-profile`);
  };


  return (
    <Navbar sticky="top" bg={theme === 'dark' ? 'dark' : 'light'} variant={theme === 'dark' ? 'dark' : 'light'} className='navbar'>
      <Container>
        <Navbar.Brand href="/home">
          <FaFeatherAlt className="icon" /> HepsiBlog
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
          <Nav.Link href="/home">Ana Sayfa</Nav.Link>
          {auth ? (<Nav.Link href="#profile">Kullanıcılar</Nav.Link> ):(<Nav.Link href="/login">Giriş Yapın</Nav.Link>)}
          {auth ? (<Nav.Link href="#pricing">Konuşma Odaları</Nav.Link>):(<Nav.Link href="/register">Kayıt Olun</Nav.Link>)}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/create">
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
            image={
              'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp'
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
