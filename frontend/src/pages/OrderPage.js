import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { 
  // Button, 
  Row, 
  Col, 
  ListGroup, 
  Image, 
  Card, 
} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import HelmetMeta from '../components/HelmetMeta';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import {getOrderDetails, orderPayment} from '../actions/orderActions';
import { ORDER_PAID_UPDATE_RESET } from '../const/orderConst';

const OrderPage = ({match}) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const {order, loading, error} = orderDetails

  const orderPaymentDetails = useSelector((state) => state.orderPaid);
  const {success: successPay, loading: paymentLoading} = orderPaymentDetails
  
  // gets the itemsprice so we can display it. 
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.itemQty, 0))
  }

  useEffect(() => {
    // adding paypal script:
    const addPayPalScript = async () => {
      const { data: clientId} = await axios.get('/db/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    
    // checks to see if the there is no order or if the order_id does not match orderId then we want it to get the details for that order:

    if(!order || successPay) {
      dispatch({type: ORDER_PAID_UPDATE_RESET})
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if(!window.paypal){
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, order, successPay])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(orderPayment(orderId, paymentResult))
  }

  return loading ? (
        <LoadingSpinner /> 
      ) : error ? (
      <Alerts>{error}</Alerts>
      ) : (
      <>
          <HelmetMeta title='Order Page' />
          <h1>Order {order._id}</h1>
            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>
                      <strong>Your Order Details: </strong>
                    </h2>
                    <p>
                      <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong><a href={`mailto:${order.user.email}`} className='text-decoration-none'> {order.user.email} </a>
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.street}
                     {" "}{order.shippingAddress.city} , {order.shippingAddress.countryState} {order.shippingAddress.zipCode}   
                      , {order.shippingAddress.country}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Payment Option: </h2>
                    <p>
                      <strong>Preferred Option: </strong>
                      {order.paymentOption}
                    </p>
                    {order.isPaid ? (
                      <Alerts variant="primary">Paid on {order.paidAt.substring(0,10)}</Alerts>
                    ) : (
                      <Alerts variant='warning'>Not Paid</Alerts>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <Alerts>Nothing available for this order</Alerts>
                      ) : (
                        <ListGroup variant='flush'>
                          {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={2}>
                                  <Link 
                                    className='text-decoration-none' 
                                    to={`/product/${item.product}`}
                                  >
                                    <Image 
                                      src={item.image} 
                                      alt={item.name} 
                                      fluid 
                                      rounded 
                                    />
                                  </Link>
                                </Col>
                                <Col>
                                  <Link 
                                    className='text-decoration-none' 
                                    to={`/product/${item.product}`}
                                  >
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
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Taxes</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {error && <Alerts>{error}</Alerts>}
                    </ListGroup.Item>
                    {!order.isPaid && (
                      <ListGroup.Item>
                        {paymentLoading && <LoadingSpinner />}
                        {!sdkReady ? <LoadingSpinner /> : (
                          <PayPalButton 
                            amount={order.totalPrice} 
                            onSuccess={successPaymentHandler} 
                          />
                        )}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
        </>
      )
}

export default OrderPage
