import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import HelmetMeta from '../components/HelmetMeta';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import { login } from '../actions/userActions';
import FormFields from '../components/FormFields'

const LoginPage = ({location, history}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.login)
  const { loading, error, userInfo } = userDetails

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormFields>
    <HelmetMeta title='Login' />
        <h1>Sign In</h1>
        {loading && <LoadingSpinner/>}
        {error && <Alerts>{error}</Alerts>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label className='m-1'>Email Address</Form.Label>
            <Form.Control 
              type='email' 
              value={email} onChange={(e) => setEmail(e.target.value)
            }></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label className='m-1'>Password</Form.Label>
            <Form.Control 
              type='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)
            }></Form.Control>
          </Form.Group>
          <Button className='my-3' type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
          </Col>
        </Row>
    </FormFields>
  )
}

export default LoginPage
