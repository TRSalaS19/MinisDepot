import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import headerImg from '../img/header/header.png';



const Header = () => {
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>
            <img className='headerLogo mx-2' src={headerImg} alt='mini' />
            Mini's Depot
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              <Nav.Link href='/login'><i className="fas fa-user"></i> Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
