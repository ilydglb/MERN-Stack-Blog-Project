import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ThemeSwitch from './ThemeSwitch';
import useTheme from './hooks/useTheme';

import { FaFeatherAlt } from "react-icons/fa";
function AppNav() {
  const { theme } = useTheme()
  return (
    <Navbar fixed='top' bg={theme === 'dark' ? 'dark' : 'light'} variant={theme === 'dark' ? 'dark' : 'light'}>
      <Container className='navbar-container'>
        <Navbar.Brand href="/home">  <FaFeatherAlt className='icon' /> HepsiBlog</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
          <Nav.Link href="/home">Ana Sayfa</Nav.Link>
          <Nav.Link href="#profile">Profilim</Nav.Link>
          <Nav.Link href="#pricing">Konuşma Odaları</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      <ThemeSwitch />
    </Navbar>
  );
}

export default AppNav;