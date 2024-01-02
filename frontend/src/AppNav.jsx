import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ThemeSwitch from './ThemeSwitch';
import useTheme from './hooks/useTheme';
import { TfiWrite } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { Avatar } from 'primereact/avatar';


import { Dropdown } from 'primereact/dropdown';
import { FaFeatherAlt } from "react-icons/fa";

function AppNav() {
  const { theme } = useTheme()
  return (
    <Navbar sticky='top' bg={theme === 'dark' ? 'dark' : 'light'} variant={theme === 'dark' ? 'dark' : 'light'}>
      <Container>
        <Navbar.Brand href="/home">  <FaFeatherAlt className='icon' /> HepsiBlog</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
          <Nav.Link href="/home">Ana Sayfa</Nav.Link>
          <Nav.Link href="#profile">Kullanıcılar</Nav.Link>
          <Nav.Link href="#pricing">Konuşma Odaları</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          
        <Navbar.Text >
        <Link to="/create">
          <TfiWrite   style={{
      
       fontSize: 30,
       paddingRight: 10,
     
     }}/>Post Oluştur
     </Link>
          </Navbar.Text>
         
        </Navbar.Collapse>
      </Container>
      <Avatar image={'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp'} className="flex align-items-center justify-content-center mr-5"  size="large" shape='circle' onClick={()=>{}}/>
      <ThemeSwitch />
    </Navbar>
  );
}

export default AppNav;