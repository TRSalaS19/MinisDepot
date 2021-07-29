import React,{useState} from 'react';
import { Form, Button, ProgressBar} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormFields from '../components/FormFields';
import CheckoutProg from '../components/CheckoutProg';
import {saveAddress} from '../actions/cartActions';

const ShippingPage = ({history}) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [street, setStreet] = useState(shippingAddress.street);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [countryState, setCountryState] = useState(shippingAddress.countryState);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveAddress({street, city, zipCode, countryState, country}))
    history.push('/payment');
  } 

  return (
    <FormFields>
      <CheckoutProg step1 step2/>
      <ProgressBar variant='secondary' animated now={50} />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='street'>
          <Form.Label>Street Address</Form.Label>
          <Form.Control 
            type='text' 
            value={street}
            required 
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control 
            type='text' 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='countryState'>
          <Form.Label>State</Form.Label>
          <Form.Control 
            type='text' 
            value={countryState} 
            onChange={(e) => setCountryState(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='zipCode'>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control 
            type='text' 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control 
            type='text' 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Use This Address
        </Button>

      </Form>
    </FormFields>
  )
}

export default ShippingPage
