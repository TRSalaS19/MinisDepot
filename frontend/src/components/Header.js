import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import headerImg from '../img/header/header.png';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/userActions';



const Header = () => {
  const dispatch = useDispatch();
  
  const userDetails = useSelector(state => state.login);
  const {userInfo } = userDetails;

  const logoutHandler = () => {
    dispatch(logout())
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' collapseOnSelect>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img className='headerLogo mx-3' src={headerImg} alt='mini' />
              Mini's Depot
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name.toUpperCase()} id='username' className='mx-4' >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : 
              <LinkContainer to='/login'>
                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
              </LinkContainer>              
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
