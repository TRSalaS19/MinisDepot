import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Alerts from '../components/Alerts';
import LoadingSpinner from '../components/LoadingSpinner';
import { register } from '../actions/userActions';
import FormFields from '../components/FormFields'

const RegisterPage = ({location, history}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.register)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormFields>
        <h1>Create a new Account</h1>
        {loading && <LoadingSpinner/>}
        {message && <Alerts variant='danger'>{message}</Alerts>}
        {error && <Alerts>{error}</Alerts>}
        <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
            <Form.Label className='m-1'>Name</Form.Label>
            <Form.Control 
              type='name' 
              value={name} onChange={(e) => setName(e.target.value)
            }></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label className='m-1'>Email</Form.Label>
            <Form.Control 
              type='email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)
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

          <Form.Group controlId='confirmPassword'>
            <Form.Label className='m-1'>Confirm Password</Form.Label>
            <Form.Control 
              type='password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)
            }></Form.Control>
          </Form.Group>

          <Button className='my-3'type='submit' variant='primary'>
            Create Account
          </Button>

        </Form>

        <Row className='py-3'>
          <Col>
            Already have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
          </Col>
        </Row>

    </FormFields>
  )
}

export default RegisterPage
