import React, {useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Alerts from '../components/Alerts';
import {AddToCart, removeFromCart} from '../actions/cartActions';


const CartPage = ({match, location, history}) => {
  const productId = match.params.id
  
  const itemQty = location.search ? Number(location.search.split('=')[1]) : 1;
  
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if(productId) {
      dispatch(AddToCart(productId, itemQty))
    }
  }, [dispatch, productId, itemQty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alerts>No products in your shopping cart. Check out our <Link to='/'>Products</Link> to see our styles and add some to your cart!</Alerts>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product} className='bg-primary text-white rounded'>
                  <Row>
                    <Col md={2}>
                      <Image className='cart-image' src={item.image}  alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link className='text-decoration-none text-white' to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                        <Form.Control 
                          className='form-select' 
                          as="select" 
                          value={item.itemQty} 
                          onChange={(e) => dispatch(AddToCart(item.product,
                              Number(e.target.value)))}>
                              {/* seeting units available to an array..setting the key to the index value of each item */}
                                {
                                  [...Array(item.unitsAvailable).keys()].map(num => (
                                    <option key={num +1} value={num + 1}>
                                      {num + 1}
                                    </option>
                                  ))
                                }
                        </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type='button' variant='danger' onClick={(e) => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
           <Card className='my-4 bg-primary p-2'>
             <ListGroup variant='flush'>
               <ListGroup.Item >
                 <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.itemQty, 0)}) items</h2>
                 ${cartItems.reduce((acc, item) => acc + item.itemQty * item.price, 0).toFixed(2)}
               </ListGroup.Item>
               <ListGroup.Item>
                 <Button type='button' variant='danger' disabled={cartItems.length === 0} onClick={checkoutHandler}>Checkout</Button>
               </ListGroup.Item>
             </ListGroup>
           </Card>                      
        </Col>
      </Row>
  )
}

export default CartPage
