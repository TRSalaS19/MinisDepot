import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmOrderPage from './pages/ConfirmOrderPage';
import OrderPage from './pages/OrderPage';
import AdminUserListPage from './pages/AdminUserListPage';
import AdminUserEditPage from './pages/AdminUserEditPage';
import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductEditPage from './pages/AdminProductEditPage';

function App() {
  return (
    <Router>
      <Header />
        <main className='page-container'>
          <Container>
            <Route exact path='/' component={HomePage} />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/cart/:id?' component={CartPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/shipping' component={ShippingPage} />
            <Route path='/payment' component={PaymentPage} />
            <Route path='/confirmorder' component={ConfirmOrderPage} />
            <Route path='/order/:id' component={OrderPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/aa/userlist' component={AdminUserListPage} />
            <Route path='/aa/user/:id/edit' component={AdminUserEditPage} />
            <Route path='/aa/product/:id/edit' component={AdminProductEditPage} />
            <Route path='/aa/productlist' component={AdminProductListPage} />
          </Container>
        </main>
      <Footer className='footer'/>
    </Router>
  );
}

export default App;
