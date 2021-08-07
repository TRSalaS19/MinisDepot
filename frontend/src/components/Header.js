import React from 'react';
import {Route} from 'react-router-dom';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import headerImg from '../img/header/header.png';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/userActions';
import ProductSearchBox from '../components/ProductSearchBox';



const Header = () => {
  const dispatch = useDispatch();
  
  const userDetails = useSelector(state => state.login);
  const {userInfo } = userDetails;

  const logoutHandler = () => {
    dispatch(logout())
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img className='headerLogo mx-3' src={headerImg} alt='mini' />
              Mini's Depot
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* we have to wrap searchbox in a route so 
            it can take us to the product we are searching 
            for and have access to routes for our keyword search*/}
            <Route render={({history}) => <ProductSearchBox history={history}/>} />
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name.toUpperCase()} id='username' className='mx-5' >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
              <LinkContainer to='/login'>
                <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
              </LinkContainer>              
              )}
              {userInfo && userInfo.isAdmin && (
                /* /aa/ is for admin access */
                <NavDropdown title='Admin Menu' id='adminMenu' className='mx-5' >
                  <LinkContainer to='/aa/userlist'>
                    <NavDropdown.Item>Admin User Menu</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/aa/productlist'>
                    <NavDropdown.Item>Admin Product Menu</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/aa/orderlist'>
                    <NavDropdown.Item>Admin Order Menu</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
