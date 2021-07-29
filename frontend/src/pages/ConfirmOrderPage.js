import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Row, 
  Col, 
  ListGroup, 
  Image, 
  Card, 
  ProgressBar,
} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Alerts from '../components/Alerts';
import CheckoutProg from '../components/CheckoutProg';


const ConfirmOrderPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // price Calculations for totals:
  // to get the decimal values for prices: 
  const decimalAdd = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = decimalAdd(cart.cartItems.reduce((acc, item) => acc + item.price * item.itemQty, 0))
  cart.shippingPrice = decimalAdd(cart.itemsPrice > 50 ? 0 : 15)
  cart.taxPrice = decimalAdd(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


  const confirmOrderHandler = (e) => {
    console.log("Order placed");
  }

  return (
    <>
      <CheckoutProg step1 step2 step3 step4 />
      <ProgressBar variant='danger' animated now={100} />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2><strong>Shipping Address: </strong></h2>
              <p>
                {/* <strong>Address: </strong> */}
                {cart.shippingAddress.street}
                {cart.shippingAddress.city} , {cart.shippingAddress.countryState} {cart.shippingAddress.zipCode}   
                , {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2><strong>Payment Option: </strong></h2>
              {cart.paymentOption}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Cart Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alerts>No Items in your cart</Alerts>
                ) : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Link className='text-decoration-none' to={`/product/${item.product}`}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Link>
                          </Col>
                          <Col>
                            <Link className='text-decoration-none' to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.itemQty} x ${item.price} = ${item.itemQty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className='my-3 border-primary'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Totals</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button 
                  type='button'
                  className='btn-block confirm-order-button fluid' 
                  disabled={cart.cartItems === 0} 
                  onClick={confirmOrderHandler} 
                >Complete Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ConfirmOrderPage
