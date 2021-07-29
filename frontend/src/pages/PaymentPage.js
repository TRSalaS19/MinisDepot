import React,{useState} from 'react';
import { Form, Button, ProgressBar, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormFields from '../components/FormFields';
import CheckoutProg from '../components/CheckoutProg';
import {savePaymentOption} from '../actions/cartActions';

const PaymentPage = ({history}) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentOption, setPaymentOption] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentOption(paymentOption))
    history.push('/confirmorder');
  } 

  return (
    <FormFields>
      <CheckoutProg step1 step2 step3/>
      <ProgressBar variant='danger' animated now={75} />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Type</Form.Label>
          <Col>
            <Form.Check 
              className='paymentOption'
              type='radio' 
              label='PayPal or Credit Card' 
              id='PayPal' 
              name='paymentOption' 
              value='PayPal' 
              checked
              onChange={(e) => setPaymentOption(e.target.value)}
            ></Form.Check>
            {/* <Form.Check 
              className='paymentOption'
              type='radio' 
              label='GPay' 
              id='googlepay' 
              name='paymentOption' 
              value='Gpay' 
              onChange={(e) => setPaymentOption(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        
        <Button type='submit' variant='primary' className='my-3'>
          Continue
        </Button>

      </Form>
    </FormFields>
  )
}

export default PaymentPage
